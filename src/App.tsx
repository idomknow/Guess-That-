import React, { useState, useEffect, useRef, useMemo } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import {
  auth,
  db,
  signInWithGoogle,
  logOutUser,
  handleFirestoreError,
  OperationType,
} from './lib/firebase';
import {
  CategoryType,
  ChallengeItem,
  HintSet,
  StripTileItem,
  EDITORIAL_CONTACT_STRIP,
  INITIAL_SONG_CHALLENGES,
  ALL_1000_SONGS,
  ALL_1000_MOVIES,
  ALL_1000_CELEBRITIES,
  MOVIE_CHALLENGES,
  CELEBRITY_CHALLENGES,
  BADGE_CATALOG,
  VAULT_REWARDS,
} from './data/challenges';
import { soundEngine } from './lib/audioEngine';

type ActiveSection = 'play' | 'multiplayer' | 'badges' | 'leaderboard';
type VisualizerTheme = 'ink' | 'cobalt' | 'amber';

interface LeaderboardRow {
  userId: string;
  displayName: string;
  editorialTitle: string;
  score: number;
  streak: number;
  badgesCount: number;
  tokens: number;
  isCurrentUser?: boolean;
}

interface WsRoom {
  roomCode: string;
  category: CategoryType;
  roundIndex: number;
  status: 'waiting' | 'active' | 'completed';
  players: Array<{ id: string; name: string; score: number; streak: number }>;
  lastEvent: string;
  updatedAt: number;
}

type RectificationIssueType = 'artwork' | 'audio' | 'clue_hint' | 'answer_typo';

interface RectificationRecord {
  id: string;
  challengeId: string;
  category: CategoryType;
  issueType: RectificationIssueType;
  notes: string;
  status: 'rectified' | 'flagged';
  createdAt: string;
  patch: {
    answer?: string;
    subtitle?: string;
    year?: string;
    genre?: string;
    initials?: string;
    pinpoint?: string;
    pinpointClue?: string;
    artworkUrl?: string;
    previewUrl?: string | null;
  };
}

const RECTIFICATIONS_STORAGE_KEY = 'guess_that_rectifications_v1';

const SNIPPET_DURATIONS = [1.5, 4, 8, 15, 30];

const DEFAULT_FRIENDS_LEADERBOARD: LeaderboardRow[] = [
  {
    userId: 'friend-1',
    displayName: 'Sora Takahashi',
    editorialTitle: 'Film Programmer',
    score: 1480,
    streak: 7,
    badgesCount: 5,
    tokens: 420,
  },
  {
    userId: 'friend-2',
    displayName: 'Maren Lindqvist',
    editorialTitle: 'Crate Digger',
    score: 1190,
    streak: 5,
    badgesCount: 4,
    tokens: 310,
  },
  {
    userId: 'friend-3',
    displayName: 'Julian Vance',
    editorialTitle: 'Resident Listener',
    score: 940,
    streak: 4,
    badgesCount: 3,
    tokens: 215,
  },
  {
    userId: 'friend-4',
    displayName: 'Elena Rostova',
    editorialTitle: 'Early Cut',
    score: 760,
    streak: 3,
    badgesCount: 3,
    tokens: 180,
  },
];

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>('play');
  const [category, setCategory] = useState<CategoryType>('songs');

  // Auth & Firestore
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(false);
  const [firestoreLeaderboard, setFirestoreLeaderboard] = useState<LeaderboardRow[]>([]);

  // Player Progression
  const [score, setScore] = useState<number>(240);
  const [streak, setStreak] = useState<number>(1);
  const [bestStreak, setBestStreak] = useState<number>(2);
  const [tokens, setTokens] = useState<number>(120);
  const [freeHintPasses, setFreeHintPasses] = useState<number>(1);
  const [editorialTitle, setEditorialTitle] = useState<string>('Resident Listener');
  const [visualizerTheme, setVisualizerTheme] = useState<VisualizerTheme>('ink');
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(['badge-first-spin']);
  const [unlockedRewards, setUnlockedRewards] = useState<string[]>([]);
  const [recentBadgeBanner, setRecentBadgeBanner] = useState<string | null>(null);

  // Catalog & Spotify
  const [songChallenges, setSongChallenges] = useState<ChallengeItem[]>(INITIAL_SONG_CHALLENGES);
  const [spotifyStatus, setSpotifyStatus] = useState<{
    configured: boolean;
    connected: boolean;
    profile: { displayName: string; tracksCount: number } | null;
    callbackUrl: string;
  }>({
    configured: false,
    connected: false,
    profile: null,
    callbackUrl: `${window.location.origin}/auth/callback`,
  });
  const [musicSearchQuery, setMusicSearchQuery] = useState<string>('');
  const [isSearchingMusic, setIsSearchingMusic] = useState<boolean>(false);
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [spotifyNotice, setSpotifyNotice] = useState<string | null>(null);

  // Active Challenge
  const [challengeIndexMap, setChallengeIndexMap] = useState<Record<CategoryType, number>>({
    songs: 0,
    movies: 0,
    celebrities: 0,
  });
  const [revealedHints, setRevealedHints] = useState<Array<keyof HintSet>>([]);
  const [revealedPinpoints, setRevealedPinpoints] = useState<number>(1);
  const [songNoteRevealed, setSongNoteRevealed] = useState<boolean>(false);
  const [snippetStep, setSnippetStep] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [guessInput, setGuessInput] = useState<string>('');
  const [wrongAttempts, setWrongAttempts] = useState<number>(0);
  const [roundResult, setRoundResult] = useState<{
    status: 'idle' | 'correct' | 'revealed';
    pointsEarned: number;
    tokensEarned: number;
    message: string;
  }>({
    status: 'idle',
    pointsEarned: 0,
    tokensEarned: 0,
    message: '',
  });

  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const [topicArtworkMap, setTopicArtworkMap] = useState<Record<string, string>>({});

  // Catalogue Dropdown Artist & Keyword Search
  const [dropdownSearchQuery, setDropdownSearchQuery] = useState<string>('');
  const [selectedArtistFilter, setSelectedArtistFilter] = useState<string>('');

  // Error Flagging & Live Rectification State
  const [rectificationsMap, setRectificationsMap] = useState<Record<string, RectificationRecord>>(
    () => {
      try {
        const raw = window.localStorage.getItem(RECTIFICATIONS_STORAGE_KEY);
        if (raw) {
          return JSON.parse(raw) as Record<string, RectificationRecord>;
        }
      } catch {
        // ignore storage errors
      }
      return {};
    }
  );
  const [showRectifyPanel, setShowRectifyPanel] = useState<boolean>(false);
  const [rectIssueType, setRectIssueType] = useState<RectificationIssueType>('clue_hint');
  const [rectNotes, setRectNotes] = useState<string>('');
  const [rectAnswer, setRectAnswer] = useState<string>('');
  const [rectSubtitle, setRectSubtitle] = useState<string>('');
  const [rectYear, setRectYear] = useState<string>('');
  const [rectGenre, setRectGenre] = useState<string>('');
  const [rectInitials, setRectInitials] = useState<string>('');
  const [rectDetail, setRectDetail] = useState<string>('');
  const [rectPinpointClue, setRectPinpointClue] = useState<string>('');
  const [rectArtworkUrl, setRectArtworkUrl] = useState<string>('');
  const [rectPreviewUrl, setRectPreviewUrl] = useState<string | null | undefined>(undefined);
  const [isAutoRectifying, setIsAutoRectifying] = useState<boolean>(false);
  const [localFallbackIdx, setLocalFallbackIdx] = useState<number>(0);

  // Multiplayer
  const [wsRooms, setWsRooms] = useState<WsRoom[]>([]);
  const [activeRoomCode, setActiveRoomCode] = useState<string | null>('VINYL-88');
  const [newRoomCodeInput, setNewRoomCodeInput] = useState<string>('');
  const [localPlayerId] = useState<string>(() => `plr_${Math.random().toString(36).slice(2, 9)}`);
  const [localHandle, setLocalHandle] = useState<string>('Guest Listener');
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    return soundEngine.onPlayStateChange((playing) => {
      setIsPlayingAudio(playing);
    });
  }, []);

  const fetchSpotifyAndTracks = async () => {
    try {
      const [statusRes, tracksRes, artworkRes, rectRes] = await Promise.all([
        fetch(`/api/spotify/status?origin=${encodeURIComponent(window.location.origin)}`),
        fetch('/api/music/tracks'),
        fetch('/api/topic-artwork'),
        fetch('/api/rectifications'),
      ]);

      if (statusRes.ok) {
        const statusData = await statusRes.json();
        setSpotifyStatus(statusData);
      }

      if (artworkRes.ok) {
        const artData = await artworkRes.json();
        if (artData?.artwork && typeof artData.artwork === 'object') {
          setTopicArtworkMap(artData.artwork);
        }
      }

      if (rectRes.ok) {
        const rectData = await rectRes.json();
        if (Array.isArray(rectData?.rectifications) && rectData.rectifications.length > 0) {
          setRectificationsMap((prev) => {
            const next = { ...prev };
            rectData.rectifications.forEach((rec: RectificationRecord) => {
              if (rec?.challengeId) {
                next[rec.challengeId] = rec;
              }
            });
            try {
              window.localStorage.setItem(RECTIFICATIONS_STORAGE_KEY, JSON.stringify(next));
            } catch {
              // ignore
            }
            return next;
          });
        }
      }

      if (tracksRes.ok) {
        const tracksData = await tracksRes.json();
        if (Array.isArray(tracksData.tracks) && tracksData.tracks.length > 0) {
          const mapped: ChallengeItem[] = tracksData.tracks.map(
            (
              t: {
                id: string;
                title: string;
                artist: string;
                album: string;
                releaseYear: number;
                genre: string;
                artistInitials: string;
                pinpointClue: string;
                previewUrl: string | null;
                albumArtUrl: string | null;
                spotifyUrl: string | null;
                synthNotes: number[];
                bpm: number;
              },
              idx: number
            ) => {
              const localMatch = INITIAL_SONG_CHALLENGES.find(
                (c) => c.id === t.id || c.answer.toLowerCase() === t.title.toLowerCase()
              );
              const keepGivenCover =
                t.id === 'song-wusyaname' || t.id === 'song-less-i-know';
              const fallbackArt =
                localMatch?.artworkUrl ||
                EDITORIAL_CONTACT_STRIP[idx % EDITORIAL_CONTACT_STRIP.length].image;
              const resolvedArt = keepGivenCover
                ? localMatch?.artworkUrl || t.albumArtUrl || fallbackArt
                : t.albumArtUrl || localMatch?.artworkUrl || fallbackArt;

              const otherTitles = INITIAL_SONG_CHALLENGES.map((c) => c.answer).filter(
                (ans) => ans.toLowerCase() !== t.title.toLowerCase()
              );
              const choices =
                localMatch?.choices ||
                [
                  t.title,
                  otherTitles[idx % otherTitles.length] || 'Instant Crush',
                  otherTitles[(idx + 1) % otherTitles.length] || 'Dreams',
                  otherTitles[(idx + 2) % otherTitles.length] || 'Billie Jean',
                ].sort((a, b) => a.localeCompare(b));

              return {
                id: t.id,
                category: 'songs',
                answer: localMatch?.answer || t.title,
                acceptedAliases: localMatch?.acceptedAliases || [
                  t.title.toLowerCase(),
                  `${t.title.toLowerCase()} ${t.artist.toLowerCase()}`,
                ],
                subtitle: localMatch?.subtitle || `${t.artist} — ${t.album}`,
                catalogNumber: `No. ${String(idx + 1).padStart(2, '0')}`,
                artworkUrl: resolvedArt,
                pinpointClues: localMatch?.pinpointClues || [
                  t.pinpointClue,
                  `Recorded by ${t.artist} and released in ${t.releaseYear}.`,
                  `From the album ${t.album}.`,
                ],
                hints: localMatch?.hints || {
                  year: String(t.releaseYear),
                  genre: t.genre,
                  initials: t.artistInitials,
                  pinpoint: t.album,
                },
                choices,
                previewUrl: t.previewUrl,
                spotifyUrl: t.spotifyUrl,
                synthNotes: t.synthNotes,
                bpm: t.bpm,
              };
            }
          );
          setSongChallenges(mapped);
        }
      }
    } catch {
      // Keep default tracks if offline
    }
  };

  useEffect(() => {
    fetchSpotifyAndTracks();
  }, []);

  useEffect(() => {
    const handleOAuthMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        setSpotifyNotice('Spotify connected. Personal rotation loaded.');
        fetchSpotifyAndTracks();
      }
    };
    window.addEventListener('message', handleOAuthMessage);
    return () => window.removeEventListener('message', handleOAuthMessage);
  }, []);

  useEffect(() => {
    const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${proto}//${window.location.host}/ws`;
    let socket: WebSocket | null = null;
    let reconnectTimer: number | null = null;

    const connectWs = () => {
      try {
        socket = new WebSocket(wsUrl);
        wsRef.current = socket;

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'rooms:sync' && Array.isArray(data.rooms)) {
              setWsRooms(data.rooms);
            }
          } catch {
            // ignore
          }
        };

        socket.onclose = () => {
          reconnectTimer = window.setTimeout(connectWs, 3000);
        };
      } catch {
        // ignore
      }
    };

    connectWs();
    return () => {
      if (reconnectTimer) window.clearTimeout(reconnectTimer);
      if (socket) socket.close();
    };
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setAuthReady(true);
      if (user) {
        const cleanName = (user.displayName || 'Listener').slice(0, 60);
        setLocalHandle(cleanName);
        const userDocRef = doc(db, 'leaderboard', user.uid);
        try {
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const d = snap.data();
            if (typeof d.score === 'number' && d.score > score) setScore(d.score);
            if (typeof d.streak === 'number' && d.streak > bestStreak) setBestStreak(d.streak);
            if (typeof d.tokens === 'number') setTokens(d.tokens);
            if (typeof d.editorialTitle === 'string') setEditorialTitle(d.editorialTitle);
            if (Array.isArray(d.unlockedBadges)) setUnlockedBadges(d.unlockedBadges);
            if (Array.isArray(d.unlockedRewards)) setUnlockedRewards(d.unlockedRewards);
          } else if (user.emailVerified) {
            await setDoc(userDocRef, {
              userId: user.uid,
              displayName: cleanName,
              editorialTitle: 'Resident Listener',
              score: 240,
              streak: 2,
              badgesCount: 1,
              tokens: 120,
              unlockedBadges: ['badge-first-spin'],
              unlockedRewards: [],
              visibility: 'public',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, `leaderboard/${user.uid}`);
        }
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!authReady || !currentUser) {
      setFirestoreLeaderboard([]);
      return;
    }

    const q = query(collection(db, 'leaderboard'), where('visibility', '==', 'public'));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const rows: LeaderboardRow[] = [];
        snapshot.forEach((docSnap) => {
          const d = docSnap.data();
          rows.push({
            userId: d.userId,
            displayName: d.displayName,
            editorialTitle: d.editorialTitle,
            score: d.score,
            streak: d.streak,
            badgesCount: d.badgesCount,
            tokens: d.tokens,
            isCurrentUser: d.userId === currentUser.uid,
          });
        });
        setFirestoreLeaderboard(rows);
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, 'leaderboard');
      }
    );

    return () => unsub();
  }, [authReady, currentUser]);

  const syncProgressToFirestore = async (nextState: {
    score: number;
    bestStreak: number;
    tokens: number;
    editorialTitle: string;
    unlockedBadges: string[];
    unlockedRewards: string[];
  }) => {
    if (!currentUser || !currentUser.emailVerified) return;
    const userDocRef = doc(db, 'leaderboard', currentUser.uid);
    const boundedBadges = nextState.unlockedBadges.slice(0, 20).map((b) => b.slice(0, 64));
    const boundedRewards = nextState.unlockedRewards.slice(0, 20).map((r) => r.slice(0, 64));
    const safeDisplayName = (currentUser.displayName || localHandle || 'Listener').slice(0, 60);
    const safeTitle = (nextState.editorialTitle || 'Resident Listener').slice(0, 60);

    try {
      await updateDoc(userDocRef, {
        displayName: safeDisplayName,
        editorialTitle: safeTitle,
        score: Math.max(0, Math.min(10000000, Math.round(nextState.score))),
        streak: Math.max(0, Math.min(10000, Math.round(nextState.bestStreak))),
        badgesCount: Math.min(20, boundedBadges.length),
        tokens: Math.max(0, Math.min(1000000, Math.round(nextState.tokens))),
        unlockedBadges: boundedBadges,
        unlockedRewards: boundedRewards,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `leaderboard/${currentUser.uid}`);
    }
  };

  const applyRectificationToChallenge = (item: ChallengeItem): ChallengeItem => {
    const rec = rectificationsMap[item.id];
    if (!rec || rec.status !== 'rectified' || !rec.patch) return item;
    const p = rec.patch;
    const nextAnswer = p.answer?.trim() || item.answer;
    const nextAliases = Array.from(
      new Set([
        ...item.acceptedAliases,
        nextAnswer.toLowerCase(),
      ])
    );
    const nextClues = [...item.pinpointClues];
    if (p.pinpointClue?.trim()) {
      nextClues[0] = p.pinpointClue.trim();
    }
    return {
      ...item,
      answer: nextAnswer,
      acceptedAliases: nextAliases,
      subtitle: p.subtitle?.trim() || item.subtitle,
      artworkUrl: p.artworkUrl?.trim() || item.artworkUrl,
      previewUrl: p.previewUrl !== undefined ? p.previewUrl : item.previewUrl,
      pinpointClues: nextClues,
      hints: {
        year: p.year?.trim() || item.hints.year,
        genre: p.genre?.trim() || item.hints.genre,
        initials: p.initials?.trim() || item.hints.initials,
        pinpoint: p.pinpoint?.trim() || item.hints.pinpoint,
      },
    };
  };

  const activeChallengeList = useMemo(() => {
    if (category === 'songs') {
      return songChallenges.map((s) => applyRectificationToChallenge(s));
    }
    if (category === 'movies') {
      return MOVIE_CHALLENGES.map((m) =>
        applyRectificationToChallenge({
          ...m,
          artworkUrl: topicArtworkMap[m.id] || m.artworkUrl,
        })
      );
    }
    return CELEBRITY_CHALLENGES.map((c) =>
      applyRectificationToChallenge({
        ...c,
        artworkUrl:
          c.id === 'celeb-tyler-the-creator'
            ? c.artworkUrl
            : topicArtworkMap[c.id] || c.artworkUrl,
      })
    );
  }, [category, songChallenges, topicArtworkMap, rectificationsMap]);

  const currentChallengeIndex = challengeIndexMap[category] % activeChallengeList.length;
  const currentChallenge: ChallengeItem = activeChallengeList[currentChallengeIndex];

  const catalogueDropdownOptions = useMemo(() => {
    if (category === 'songs') {
      const seenLabels = new Set<string>();
      const list: Array<{ key: string; value: string; label: string; artist: string }> = [];

      [...songChallenges, ...INITIAL_SONG_CHALLENGES].forEach((item) => {
        const rawArtistPart = item.subtitle.split(' — ')[0] || '';
        const cleanArtist = rawArtistPart.replace(/\s*\(Easy\)$/i, '').trim();
        const label = cleanArtist ? `${item.answer} — ${cleanArtist}` : item.answer;
        const normKey = label.toLowerCase();
        if (!seenLabels.has(normKey)) {
          seenLabels.add(normKey);
          list.push({
            key: label,
            value: item.answer,
            label,
            artist: cleanArtist || 'Various Artists',
          });
        }
      });

      ALL_1000_SONGS.forEach((entry) => {
        if (list.length >= 1000) return;
        const normKey = entry.toLowerCase();
        if (!seenLabels.has(normKey)) {
          seenLabels.add(normKey);
          const [titlePart, artistPart] = entry.split(' — ');
          const cleanTitle = (titlePart || entry).replace(/\s*\(.*\)$/, '').trim();
          const cleanArtist = (artistPart || 'Various Artists').trim();
          list.push({
            key: entry,
            value: cleanTitle || entry,
            label: entry,
            artist: cleanArtist,
          });
        }
      });

      return list.slice(0, 1000).sort((a, b) => a.label.localeCompare(b.label));
    }

    if (category === 'movies') {
      const seenLabels = new Set<string>();
      const list: Array<{ key: string; value: string; label: string; artist: string }> = [];

      MOVIE_CHALLENGES.forEach((item) => {
        const label = `${item.answer} (${item.hints.year})`;
        const normKey = label.toLowerCase();
        const director = item.subtitle
          .replace(/^Directed by\s+/i, '')
          .replace(/\s*\(Easy\)$/i, '')
          .trim();
        if (!seenLabels.has(normKey)) {
          seenLabels.add(normKey);
          list.push({ key: label, value: item.answer, label, artist: director });
        }
      });

      ALL_1000_MOVIES.forEach((entry) => {
        if (list.length >= 1000) return;
        const cleanFilm = entry
          .replace(/\s*\(\d{4}\)$/, '')
          .replace(/:\s*[^:]+Cut #\d+$/, '')
          .trim();
        const normKey = entry.toLowerCase();
        if (!seenLabels.has(normKey)) {
          seenLabels.add(normKey);
          list.push({ key: entry, value: cleanFilm, label: entry, artist: '' });
        }
      });

      return list.slice(0, 1000).sort((a, b) => a.label.localeCompare(b.label));
    }

    const seenLabels = new Set<string>();
    const list: Array<{ key: string; value: string; label: string; artist: string }> = [];

    CELEBRITY_CHALLENGES.forEach((item) => {
      const normKey = item.answer.toLowerCase();
      if (!seenLabels.has(normKey)) {
        seenLabels.add(normKey);
        list.push({
          key: item.answer,
          value: item.answer,
          label: item.answer,
          artist: item.hints.genre,
        });
      }
    });

    ALL_1000_CELEBRITIES.forEach((entry) => {
      if (list.length >= 1000) return;
      const cleanName = entry.replace(/\s*\(.*\)$/, '').trim();
      const normKey = entry.toLowerCase();
      if (!seenLabels.has(normKey)) {
        seenLabels.add(normKey);
        list.push({ key: entry, value: cleanName, label: entry, artist: '' });
      }
    });

    return list.slice(0, 1000).sort((a, b) => a.label.localeCompare(b.label));
  }, [category, songChallenges]);

  const availableCatalogueArtists = useMemo(() => {
    if (category !== 'songs') return [];
    const counts = new Map<string, number>();
    catalogueDropdownOptions.forEach((opt) => {
      if (opt.artist) {
        counts.set(opt.artist, (counts.get(opt.artist) || 0) + 1);
      }
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [category, catalogueDropdownOptions]);

  const filteredCatalogueDropdownOptions = useMemo(() => {
    const q = dropdownSearchQuery.trim().toLowerCase();
    return catalogueDropdownOptions.filter((opt) => {
      if (category === 'songs' && selectedArtistFilter) {
        if (opt.artist.toLowerCase() !== selectedArtistFilter.toLowerCase()) {
          return false;
        }
      }
      if (!q) return true;
      return (
        opt.label.toLowerCase().includes(q) ||
        opt.value.toLowerCase().includes(q) ||
        (opt.artist && opt.artist.toLowerCase().includes(q))
      );
    });
  }, [catalogueDropdownOptions, category, selectedArtistFilter, dropdownSearchQuery]);

  const openRectifyPanelForCurrent = () => {
    const existing = rectificationsMap[currentChallenge.id];
    setRectIssueType(existing?.issueType || 'clue_hint');
    setRectNotes(existing?.notes || '');
    setRectAnswer(currentChallenge.answer);
    setRectSubtitle(currentChallenge.subtitle);
    setRectYear(currentChallenge.hints.year);
    setRectGenre(currentChallenge.hints.genre);
    setRectInitials(currentChallenge.hints.initials);
    setRectDetail(currentChallenge.hints.pinpoint);
    setRectPinpointClue(currentChallenge.pinpointClues[0] || '');
    setRectArtworkUrl(currentChallenge.artworkUrl);
    setRectPreviewUrl(currentChallenge.previewUrl);
    setShowRectifyPanel(true);
  };

  const handleAutoFetchRectification = async () => {
    setIsAutoRectifying(true);
    try {
      const cleanSubtitleArtist = rectSubtitle.split(' — ')[0]?.replace(/\s*\(Easy\)$/i, '') || '';
      const lookupQuery =
        category === 'songs'
          ? `${rectAnswer} ${cleanSubtitleArtist}`.trim()
          : rectAnswer.trim();
      const res = await fetch('/api/rectify-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          query: lookupQuery,
          wikiTitle: currentChallenge.wikiTitle,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.found) {
          if (data.artworkUrl) {
            setRectArtworkUrl(data.artworkUrl);
            setBrokenImages((prev) => ({ ...prev, [currentChallenge.id]: false }));
          }
          if (data.previewUrl !== undefined) {
            setRectPreviewUrl(data.previewUrl);
          }
          if (data.year) setRectYear(String(data.year));
          if (data.genre) setRectGenre(String(data.genre));
          if (data.initials) setRectInitials(String(data.initials));
          if (data.subtitle && category === 'songs') setRectSubtitle(String(data.subtitle));
          setSpotifyNotice(`Auto-fetched verified metadata & artwork for “${rectAnswer}”. Click Apply & Rectify to save.`);
        } else {
          const nextIdx = (localFallbackIdx + 1) % EDITORIAL_CONTACT_STRIP.length;
          setLocalFallbackIdx(nextIdx);
          setRectArtworkUrl(EDITORIAL_CONTACT_STRIP[nextIdx].image);
          setSpotifyNotice('Switched to verified local archival artwork. Click Apply & Rectify to save.');
        }
      }
    } catch {
      const nextIdx = (localFallbackIdx + 1) % EDITORIAL_CONTACT_STRIP.length;
      setLocalFallbackIdx(nextIdx);
      setRectArtworkUrl(EDITORIAL_CONTACT_STRIP[nextIdx].image);
    } finally {
      setIsAutoRectifying(false);
    }
  };

  const handleCycleLocalTopicArtwork = () => {
    const nextIdx = (localFallbackIdx + 1) % EDITORIAL_CONTACT_STRIP.length;
    setLocalFallbackIdx(nextIdx);
    const chosen = EDITORIAL_CONTACT_STRIP[nextIdx];
    setRectArtworkUrl(chosen.image);
    setBrokenImages((prev) => ({ ...prev, [currentChallenge.id]: false }));
  };

  const handleSaveRectification = async (mode: 'rectified' | 'flagged') => {
    const record: RectificationRecord = {
      id: `rect_${Date.now()}`,
      challengeId: currentChallenge.id,
      category,
      issueType: rectIssueType,
      notes: rectNotes.trim() || `${rectIssueType} rectified by user`,
      status: mode,
      createdAt: new Date().toISOString(),
      patch:
        mode === 'rectified'
          ? {
              answer: rectAnswer.trim() || currentChallenge.answer,
              subtitle: rectSubtitle.trim() || currentChallenge.subtitle,
              year: rectYear.trim() || currentChallenge.hints.year,
              genre: rectGenre.trim() || currentChallenge.hints.genre,
              initials: rectInitials.trim() || currentChallenge.hints.initials,
              pinpoint: rectDetail.trim() || currentChallenge.hints.pinpoint,
              pinpointClue: rectPinpointClue.trim() || currentChallenge.pinpointClues[0],
              artworkUrl: rectArtworkUrl.trim() || currentChallenge.artworkUrl,
              previewUrl: rectPreviewUrl,
            }
          : {},
    };

    const nextMap = {
      ...rectificationsMap,
      [currentChallenge.id]: record,
    };
    setRectificationsMap(nextMap);
    setBrokenImages((prev) => ({ ...prev, [currentChallenge.id]: false }));

    try {
      window.localStorage.setItem(RECTIFICATIONS_STORAGE_KEY, JSON.stringify(nextMap));
    } catch {
      // ignore
    }

    try {
      await fetch('/api/rectifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
    } catch {
      // ignore offline
    }

    setShowRectifyPanel(false);
    setSpotifyNotice(
      mode === 'rectified'
        ? `Rectified “${record.patch.answer || currentChallenge.answer}” (${currentChallenge.catalogNumber}). Changes applied live.`
        : `Flagged “${currentChallenge.answer}” (${currentChallenge.catalogNumber}) for review.`
    );
  };

  const handleRevertRectification = async (challengeId: string) => {
    const nextMap = { ...rectificationsMap };
    delete nextMap[challengeId];
    setRectificationsMap(nextMap);
    try {
      window.localStorage.setItem(RECTIFICATIONS_STORAGE_KEY, JSON.stringify(nextMap));
    } catch {
      // ignore
    }
    try {
      await fetch(`/api/rectifications/${encodeURIComponent(challengeId)}`, {
        method: 'DELETE',
      });
    } catch {
      // ignore
    }
    setSpotifyNotice(`Reverted ${challengeId} to original catalogue entry.`);
  };

  const resetRoundState = () => {
    soundEngine.stopAll();
    setRevealedHints([]);
    setRevealedPinpoints(1);
    setSongNoteRevealed(false);
    setSnippetStep(0);
    setGuessInput('');
    setWrongAttempts(0);
    setRoundResult({
      status: 'idle',
      pointsEarned: 0,
      tokensEarned: 0,
      message: '',
    });
  };

  const handleSelectCategory = (nextCat: CategoryType) => {
    setCategory(nextCat);
    setActiveSection('play');
    setDropdownSearchQuery('');
    setSelectedArtistFilter('');
    setShowRectifyPanel(false);
    resetRoundState();
  };

  const handleSelectStripTile = (tile: StripTileItem) => {
    setCategory(tile.category);
    setActiveSection('play');
    const targetList =
      tile.category === 'songs'
        ? songChallenges
        : tile.category === 'movies'
        ? MOVIE_CHALLENGES
        : CELEBRITY_CHALLENGES;
    const foundIdx = targetList.findIndex((c) => c.id === tile.targetChallengeId);
    if (foundIdx >= 0) {
      setChallengeIndexMap((prev) => ({
        ...prev,
        [tile.category]: foundIdx,
      }));
    }
    resetRoundState();
  };

  const handleNextChallenge = () => {
    setChallengeIndexMap((prev) => ({
      ...prev,
      [category]: (prev[category] + 1) % activeChallengeList.length,
    }));
    resetRoundState();
  };

  const handleToggleAudioSnippet = () => {
    if (isPlayingAudio) {
      soundEngine.stopAll();
      return;
    }
    const durationSeconds = SNIPPET_DURATIONS[snippetStep] || 4;
    soundEngine.playTrackSnippet({
      previewUrl: currentChallenge.previewUrl,
      durationSeconds,
      synthNotes: currentChallenge.synthNotes,
      bpm: currentChallenge.bpm,
    });
  };

  const handleExtendSnippet = () => {
    const nextStep = Math.min(SNIPPET_DURATIONS.length - 1, snippetStep + 1);
    setSnippetStep(nextStep);
    soundEngine.playTrackSnippet({
      previewUrl: currentChallenge.previewUrl,
      durationSeconds: SNIPPET_DURATIONS[nextStep],
      synthNotes: currentChallenge.synthNotes,
      bpm: currentChallenge.bpm,
    });
  };

  const handleRevealHint = (key: keyof HintSet, cost: number) => {
    if (revealedHints.includes(key) || roundResult.status !== 'idle') return;
    soundEngine.playFeedbackEffect('hint');
    setRevealedHints((prev) => [...prev, key]);

    if (freeHintPasses > 0) {
      setFreeHintPasses((prev) => prev - 1);
    } else {
      setScore((prev) => Math.max(0, prev - cost));
    }
  };

  const evaluateGuess = (submittedRaw: string) => {
    if (roundResult.status !== 'idle') return;
    const cleanGuess = submittedRaw.trim().toLowerCase();
    if (!cleanGuess) return;

    const isMatch =
      cleanGuess === currentChallenge.answer.toLowerCase() ||
      currentChallenge.acceptedAliases.some((alias) => alias.toLowerCase() === cleanGuess) ||
      (cleanGuess.length >= 4 && currentChallenge.answer.toLowerCase().includes(cleanGuess));

    if (isMatch) {
      soundEngine.stopAll();
      soundEngine.playFeedbackEffect('correct');

      const basePoints = 150;
      const hintPenalty = freeHintPasses > 0 ? 0 : revealedHints.length * 15;
      const pinpointPenalty = (revealedPinpoints - 1) * 15;
      const snippetBonus = category === 'songs' ? (4 - snippetStep) * 20 : 0;
      const nextStreak = streak + 1;
      const nextBestStreak = Math.max(bestStreak, nextStreak);
      const streakBonus = nextStreak * 15;

      const pointsEarned = Math.max(
        40,
        basePoints - hintPenalty - pinpointPenalty + snippetBonus + streakBonus
      );
      let tokensEarned = 35;

      const newlyUnlocked: string[] = [];
      const updatedBadges = [...unlockedBadges];

      const tryUnlock = (badgeId: string) => {
        if (!updatedBadges.includes(badgeId)) {
          updatedBadges.push(badgeId);
          newlyUnlocked.push(badgeId);
          const badgeDef = BADGE_CATALOG.find((b) => b.id === badgeId);
          if (badgeDef) {
            tokensEarned += badgeDef.tokenReward;
          }
        }
      };

      tryUnlock('badge-first-spin');
      if (category === 'songs' && revealedHints.length === 0) {
        tryUnlock('badge-audiophile');
      }
      if (category === 'movies' && revealedPinpoints <= 2) {
        tryUnlock('badge-auteur');
      }
      if (category === 'celebrities' && wrongAttempts === 0) {
        tryUnlock('badge-iconographer');
      }
      if (nextStreak >= 3) {
        tryUnlock('badge-streak-3');
      }
      if (score + pointsEarned >= 500) {
        tryUnlock('badge-critic-1000');
      }

      if (newlyUnlocked.length > 0) {
        const firstNewBadge = BADGE_CATALOG.find((b) => b.id === newlyUnlocked[0]);
        if (firstNewBadge) {
          setRecentBadgeBanner(
            `Unlocked “${firstNewBadge.title}” (+${firstNewBadge.tokenReward} tokens)`
          );
          soundEngine.playFeedbackEffect('badge');
        }
      }

      const nextScore = score + pointsEarned;
      const nextTokens = tokens + tokensEarned;

      setScore(nextScore);
      setStreak(nextStreak);
      setBestStreak(nextBestStreak);
      setTokens(nextTokens);
      setUnlockedBadges(updatedBadges);

      setRoundResult({
        status: 'correct',
        pointsEarned,
        tokensEarned,
        message: `+${pointsEarned} pts · +${tokensEarned} tokens`,
      });

      if (activeRoomCode && wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: 'room:guess',
            eventId: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            roomCode: activeRoomCode,
            playerId: currentUser?.uid || localPlayerId,
            playerName: localHandle,
            correct: true,
            pointsDelta: pointsEarned,
            summary: `${localHandle} got “${currentChallenge.answer}” (+${pointsEarned})`,
          })
        );
      }

      syncProgressToFirestore({
        score: nextScore,
        bestStreak: nextBestStreak,
        tokens: nextTokens,
        editorialTitle,
        unlockedBadges: updatedBadges,
        unlockedRewards,
      });
    } else {
      soundEngine.playFeedbackEffect('wrong');
      setWrongAttempts((prev) => prev + 1);
      setStreak(0);
      if (revealedPinpoints < currentChallenge.pinpointClues.length) {
        setRevealedPinpoints((prev) => prev + 1);
      }
    }
  };

  const handleGiveUpRound = () => {
    soundEngine.stopAll();
    setStreak(0);
    setRoundResult({
      status: 'revealed',
      pointsEarned: 0,
      tokensEarned: 0,
      message: 'Skipped round',
    });
  };

  const handleConnectSpotify = async () => {
    try {
      const res = await fetch(
        `/api/spotify/auth-url?origin=${encodeURIComponent(window.location.origin)}`
      );
      const data = await res.json();
      if (!res.ok || !data.url) {
        setSpotifyNotice(
          `Add SPOTIFY_CLIENT_ID & SPOTIFY_CLIENT_SECRET in Secrets. Callback: ${
            data.callbackUrl || `${window.location.origin}/auth/callback`
          }`
        );
        return;
      }

      const authWindow = window.open(data.url, 'spotify_oauth_popup', 'width=600,height=720');
      if (!authWindow) {
        setSpotifyNotice('Please allow popups to connect Spotify.');
      }
    } catch {
      setSpotifyNotice('Could not reach Spotify auth.');
    }
  };

  const handleSearchLiveMusic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!musicSearchQuery.trim()) return;
    setIsSearchingMusic(true);
    setSpotifyNotice(null);

    try {
      const res = await fetch(`/api/music/search?q=${encodeURIComponent(musicSearchQuery.trim())}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.tracks) && data.tracks.length > 0) {
          const allTitles = data.tracks.map((t: { title: string }) => t.title);
          const customList: ChallengeItem[] = data.tracks.map(
            (
              t: {
                id: string;
                title: string;
                artist: string;
                album: string;
                releaseYear: number;
                genre: string;
                artistInitials: string;
                pinpointClue: string;
                previewUrl: string | null;
                albumArtUrl: string | null;
                spotifyUrl: string | null;
                synthNotes: number[];
                bpm: number;
              },
              idx: number
            ) => {
              const decoys = INITIAL_SONG_CHALLENGES.map((c) => c.answer).filter(
                (a) => a.toLowerCase() !== t.title.toLowerCase()
              );
              const choices = Array.from(
                new Set([
                  t.title,
                  allTitles[(idx + 1) % allTitles.length] || decoys[0],
                  decoys[idx % decoys.length] || 'Get Lucky',
                  decoys[(idx + 1) % decoys.length] || 'Dreams',
                ])
              )
                .slice(0, 4)
                .sort((a, b) => a.localeCompare(b));

              return {
                id: t.id,
                category: 'songs',
                answer: t.title,
                acceptedAliases: [t.title.toLowerCase()],
                subtitle: `${t.artist} — ${t.album}`,
                catalogNumber: `No. 0${idx + 1}`,
                artworkUrl:
                  t.albumArtUrl ||
                  EDITORIAL_CONTACT_STRIP[idx % EDITORIAL_CONTACT_STRIP.length].image,
                pinpointClues: [
                  t.pinpointClue,
                  `Recorded by ${t.artist} (${t.releaseYear}).`,
                  `Featured on ${t.album}.`,
                ],
                hints: {
                  year: String(t.releaseYear),
                  genre: t.genre,
                  initials: t.artistInitials,
                  pinpoint: t.artist,
                },
                choices,
                previewUrl: t.previewUrl,
                spotifyUrl: t.spotifyUrl,
                synthNotes: t.synthNotes,
                bpm: t.bpm,
              };
            }
          );

          setSongChallenges(customList);
          setChallengeIndexMap((prev) => ({ ...prev, songs: 0 }));
          setCategory('songs');
          resetRoundState();
          setShowSearchInput(false);
          setSpotifyNotice(`Loaded ${customList.length} tracks for “${musicSearchQuery.trim()}”.`);
        } else {
          setSpotifyNotice(`No previews found for “${musicSearchQuery.trim()}”.`);
        }
      }
    } catch {
      setSpotifyNotice('Search unavailable right now.');
    } finally {
      setIsSearchingMusic(false);
    }
  };

  const handleRedeemVaultItem = (itemId: string) => {
    const item = VAULT_REWARDS.find((r) => r.id === itemId);
    if (!item) return;

    const alreadyOwned = unlockedRewards.includes(item.id) && item.type !== 'hint_pass';
    if (alreadyOwned) {
      if (item.type === 'visualizer_theme') {
        setVisualizerTheme(item.value as VisualizerTheme);
      } else if (item.type === 'editorial_title') {
        setEditorialTitle(item.value);
        syncProgressToFirestore({
          score,
          bestStreak,
          tokens,
          editorialTitle: item.value,
          unlockedBadges,
          unlockedRewards,
        });
      }
      return;
    }

    if (tokens < item.cost) return;
    soundEngine.playFeedbackEffect('badge');

    const nextTokens = tokens - item.cost;
    const nextRewards = unlockedRewards.includes(item.id)
      ? unlockedRewards
      : [...unlockedRewards, item.id];

    setTokens(nextTokens);
    setUnlockedRewards(nextRewards);

    let nextTitle = editorialTitle;
    if (item.type === 'hint_pass') {
      setFreeHintPasses((prev) => prev + Number(item.value || 2));
    } else if (item.type === 'visualizer_theme') {
      setVisualizerTheme(item.value as VisualizerTheme);
    } else if (item.type === 'editorial_title') {
      nextTitle = item.value;
      setEditorialTitle(item.value);
    }

    syncProgressToFirestore({
      score,
      bestStreak,
      tokens: nextTokens,
      editorialTitle: nextTitle,
      unlockedBadges,
      unlockedRewards: nextRewards,
    });
  };

  const handleCreateMultiplayerRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = (
      newRoomCodeInput.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '') ||
      `ROOM-${Math.floor(10 + Math.random() * 89)}`
    ).slice(0, 10);

    setActiveRoomCode(cleanCode);
    setNewRoomCodeInput('');

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'room:create',
          eventId: `create_${Date.now()}`,
          roomCode: cleanCode,
          playerId: currentUser?.uid || localPlayerId,
          playerName: localHandle,
          category,
        })
      );
    }
  };

  const handleJoinMultiplayerRoom = (roomCode: string) => {
    setActiveRoomCode(roomCode);
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'room:join',
          eventId: `join_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          roomCode,
          playerId: currentUser?.uid || localPlayerId,
          playerName: localHandle,
        })
      );
    }
  };

  const combinedLeaderboard = useMemo(() => {
    const map = new Map<string, LeaderboardRow>();
    DEFAULT_FRIENDS_LEADERBOARD.forEach((r) => map.set(r.userId, r));
    firestoreLeaderboard.forEach((r) => map.set(r.userId, r));

    const selfId = currentUser?.uid || localPlayerId;
    map.set(selfId, {
      userId: selfId,
      displayName: localHandle,
      editorialTitle,
      score,
      streak: bestStreak,
      badgesCount: unlockedBadges.length,
      tokens,
      isCurrentUser: true,
    });

    return Array.from(map.values()).sort((a, b) => b.score - a.score);
  }, [
    firestoreLeaderboard,
    currentUser,
    localPlayerId,
    localHandle,
    editorialTitle,
    score,
    bestStreak,
    unlockedBadges.length,
    tokens,
  ]);

  // Dynamic editorial headline matching the reference image ("Good Sound")
  const heroHeadline =
    activeSection === 'multiplayer'
      ? '“Live Duel”'
      : activeSection === 'badges'
      ? '“The Vault”'
      : activeSection === 'leaderboard'
      ? '“High Scores”'
      : category === 'songs'
      ? '“Good Sound”'
      : category === 'movies'
      ? '“Slow Cinema”'
      : '“Close Up”';

  const progressFillColor =
    visualizerTheme === 'cobalt'
      ? 'bg-blue-600'
      : visualizerTheme === 'amber'
      ? 'bg-amber-500'
      : darkMode
      ? 'bg-white'
      : 'bg-black';

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-150 ${
        darkMode
          ? 'dark bg-[#0D0D0D] text-[#F3F2EE]'
          : 'bg-white text-[#0A0A0A]'
      }`}
    >
      {/* TOP EDGE: SLEEVE STRIP + GIANT QUOTED DISPLAY LOCKUP (Directly from reference) */}
      <div>
        {/* 3-Zone Top Bar Contract — ultra-quiet typographic strip */}
        <header className="px-3 sm:px-5 pt-2.5 pb-2 flex items-center justify-between text-[11px] tracking-tight">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('play');
            }}
            className="font-bold whitespace-nowrap"
          >
            Guess That!
          </a>

          <nav className="hidden sm:flex items-center gap-5">
            <button
              onClick={() => setActiveSection('play')}
              className={`whitespace-nowrap hover:underline ${
                activeSection === 'play' ? 'underline font-semibold' : 'opacity-65'
              }`}
            >
              Play
            </button>
            <button
              onClick={() => setActiveSection('multiplayer')}
              className={`whitespace-nowrap hover:underline ${
                activeSection === 'multiplayer' ? 'underline font-semibold' : 'opacity-65'
              }`}
            >
              Multiplayer
            </button>
            <button
              onClick={() => setActiveSection('badges')}
              className={`whitespace-nowrap hover:underline ${
                activeSection === 'badges' ? 'underline font-semibold' : 'opacity-65'
              }`}
            >
              Badges ({unlockedBadges.length})
            </button>
            <button
              onClick={() => setActiveSection('leaderboard')}
              className={`whitespace-nowrap hover:underline ${
                activeSection === 'leaderboard' ? 'underline font-semibold' : 'opacity-65'
              }`}
            >
              Leaderboard
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="hover:underline opacity-75 hover:opacity-100 whitespace-nowrap"
            >
              {darkMode ? 'Paper mode' : 'Dark mode'}
            </button>
            {currentUser ? (
              <button
                onClick={() => logOutUser()}
                className="hover:underline opacity-75 hover:opacity-100 whitespace-nowrap"
              >
                Sign out
              </button>
            ) : (
              <button
                onClick={() => signInWithGoogle()}
                className="hover:underline opacity-75 hover:opacity-100 whitespace-nowrap"
              >
                Sign in
              </button>
            )}
          </div>
        </header>

        {/* 8-Tile Edge-to-Edge Square Artwork Strip (No borders, crisp white gaps) */}
        <section aria-label="Selected Works Strip" className="px-2 sm:px-3">
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
            {EDITORIAL_CONTACT_STRIP.map((item) => {
              const useFallback = brokenImages[item.id];
              const primarySrc = item.keepLocalImage
                ? item.image
                : topicArtworkMap[item.id] || item.image;
              const srcToUse = useFallback ? item.image : primarySrc;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectStripTile(item)}
                  title={item.topicLabel}
                  className="group relative block aspect-square w-full overflow-hidden bg-neutral-200 dark:bg-neutral-900 focus:outline-none"
                >
                  <img
                    src={srcToUse}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={() => {
                      if (!useFallback) {
                        setBrokenImages((prev) => ({ ...prev, [item.id]: true }));
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-black/70 text-white text-[9px] font-mono-tabular px-1.5 py-0.5 truncate opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-left">
                    {item.topicLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Colossal Edge-to-Edge Tight Quoted Title */}
        <section className="px-2 sm:px-4 pt-1 pb-2 overflow-hidden">
          <h1 className="font-display font-bold tracking-[-0.06em] leading-[0.86] text-[15vw] sm:text-[13.2vw] select-none whitespace-nowrap">
            {heroHeadline}
          </h1>
        </section>
      </div>

      {/* ================================================================= */}
      {/* MIDDLE OPEN GALLERY STAGE (Breathing space, zero nested card boxes) */}
      {/* ================================================================= */}
      <main className="w-full max-w-[1160px] mx-auto px-4 sm:px-8 py-8 sm:py-12 my-auto">
        {recentBadgeBanner && (
          <div className="mb-6 pb-2 border-b border-current text-xs font-mono-tabular flex items-center justify-between">
            <span>{recentBadgeBanner}</span>
            <button onClick={() => setRecentBadgeBanner(null)} className="underline">
              close
            </button>
          </div>
        )}

        {/* 1. SOLO PLAY STAGE */}
        {activeSection === 'play' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column (7 cols): The Deduction Prompt & Input */}
            <div className="lg:col-span-7 space-y-7">
              {/* Quiet Kicker & Category Switcher */}
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-current/15 pb-3 text-xs">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleSelectCategory('songs')}
                    className={`whitespace-nowrap ${
                      category === 'songs' ? 'font-bold underline underline-offset-4' : 'opacity-55 hover:opacity-100'
                    }`}
                  >
                    01. Songs
                  </button>
                  <button
                    onClick={() => handleSelectCategory('movies')}
                    className={`whitespace-nowrap ${
                      category === 'movies' ? 'font-bold underline underline-offset-4' : 'opacity-55 hover:opacity-100'
                    }`}
                  >
                    02. Movies
                  </button>
                  <button
                    onClick={() => handleSelectCategory('celebrities')}
                    className={`whitespace-nowrap ${
                      category === 'celebrities' ? 'font-bold underline underline-offset-4' : 'opacity-55 hover:opacity-100'
                    }`}
                  >
                    03. Celebrities
                  </button>
                </div>

                <div className="font-mono-tabular text-[11px] opacity-65">
                  <span>{currentChallenge.catalogNumber}</span>
                  <span aria-hidden="true"> · </span>
                  <span>
                    {currentChallengeIndex + 1} of {activeChallengeList.length}
                  </span>
                  {rectificationsMap[currentChallenge.id] && (
                    <>
                      <span aria-hidden="true"> · </span>
                      <span className="font-semibold">
                        {rectificationsMap[currentChallenge.id].status === 'rectified'
                          ? 'Rectified ✓'
                          : 'Flagged !'}
                      </span>
                    </>
                  )}
                  <span aria-hidden="true"> · </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (showRectifyPanel) {
                        setShowRectifyPanel(false);
                      } else {
                        openRectifyPanelForCurrent();
                      }
                    }}
                    className="underline hover:opacity-100"
                  >
                    {showRectifyPanel ? 'Close rectify' : 'Flag / Rectify'}
                  </button>
                  {category === 'songs' && (
                    <>
                      <span aria-hidden="true"> · </span>
                      <button
                        onClick={() => setShowSearchInput((prev) => !prev)}
                        className="underline hover:opacity-100"
                      >
                        {showSearchInput ? 'Close search' : 'Load artist'}
                      </button>
                      <span aria-hidden="true"> · </span>
                      <button onClick={handleConnectSpotify} className="underline hover:opacity-100">
                        {spotifyStatus.connected
                          ? `Spotify (${spotifyStatus.profile?.displayName})`
                          : 'Connect Spotify'}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Optional Live Artist Search Line */}
              {category === 'songs' && showSearchInput && (
                <form
                  onSubmit={handleSearchLiveMusic}
                  className="flex items-baseline gap-3 pb-3 border-b border-current/15 text-xs"
                >
                  <input
                    type="text"
                    value={musicSearchQuery}
                    onChange={(e) => setMusicSearchQuery(e.target.value)}
                    placeholder="Type an artist or song (e.g. Sade, Radiohead, Kendrick Lamar)..."
                    className="flex-1 bg-transparent py-1 focus:outline-none placeholder:opacity-45"
                  />
                  <button
                    type="submit"
                    disabled={isSearchingMusic}
                    className="font-semibold underline whitespace-nowrap"
                  >
                    {isSearchingMusic ? 'Loading...' : 'Load stream'}
                  </button>
                </form>
              )}

              {spotifyNotice && (
                <div className="text-xs font-mono-tabular opacity-75 flex items-center justify-between">
                  <span>{spotifyNotice}</span>
                  <button onClick={() => setSpotifyNotice(null)} className="underline ml-4">
                    ok
                  </button>
                </div>
              )}

              {/* SONGS MODE: Minimalist Tape Scrub Line & Liner Clue */}
              {category === 'songs' && (
                <div className="space-y-5">
                  <div className="space-y-2.5">
                    <div className="flex items-baseline justify-between text-xs">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={handleToggleAudioSnippet}
                          className={`px-4 py-1.5 text-xs font-medium border border-current transition-colors whitespace-nowrap ${
                            isPlayingAudio
                              ? darkMode
                                ? 'bg-white text-black'
                                : 'bg-black text-white'
                              : 'hover:bg-current/5'
                          }`}
                        >
                          {isPlayingAudio
                            ? 'Stop audio'
                            : `Play ${SNIPPET_DURATIONS[snippetStep]}s snippet`}
                        </button>

                        {snippetStep < SNIPPET_DURATIONS.length - 1 && (
                          <button
                            onClick={handleExtendSnippet}
                            className="text-xs underline opacity-70 hover:opacity-100 whitespace-nowrap"
                          >
                            Extend to {SNIPPET_DURATIONS[snippetStep + 1]}s
                          </button>
                        )}
                      </div>

                      <span className="font-mono-tabular text-[11px] opacity-65">
                        0:0{SNIPPET_DURATIONS[snippetStep]} / 0:30
                      </span>
                    </div>

                    {/* Single Hairline Progress Track */}
                    <div className="w-full h-[2px] bg-current/15 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${progressFillColor}`}
                        style={{
                          width: isPlayingAudio
                            ? '100%'
                            : `${(SNIPPET_DURATIONS[snippetStep] / 30) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {songNoteRevealed || roundResult.status !== 'idle' ? (
                    <p className="text-base sm:text-lg leading-relaxed max-w-[62ch] font-normal">
                      {currentChallenge.pinpointClues[0]}
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playFeedbackEffect('hint');
                        setSongNoteRevealed(true);
                        if (freeHintPasses > 0) {
                          setFreeHintPasses((prev) => prev - 1);
                        } else {
                          setScore((prev) => Math.max(0, prev - 10));
                        }
                      }}
                      className="text-xs font-mono-tabular underline opacity-70 hover:opacity-100"
                    >
                      + Reveal liner note hint ({freeHintPasses > 0 ? 'free' : '-10'})
                    </button>
                  )}
                </div>
              )}

              {/* MOVIES & CELEBRITIES MODE: Clean Numbered Pinpoint Paragraphs */}
              {category !== 'songs' && (
                <div className="space-y-4">
                  <div className="space-y-3 max-w-[64ch]">
                    {currentChallenge.pinpointClues
                      .slice(0, revealedPinpoints)
                      .map((clue, idx) => (
                        <p key={idx} className="text-base sm:text-lg leading-relaxed">
                          <span className="font-mono-tabular text-xs opacity-50 mr-2.5">
                            0{idx + 1}.
                          </span>
                          {clue}
                        </p>
                      ))}
                  </div>

                  {revealedPinpoints < currentChallenge.pinpointClues.length &&
                    roundResult.status === 'idle' && (
                      <button
                        onClick={() => {
                          soundEngine.playFeedbackEffect('hint');
                          setRevealedPinpoints((prev) =>
                            Math.min(currentChallenge.pinpointClues.length, prev + 1)
                          );
                        }}
                        className="text-xs font-mono-tabular underline opacity-70 hover:opacity-100"
                      >
                        + Read next clue ({revealedPinpoints + 1} of{' '}
                        {currentChallenge.pinpointClues.length})
                      </button>
                    )}
                </div>
              )}

              {/* Inline Unboxed Hint Row */}
              <div className="pt-2 border-t border-current/15 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono-tabular">
                <span className="opacity-50">Hints:</span>
                {(
                  [
                    { key: 'year' as keyof HintSet, label: 'Year', cost: 15 },
                    { key: 'genre' as keyof HintSet, label: 'Genre', cost: 20 },
                    { key: 'initials' as keyof HintSet, label: 'Initials', cost: 25 },
                    { key: 'pinpoint' as keyof HintSet, label: 'Detail', cost: 30 },
                  ] as const
                ).map((h, i) => {
                  const isShown =
                    revealedHints.includes(h.key) || roundResult.status !== 'idle';
                  return (
                    <React.Fragment key={h.key}>
                      {i > 0 && <span aria-hidden="true" className="opacity-35">·</span>}
                      {isShown ? (
                        <span>
                          {h.label}: <strong>{currentChallenge.hints[h.key]}</strong>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleRevealHint(h.key, h.cost)}
                          className="underline opacity-75 hover:opacity-100"
                        >
                          {h.label} ({freeHintPasses > 0 ? 'free' : `-${h.cost}`})
                        </button>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Answer Input or Round Resolution */}
              {roundResult.status === 'idle' ? (
                <div className="space-y-4 pt-2">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      evaluateGuess(guessInput);
                    }}
                    className="flex items-baseline gap-4 border-b border-current pb-2"
                  >
                    <input
                      type="text"
                      value={guessInput}
                      onChange={(e) => setGuessInput(e.target.value)}
                      placeholder={
                        category === 'songs'
                          ? 'Type the track title...'
                          : category === 'movies'
                          ? 'Type the film title...'
                          : 'Type the person’s name...'
                      }
                      className="flex-1 bg-transparent text-base sm:text-lg focus:outline-none placeholder:opacity-40"
                    />
                    <button
                      type="submit"
                      className="text-xs font-mono-tabular uppercase tracking-wider font-bold hover:underline whitespace-nowrap"
                    >
                      Submit ↵
                    </button>
                  </form>

                  {/* Full 1,000-Item Catalogue Dropdown List with Artist & Keyword Filter */}
                  <div className="space-y-2.5 pt-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <input
                        type="text"
                        value={dropdownSearchQuery}
                        onChange={(e) => setDropdownSearchQuery(e.target.value)}
                        placeholder={
                          category === 'songs'
                            ? 'Search artists or tracks in dropdown (e.g. Tyler, Sade, Daft Punk)...'
                            : category === 'movies'
                            ? 'Search films or directors in dropdown (e.g. Nolan, Parasite, 1994)...'
                            : 'Search celebrities in dropdown (e.g. Taylor Swift, Messi, DiCaprio)...'
                        }
                        className={`flex-1 min-w-[200px] py-1.5 px-2.5 border border-current/30 focus:border-current focus:outline-none text-xs ${
                          darkMode
                            ? 'bg-[#0D0D0D] text-[#F3F2EE]'
                            : 'bg-white text-[#0A0A0A]'
                        }`}
                      />

                      {category === 'songs' && (
                        <select
                          aria-label="Filter catalogue by artist"
                          value={selectedArtistFilter}
                          onChange={(e) => setSelectedArtistFilter(e.target.value)}
                          className={`py-1.5 px-2.5 border border-current/30 focus:border-current focus:outline-none text-xs max-w-[210px] ${
                            darkMode
                              ? 'bg-[#0D0D0D] text-[#F3F2EE]'
                              : 'bg-white text-[#0A0A0A]'
                          }`}
                        >
                          <option value="">
                            All Artists ({availableCatalogueArtists.length})
                          </option>
                          {availableCatalogueArtists.map((art) => (
                            <option key={art.name} value={art.name}>
                              {art.name} ({art.count})
                            </option>
                          ))}
                        </select>
                      )}

                      {(dropdownSearchQuery || selectedArtistFilter) && (
                        <button
                          type="button"
                          onClick={() => {
                            setDropdownSearchQuery('');
                            setSelectedArtistFilter('');
                          }}
                          className="text-[11px] font-mono-tabular underline opacity-70 hover:opacity-100 whitespace-nowrap"
                        >
                          Clear filter
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs">
                      <label
                        htmlFor="catalogue-select"
                        className="font-mono-tabular opacity-60 whitespace-nowrap"
                      >
                        Catalogue ({filteredCatalogueDropdownOptions.length}/
                        {catalogueDropdownOptions.length}):
                      </label>
                      <select
                        id="catalogue-select"
                        value=""
                        onChange={(e) => {
                          const selectedKey = e.target.value;
                          const found = catalogueDropdownOptions.find(
                            (o) => o.key === selectedKey
                          );
                          const val = found ? found.value : selectedKey;
                          if (val) {
                            setGuessInput(val);
                            evaluateGuess(val);
                          }
                        }}
                        className={`flex-1 min-w-[220px] py-2 px-2.5 border border-current/30 focus:border-current focus:outline-none text-xs ${
                          darkMode
                            ? 'bg-[#0D0D0D] text-[#F3F2EE]'
                            : 'bg-white text-[#0A0A0A]'
                        }`}
                      >
                        <option value="">
                          {category === 'songs'
                            ? selectedArtistFilter
                              ? `Select from ${filteredCatalogueDropdownOptions.length} songs by ${selectedArtistFilter}...`
                              : dropdownSearchQuery
                              ? `Select from ${filteredCatalogueDropdownOptions.length} matching songs...`
                              : `Select from all ${catalogueDropdownOptions.length} songs in catalogue...`
                            : category === 'movies'
                            ? dropdownSearchQuery
                              ? `Select from ${filteredCatalogueDropdownOptions.length} matching movies...`
                              : `Select from all ${catalogueDropdownOptions.length} movies in catalogue...`
                            : dropdownSearchQuery
                            ? `Select from ${filteredCatalogueDropdownOptions.length} matching celebrities...`
                            : `Select from all ${catalogueDropdownOptions.length} celebrities in catalogue...`}
                        </option>
                        {filteredCatalogueDropdownOptions.map((opt) => (
                          <option key={opt.key} value={opt.key}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Quick-Select Matches when searching an artist or keyword in the dropdown */}
                    {(dropdownSearchQuery.trim() || selectedArtistFilter) &&
                      filteredCatalogueDropdownOptions.length > 0 && (
                        <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[11px] font-mono-tabular">
                          <span className="opacity-55 mr-1">Top matches:</span>
                          {filteredCatalogueDropdownOptions.slice(0, 6).map((opt) => (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => {
                                setGuessInput(opt.value);
                                evaluateGuess(opt.value);
                              }}
                              className="px-2 py-0.5 border border-current/25 hover:border-current transition-colors"
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-tabular opacity-65 pt-1">
                    <div className="flex items-center gap-4">
                      <button onClick={handleGiveUpRound} className="underline hover:opacity-100">
                        Reveal answer
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (showRectifyPanel) {
                            setShowRectifyPanel(false);
                          } else {
                            openRectifyPanelForCurrent();
                          }
                        }}
                        className="underline hover:opacity-100"
                      >
                        {showRectifyPanel ? 'Close error tool' : 'Flag error & rectify'}
                      </button>
                    </div>
                    {wrongAttempts > 0 && <span>Misses: {wrongAttempts}</span>}
                  </div>
                </div>
              ) : (
                <div className="pt-4 border-t border-current space-y-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <span className="font-mono-tabular text-xs opacity-60 block">
                        {roundResult.status === 'correct' ? 'Correct' : 'Answer'} ·{' '}
                        {roundResult.message}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-0.5">
                        {currentChallenge.answer}
                      </h2>
                      <p className="text-xs opacity-70 mt-0.5">{currentChallenge.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono-tabular">
                      <button
                        type="button"
                        onClick={() => {
                          if (showRectifyPanel) {
                            setShowRectifyPanel(false);
                          } else {
                            openRectifyPanelForCurrent();
                          }
                        }}
                        className="underline opacity-75 hover:opacity-100"
                      >
                        {showRectifyPanel ? 'Close rectify' : 'Flag / Rectify'}
                      </button>
                      {currentChallenge.spotifyUrl && (
                        <a
                          href={currentChallenge.spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Spotify ↗
                        </a>
                      )}
                      <button
                        onClick={handleNextChallenge}
                        className={`px-4 py-2 font-semibold border border-current ${
                          darkMode ? 'bg-white text-black' : 'bg-black text-white'
                        }`}
                      >
                        Next round →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* FLAG ERROR & LIVE RECTIFICATION PANEL */}
              {showRectifyPanel && (
                <div className="pt-5 border-t border-current space-y-4 text-xs">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <span className="font-mono-tabular text-[11px] uppercase tracking-wider opacity-60 block">
                        Error Flagging & Live Rectification · {currentChallenge.catalogNumber}
                      </span>
                      <h3 className="text-base font-bold mt-0.5">
                        Flag an issue or rectify this {category.slice(0, -1)} entry immediately
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowRectifyPanel(false)}
                      className="font-mono-tabular underline opacity-70 hover:opacity-100"
                    >
                      Close ×
                    </button>
                  </div>

                  {/* Issue Category Selector & Notes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-mono-tabular text-[11px] opacity-65 block">
                        Issue Type
                      </label>
                      <select
                        value={rectIssueType}
                        onChange={(e) =>
                          setRectIssueType(e.target.value as RectificationIssueType)
                        }
                        className={`w-full py-1.5 px-2.5 border border-current/30 focus:border-current focus:outline-none ${
                          darkMode ? 'bg-[#0D0D0D] text-[#F3F2EE]' : 'bg-white text-[#0A0A0A]'
                        }`}
                      >
                        <option value="artwork_image">Artwork missing or mismatched</option>
                        <option value="audio_preview">Audio preview mismatch or silent</option>
                        <option value="title_artist_typo">Title / artist / director typo</option>
                        <option value="clue_hint">Release year / genre / clue error</option>
                        <option value="other">Other catalogue discrepancy</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono-tabular text-[11px] opacity-65 block">
                        Error Note (Optional)
                      </label>
                      <input
                        type="text"
                        value={rectNotes}
                        onChange={(e) => setRectNotes(e.target.value)}
                        placeholder="Describe what was wrong..."
                        className="w-full py-1.5 px-2.5 bg-transparent border border-current/30 focus:border-current focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* One-Click Auto-Rectify Bar */}
                  <div className="py-2.5 px-3 border border-current/25 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono-tabular text-[11px] opacity-80">
                      Auto-repair metadata, cover art & audio from live catalogue:
                    </span>
                    <div className="flex flex-wrap items-center gap-3 font-mono-tabular text-[11px]">
                      <button
                        type="button"
                        onClick={handleAutoFetchRectification}
                        disabled={isAutoRectifying}
                        className="underline font-semibold hover:opacity-100"
                      >
                        {isAutoRectifying
                          ? 'Fetching live fix...'
                          : '↻ Auto-fetch official artwork & metadata'}
                      </button>
                      <button
                        type="button"
                        onClick={handleCycleLocalTopicArtwork}
                        className="underline opacity-75 hover:opacity-100"
                      >
                        Cycle verified local image
                      </button>
                    </div>
                  </div>

                  {/* Direct Rectification Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-mono-tabular text-[11px] opacity-65 block">
                        Correct Title / Name
                      </label>
                      <input
                        type="text"
                        value={rectAnswer}
                        onChange={(e) => setRectAnswer(e.target.value)}
                        className="w-full py-1.5 px-2.5 bg-transparent border border-current/30 focus:border-current focus:outline-none font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono-tabular text-[11px] opacity-65 block">
                        Artist / Director / Subtitle
                      </label>
                      <input
                        type="text"
                        value={rectSubtitle}
                        onChange={(e) => setRectSubtitle(e.target.value)}
                        className="w-full py-1.5 px-2.5 bg-transparent border border-current/30 focus:border-current focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono-tabular text-[11px] opacity-65 block">
                        Year Hint
                      </label>
                      <input
                        type="text"
                        value={rectYear}
                        onChange={(e) => setRectYear(e.target.value)}
                        className="w-full py-1.5 px-2.5 bg-transparent border border-current/30 focus:border-current focus:outline-none font-mono-tabular"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono-tabular text-[11px] opacity-65 block">
                        Genre Hint
                      </label>
                      <input
                        type="text"
                        value={rectGenre}
                        onChange={(e) => setRectGenre(e.target.value)}
                        className="w-full py-1.5 px-2.5 bg-transparent border border-current/30 focus:border-current focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono-tabular text-[11px] opacity-65 block">
                        Initials Hint
                      </label>
                      <input
                        type="text"
                        value={rectInitials}
                        onChange={(e) => setRectInitials(e.target.value)}
                        className="w-full py-1.5 px-2.5 bg-transparent border border-current/30 focus:border-current focus:outline-none font-mono-tabular"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono-tabular text-[11px] opacity-65 block">
                        Artwork Image URL
                      </label>
                      <input
                        type="text"
                        value={rectArtworkUrl}
                        onChange={(e) => setRectArtworkUrl(e.target.value)}
                        className="w-full py-1.5 px-2.5 bg-transparent border border-current/30 focus:border-current focus:outline-none font-mono-tabular"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono-tabular text-[11px] opacity-65 block">
                      Primary Pinpoint Clue / Liner Note
                    </label>
                    <textarea
                      rows={2}
                      value={rectPinpointClue}
                      onChange={(e) => setRectPinpointClue(e.target.value)}
                      className="w-full py-1.5 px-2.5 bg-transparent border border-current/30 focus:border-current focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleSaveRectification('rectified')}
                        className={`px-3.5 py-1.5 font-mono-tabular text-xs font-semibold border border-current ${
                          darkMode ? 'bg-white text-black' : 'bg-black text-white'
                        }`}
                      >
                        Apply & Rectify Now ✓
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveRectification('flagged')}
                        className="px-3 py-1.5 font-mono-tabular text-xs border border-current/40 hover:border-current"
                      >
                        Flag Error Only
                      </button>
                    </div>

                    {rectificationsMap[currentChallenge.id] && (
                      <button
                        type="button"
                        onClick={() => handleRevertRectification(currentChallenge.id)}
                        className="font-mono-tabular text-[11px] underline opacity-70 hover:opacity-100"
                      >
                        Reset to original entry
                      </button>
                    )}
                  </div>

                  {/* Active Flagged / Rectified Items Ledger */}
                  {Object.keys(rectificationsMap).length > 0 && (
                    <div className="pt-3 border-t border-current/15 space-y-1.5">
                      <span className="font-mono-tabular text-[11px] opacity-60 block">
                        Flagged & Rectified Log ({Object.keys(rectificationsMap).length}):
                      </span>
                      <div className="divide-y divide-current/10 max-h-32 overflow-y-auto">
                        {Object.values(rectificationsMap).map((rec) => (
                          <div
                            key={rec.id}
                            className="py-1.5 flex items-center justify-between gap-2 text-[11px] font-mono-tabular"
                          >
                            <span className="truncate">
                              [{rec.status.toUpperCase()}]{' '}
                              {rec.patch?.answer || rec.challengeId} —{' '}
                              {rec.issueType.replace(/_/g, ' ')}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRevertRectification(rec.challengeId)}
                              className="underline opacity-65 hover:opacity-100 shrink-0"
                            >
                              revert
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column (5 cols): Quiet Archival Sleeve & Session Ledger */}
            <div className="lg:col-span-5 lg:pl-8 lg:border-l border-current/15 flex flex-col justify-between space-y-6">
              <div className="max-w-[280px]">
                <div className="aspect-square w-full overflow-hidden bg-neutral-200 dark:bg-neutral-900 mb-2.5">
                  {(() => {
                    const fallbackLocal =
                      INITIAL_SONG_CHALLENGES.find((c) => c.id === currentChallenge.id)?.artworkUrl ||
                      MOVIE_CHALLENGES.find((c) => c.id === currentChallenge.id)?.artworkUrl ||
                      CELEBRITY_CHALLENGES.find((c) => c.id === currentChallenge.id)?.artworkUrl ||
                      EDITORIAL_CONTACT_STRIP[0].image;
                    const sleeveSrc = brokenImages[currentChallenge.id]
                      ? fallbackLocal
                      : currentChallenge.artworkUrl;
                    return (
                      <img
                        src={sleeveSrc}
                        alt={currentChallenge.answer}
                        referrerPolicy="no-referrer"
                        onError={() => {
                          if (!brokenImages[currentChallenge.id]) {
                            setBrokenImages((prev) => ({
                              ...prev,
                              [currentChallenge.id]: true,
                            }));
                          }
                        }}
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          roundResult.status === 'idle'
                            ? 'blur-xl scale-110 grayscale'
                            : 'blur-0 scale-100 grayscale-0'
                        }`}
                      />
                    );
                  })()}
                </div>
                <p className="text-[11px] font-mono-tabular opacity-60 leading-snug">
                  {roundResult.status === 'idle'
                    ? `Fig. ${currentChallengeIndex + 1} — Sleeve obscured until identified.`
                    : `Fig. ${currentChallengeIndex + 1} — ${currentChallenge.answer} (${currentChallenge.hints.year}).`}
                </p>
              </div>

              <div className="pt-4 border-t border-current/15 text-xs font-mono-tabular space-y-1 opacity-75">
                <div>
                  Score: {score} pts · Streak: {streak}x · Tokens: {tokens}
                </div>
                <div>
                  Designation: {editorialTitle} · Free hints: {freeHintPasses}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. MULTIPLAYER VIEW */}
        {activeSection === 'multiplayer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="border-b border-current/15 pb-3">
                <h2 className="text-lg font-bold">Live Rooms</h2>
                <p className="text-xs opacity-70 mt-1">
                  Join a room or open a table for friends. Every correct answer in Play updates your
                  room score in real time.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-baseline gap-3 border-b border-current/25 pb-1.5">
                  <span className="font-mono-tabular opacity-60">Name:</span>
                  <input
                    type="text"
                    value={localHandle}
                    maxLength={40}
                    onChange={(e) => setLocalHandle(e.target.value)}
                    className="flex-1 bg-transparent focus:outline-none font-medium"
                  />
                </div>

                <form
                  onSubmit={handleCreateMultiplayerRoom}
                  className="flex items-baseline gap-3 border-b border-current pb-1.5"
                >
                  <input
                    type="text"
                    value={newRoomCodeInput}
                    onChange={(e) => setNewRoomCodeInput(e.target.value)}
                    placeholder="New room code (e.g. STUDIO-09)..."
                    maxLength={10}
                    className="flex-1 bg-transparent focus:outline-none uppercase font-mono-tabular"
                  />
                  <button type="submit" className="font-mono-tabular underline whitespace-nowrap">
                    Open room +
                  </button>
                </form>
              </div>

              <div className="divide-y divide-current/15 border-t border-b border-current/15">
                {wsRooms.map((rm) => {
                  const isJoined = activeRoomCode === rm.roomCode;
                  return (
                    <div
                      key={rm.roomCode}
                      className="py-3 flex items-baseline justify-between gap-4 text-xs"
                    >
                      <div>
                        <span className="font-mono-tabular font-bold">{rm.roomCode}</span>
                        <span aria-hidden="true"> · </span>
                        <span className="opacity-70">
                          {rm.category} · {rm.players.length}/4 players
                        </span>
                        <p className="text-[11px] opacity-60 mt-0.5">{rm.lastEvent}</p>
                      </div>
                      <button
                        onClick={() => handleJoinMultiplayerRoom(rm.roomCode)}
                        className={`font-mono-tabular whitespace-nowrap ${
                          isJoined ? 'font-bold underline' : 'opacity-70 hover:opacity-100 underline'
                        }`}
                      >
                        {isJoined ? 'Active' : 'Join'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7 lg:pl-8 lg:border-l border-current/15 space-y-6">
              {(() => {
                const currentRoom =
                  wsRooms.find((r) => r.roomCode === activeRoomCode) || wsRooms[0];
                if (!currentRoom) return null;
                return (
                  <>
                    <div className="flex items-baseline justify-between border-b border-current/15 pb-3">
                      <div>
                        <span className="font-mono-tabular text-xs opacity-60">
                          Room {currentRoom.roomCode} · Round {currentRoom.roundIndex + 1} of 5
                        </span>
                        <h3 className="text-xl font-bold mt-0.5 capitalize">
                          {currentRoom.category} Table
                        </h3>
                      </div>
                      <button
                        onClick={() => handleSelectCategory(currentRoom.category)}
                        className={`px-4 py-1.5 text-xs font-medium border border-current ${
                          darkMode ? 'bg-white text-black' : 'bg-black text-white'
                        }`}
                      >
                        Go to round →
                      </button>
                    </div>

                    <div className="divide-y divide-current/15 border-b border-current/15 text-sm">
                      {currentRoom.players.map((plr, i) => (
                        <div key={plr.id} className="py-3 flex items-center justify-between">
                          <div>
                            <span className="font-mono-tabular text-xs opacity-50 mr-3">
                              0{i + 1}
                            </span>
                            <span className="font-medium">{plr.name}</span>
                          </div>
                          <div className="font-mono-tabular text-xs">
                            <span>{plr.streak}x streak</span>
                            <span aria-hidden="true"> · </span>
                            <strong>{plr.score} pts</strong>
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs font-mono-tabular opacity-65">
                      Latest: {currentRoom.lastEvent}
                    </p>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* 3. BADGES & VAULT VIEW */}
        {activeSection === 'badges' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-baseline justify-between border-b border-current/15 pb-2">
                <h2 className="text-sm font-bold uppercase tracking-wider">
                  Badges ({unlockedBadges.length}/{BADGE_CATALOG.length})
                </h2>
                <span className="text-xs font-mono-tabular opacity-65">
                  Earned from correct answers
                </span>
              </div>

              <div className="divide-y divide-current/15 border-b border-current/15">
                {BADGE_CATALOG.map((badge) => {
                  const isEarned = unlockedBadges.includes(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`py-3.5 flex items-baseline justify-between gap-4 text-xs ${
                        isEarned ? 'opacity-100' : 'opacity-45'
                      }`}
                    >
                      <div>
                        <span className="font-mono-tabular mr-2">{badge.kicker}</span>
                        <strong className="text-sm">{badge.title}</strong>
                        <span aria-hidden="true"> — </span>
                        <span>{badge.description}</span>
                      </div>
                      <span className="font-mono-tabular whitespace-nowrap shrink-0">
                        {isEarned ? 'Earned ✓' : `+${badge.tokenReward} tokens`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-baseline justify-between border-b border-current/15 pb-2">
                <h2 className="text-sm font-bold uppercase tracking-wider">Reward Vault</h2>
                <span className="text-xs font-mono-tabular">Balance: {tokens} tokens</span>
              </div>

              <div className="divide-y divide-current/15 border-b border-current/15">
                {VAULT_REWARDS.map((item) => {
                  const isOwned =
                    unlockedRewards.includes(item.id) && item.type !== 'hint_pass';
                  const isEquipped =
                    (item.type === 'visualizer_theme' && visualizerTheme === item.value) ||
                    (item.type === 'editorial_title' && editorialTitle === item.value);

                  return (
                    <div
                      key={item.id}
                      className="py-3.5 flex items-baseline justify-between gap-4 text-xs"
                    >
                      <div>
                        <strong className="text-sm block">{item.name}</strong>
                        <span className="opacity-65">{item.description}</span>
                      </div>
                      <button
                        onClick={() => handleRedeemVaultItem(item.id)}
                        disabled={!isOwned && tokens < item.cost}
                        className="font-mono-tabular underline whitespace-nowrap shrink-0 disabled:opacity-35 disabled:no-underline"
                      >
                        {isEquipped
                          ? 'Active'
                          : isOwned
                          ? 'Equip'
                          : `Redeem (${item.cost})`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 4. LEADERBOARD VIEW */}
        {activeSection === 'leaderboard' && (
          <div className="max-w-[820px] space-y-4">
            <div className="flex items-baseline justify-between border-b border-current pb-2">
              <h2 className="text-sm font-bold uppercase tracking-wider">
                Global & Friends Index
              </h2>
              {!currentUser && (
                <button
                  onClick={() => signInWithGoogle()}
                  className="text-xs font-mono-tabular underline"
                >
                  Sign in with Google to publish score
                </button>
              )}
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-current/20 font-mono-tabular opacity-55">
                  <th className="py-2 pr-4 font-normal">No.</th>
                  <th className="py-2 px-4 font-normal">Name</th>
                  <th className="py-2 px-4 font-normal">Title</th>
                  <th className="py-2 px-4 text-right font-normal">Streak</th>
                  <th className="py-2 pl-4 text-right font-normal">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-current/15">
                {combinedLeaderboard.map((row, idx) => (
                  <tr
                    key={row.userId}
                    className={row.isCurrentUser ? 'font-bold' : 'opacity-85'}
                  >
                    <td className="py-3 pr-4 font-mono-tabular">
                      {String(idx + 1).padStart(2, '0')}
                    </td>
                    <td className="py-3 px-4">
                      {row.displayName}
                      {row.isCurrentUser ? ' *' : ''}
                    </td>
                    <td className="py-3 px-4 opacity-70">{row.editorialTitle}</td>
                    <td className="py-3 px-4 text-right font-mono-tabular">{row.streak}x</td>
                    <td className="py-3 pl-4 text-right font-mono-tabular">
                      {row.score.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* ================================================================= */}
      {/* BOTTOM BAR: EXACT SWISS GRID REPLICA OF UPLOADED REFERENCE IMAGE   */}
      {/* ================================================================= */}
      <footer className="px-3 sm:px-5 pb-4 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
          {/* Bottom-Left: Concentric Vinyl Spiral SVG + serif italic "guess" + bold "“Guess That!”" + plain nav links */}
          <div className="lg:col-span-3 space-y-1.5">
            <div className="flex items-center gap-2 leading-none">
              {/* Hand-drawn style concentric spiral SVG matching reference */}
              <svg
                viewBox="0 0 44 26"
                className="w-9 h-5 stroke-current fill-none shrink-0"
                strokeWidth="1.5"
              >
                <ellipse cx="22" cy="13" rx="20" ry="10.5" />
                <ellipse cx="22" cy="13" rx="15" ry="7.8" />
                <ellipse cx="22" cy="13" rx="10" ry="5" />
                <ellipse cx="22" cy="13" rx="5" ry="2.4" />
                <circle cx="22" cy="13" r="1.2" className="fill-current" />
              </svg>
              <span className="font-editorial-serif italic text-3xl tracking-tight">
                guess
              </span>
              <span className="font-display font-bold text-xl tracking-[-0.04em]">
                {heroHeadline}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10.5px] font-mono-tabular tracking-tight">
              <button onClick={() => setActiveSection('play')} className="hover:underline">
                Play
              </button>
              <button onClick={() => setActiveSection('multiplayer')} className="hover:underline">
                Multiplayer
              </button>
              <button onClick={() => setActiveSection('badges')} className="hover:underline">
                Badges
              </button>
              <button onClick={() => setActiveSection('leaderboard')} className="hover:underline">
                Leaderboard
              </button>
              <button onClick={handleConnectSpotify} className="hover:underline">
                Spotify
              </button>
              <button onClick={() => setDarkMode((p) => !p)} className="hover:underline">
                {darkMode ? 'Light' : 'Dark'}
              </button>
              <button onClick={() => setActiveSection('badges')} className="hover:underline">
                Vault ({tokens})
              </button>
            </div>
          </div>

          {/* Bottom-Center: 1px Solid Rectangle with Ticker + 3 Square Diagonal-Text Category Cells */}
          <div className="lg:col-span-3 flex items-stretch border border-current h-[48px]">
            <div className="flex-1 px-2.5 flex items-center text-[10px] font-mono-tabular overflow-hidden whitespace-nowrap">
              <span className="truncate">
                score {score} -~*°&apos;¨&apos;°*~, round {currentChallengeIndex + 1}/
                {activeChallengeList.length}
              </span>
            </div>
            {(
              [
                { id: 'songs' as CategoryType, label: 'Music' },
                { id: 'movies' as CategoryType, label: 'Films' },
                { id: 'celebrities' as CategoryType, label: 'Icons' },
              ] as const
            ).map((tab) => {
              const isSelected = category === tab.id && activeSection === 'play';
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSelectCategory(tab.id)}
                  className={`w-[48px] border-l border-current flex items-center justify-center text-[10px] font-mono-tabular transition-colors shrink-0 ${
                    isSelected
                      ? darkMode
                        ? 'bg-white text-black font-bold'
                        : 'bg-black text-white font-bold'
                      : 'hover:bg-current/5'
                  }`}
                >
                  <span className="-rotate-45 whitespace-nowrap block">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom-Right: Two Compact Typewriter Columns (Matching Reference Image) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 text-[10.5px] leading-[1.42] font-mono-tabular opacity-85">
            <p>
              Guess That! is a full-service music, film, and cultural deduction index built to
              test memory with audio snippets, pinpoint clues, and live rooms all around the world.
            </p>
            <p>
              We are made of listeners, filmgoers, and archivists upholding the value of sound and
              cinema in culture. © 2026 Guess That! All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
