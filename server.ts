import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import path from 'path';

const app = express();
app.use(express.json());

const PORT = 3000;

interface SpotifyTrackChallenge {
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
}

interface SpotifySessionData {
  accessToken: string;
  displayName: string;
  spotifyId: string;
  connectedAt: string;
  customTracks: SpotifyTrackChallenge[];
}

let activeSpotifySession: SpotifySessionData | null = null;

const SEED_TRACK_QUERIES: Omit<SpotifyTrackChallenge, 'previewUrl' | 'albumArtUrl' | 'spotifyUrl'>[] = [
  {
    id: 'song-wusyaname',
    title: 'WUSYANAME',
    artist: 'Tyler, The Creator',
    album: 'CALL ME IF YOU GET LOST',
    releaseYear: 2021,
    genre: 'Hip-Hop / Neo-Soul',
    artistInitials: 'T. T. C.',
    pinpointClue: 'Samples H-Town’s 90s R&B slow jam "Back Seat (Wit No Sheets)" while DJ Drama shouts out Geneva water.',
    synthNotes: [329.63, 369.99, 440.0, 493.88, 440.0, 369.99, 329.63, 293.66],
    bpm: 142,
  },
  {
    id: 'song-less-i-know',
    title: 'The Less I Know The Better',
    artist: 'Tame Impala',
    album: 'Currents',
    releaseYear: 2015,
    genre: 'Psychedelic Disco / Indie Pop',
    artistInitials: 'T. I.',
    pinpointClue: 'Opens with an iconic overdriven Hofner violin bassline played by Kevin Parker in Fremantle.',
    synthNotes: [277.18, 329.63, 369.99, 440.0, 415.3, 369.99, 329.63, 277.18],
    bpm: 117,
  },
  {
    id: 'song-shape-of-you',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    releaseYear: 2017,
    genre: 'Pop / Tropical House',
    artistInitials: 'E. S.',
    pinpointClue: 'Built on a tropical-house marimba loop originally written with Rihanna in mind.',
    synthNotes: [277.18, 329.63, 277.18, 369.99, 329.63, 277.18, 246.94, 277.18],
    bpm: 96,
  },
  {
    id: 'song-blinding-lights',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    releaseYear: 2019,
    genre: 'Synthwave / Electropop',
    artistInitials: 'T. W.',
    pinpointClue: 'Driven by a Roland Juno-60 synth riff inspired by 1980s neon midnight drives through Las Vegas.',
    synthNotes: [349.23, 349.23, 311.13, 349.23, 392.0, 261.63, 311.13, 349.23],
    bpm: 171,
  },
  {
    id: 'song-billie-jean',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    releaseYear: 1982,
    genre: 'Post-Disco / R&B Funk',
    artistInitials: 'M. J.',
    pinpointClue: 'Bruce Swedien mixed this track 91 times before Quincy Jones approved Mix #2.',
    synthNotes: [185.0, 207.65, 246.94, 277.18, 246.94, 207.65, 185.0, 164.81],
    bpm: 117,
  },
  {
    id: 'song-shake-it-off',
    title: 'Shake It Off',
    artist: 'Taylor Swift',
    album: '1989',
    releaseYear: 2014,
    genre: 'Dance-Pop',
    artistInitials: 'T. S.',
    pinpointClue: 'Upbeat saxophone-driven lead single that marked Taylor Swift’s official transition from country to pop.',
    synthNotes: [293.66, 329.63, 392.0, 440.0, 392.0, 329.63, 293.66, 261.63],
    bpm: 160,
  },
  {
    id: 'song-uptown-funk',
    title: 'Uptown Funk',
    artist: 'Mark Ronson ft. Bruno Mars',
    album: 'Uptown Special',
    releaseYear: 2014,
    genre: 'Funk-Pop / Boogie',
    artistInitials: 'M. R. & B. M.',
    pinpointClue: 'Brass-heavy Minneapolis-funk anthem that spent 14 consecutive weeks at #1 on the Billboard Hot 100.',
    synthNotes: [293.66, 349.23, 392.0, 440.0, 392.0, 349.23, 293.66, 261.63],
    bpm: 115,
  },
  {
    id: 'song-bad-guy',
    title: 'bad guy',
    artist: 'Billie Eilish',
    album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
    releaseYear: 2019,
    genre: 'Electropop / Alt-Pop',
    artistInitials: 'B. E.',
    pinpointClue: 'Minimalist bass-and-finger-snap pop hit recorded in a childhood bedroom in Highland Park with brother Finneas.',
    synthNotes: [196.0, 196.0, 293.66, 196.0, 277.18, 261.63, 233.08, 196.0],
    bpm: 135,
  },
  {
    id: 'song-bohemian-rhapsody',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    releaseYear: 1975,
    genre: 'Progressive Rock / Opera Rock',
    artistInitials: 'Q.',
    pinpointClue: 'Six-minute suite with no chorus, transitioning from a piano ballad to an operatic section and hard-rock solo.',
    synthNotes: [233.08, 261.63, 293.66, 349.23, 392.0, 349.23, 293.66, 233.08],
    bpm: 72,
  },
  {
    id: 'song-smells-like-teen-spirit',
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    album: 'Nevermind',
    releaseYear: 1991,
    genre: 'Grunge / Alternative Rock',
    artistInitials: 'N.',
    pinpointClue: 'Opens with a four-chord Fender Mustang guitar riff before Dave Grohl’s explosive drum fill kicks in.',
    synthNotes: [174.61, 233.08, 207.65, 277.18, 174.61, 233.08, 207.65, 277.18],
    bpm: 117,
  },
  {
    id: 'song-rolling-in-the-deep',
    title: 'Rolling in the Deep',
    artist: 'Adele',
    album: '21',
    releaseYear: 2010,
    genre: 'Soul Pop / Gospel Blues',
    artistInitials: 'A.',
    pinpointClue: 'Written the afternoon after a breakup with producer Paul Epworth, driven by a pounding stomp-and-piano rhythm.',
    synthNotes: [261.63, 293.66, 311.13, 349.23, 392.0, 349.23, 311.13, 261.63],
    bpm: 105,
  },
  {
    id: 'song-get-lucky',
    title: 'Get Lucky',
    artist: 'Daft Punk ft. Pharrell Williams',
    album: 'Random Access Memories',
    releaseYear: 2013,
    genre: 'French House / Disco Funk',
    artistInitials: 'D. P.',
    pinpointClue: 'Recorded at Henson Recording Studios with Nile Rodgers on a 1960 Fender Stratocaster.',
    synthNotes: [293.66, 329.63, 369.99, 440.0, 369.99, 329.63, 246.94, 293.66],
    bpm: 116,
  },
  {
    id: 'song-dreams',
    title: 'Dreams',
    artist: 'Fleetwood Mac',
    album: 'Rumours',
    releaseYear: 1977,
    genre: 'Soft Rock / Classic Pop',
    artistInitials: 'F. M.',
    pinpointClue: 'Written by Stevie Nicks in 10 minutes inside Sly Stone’s sunken-bed studio at Record Plant.',
    synthNotes: [349.23, 392.0, 440.0, 392.0, 349.23, 329.63, 293.66, 349.23],
    bpm: 120,
  },
  {
    id: 'song-smooth-operator',
    title: 'Smooth Operator',
    artist: 'Sade',
    album: 'Diamond Life',
    releaseYear: 1984,
    genre: 'Sophisti-Pop / Soul Jazz',
    artistInitials: 'S.',
    pinpointClue: 'Features a smoky tenor saxophone solo by Stuart Matthewman and coastal jet-set lyrics.',
    synthNotes: [293.66, 349.23, 440.0, 415.3, 392.0, 349.23, 329.63, 293.66],
    bpm: 120,
  },
  {
    id: 'song-everything-right-place',
    title: 'Everything In Its Right Place',
    artist: 'Radiohead',
    album: 'Kid A',
    releaseYear: 2000,
    genre: 'Art Electronic / Experimental',
    artistInitials: 'R.',
    pinpointClue: 'Built on a 10/4 time signature Prophet-5 synthesizer progression and Kaoss Pad vocal loops.',
    synthNotes: [261.63, 277.18, 311.13, 349.23, 392.0, 349.23, 311.13, 261.63],
    bpm: 124,
  },
  {
    id: 'song-pink-white',
    title: 'Pink + White',
    artist: 'Frank Ocean',
    album: 'Blonde',
    releaseYear: 2016,
    genre: 'Neo-Soul / Avant-R&B',
    artistInitials: 'F. O.',
    pinpointClue: 'Produced by Pharrell Williams with lush string arrangements and uncredited backing vocals by Beyoncé.',
    synthNotes: [329.63, 369.99, 440.0, 493.88, 440.0, 369.99, 329.63, 293.66],
    bpm: 80,
  },
  {
    id: 'song-once-in-a-lifetime',
    title: 'Once in a Lifetime',
    artist: 'Talking Heads',
    album: 'Remain in Light',
    releaseYear: 1980,
    genre: 'New Wave / Post-Punk',
    artistInitials: 'T. H.',
    pinpointClue: 'Produced by Brian Eno at Compass Point Studios in Nassau using polyrhythmic tape loops.',
    synthNotes: [293.66, 369.99, 440.0, 293.66, 392.0, 440.0, 369.99, 293.66],
    bpm: 117,
  },
  {
    id: 'song-blue-monday',
    title: 'Blue Monday',
    artist: 'New Order',
    album: 'Power, Corruption & Lies',
    releaseYear: 1983,
    genre: 'Synth-Pop / Hi-NRG',
    artistInitials: 'N. O.',
    pinpointClue: 'Opens with a stuttered Oberheim DMX sixteenth-note kick drum programmed by Stephen Morris.',
    synthNotes: [293.66, 293.66, 440.0, 392.0, 349.23, 329.63, 293.66, 261.63],
    bpm: 130,
  },
  {
    id: 'song-teardrop',
    title: 'Teardrop',
    artist: 'Massive Attack',
    album: 'Mezzanine',
    releaseYear: 1998,
    genre: 'Trip-Hop / Downtempo',
    artistInitials: 'M. A.',
    pinpointClue: 'Built over a vinyl heartbeat-like drum sample with guest vocals by Elizabeth Fraser.',
    synthNotes: [220.0, 246.94, 261.63, 246.94, 220.0, 196.0, 220.0, 246.94],
    bpm: 77,
  },
  {
    id: 'song-heart-of-glass',
    title: 'Heart of Glass',
    artist: 'Blondie',
    album: 'Parallel Lines',
    releaseYear: 1979,
    genre: 'New Wave / Disco',
    artistInitials: 'B.',
    pinpointClue: 'Produced by Mike Chapman using a Roland CR-78 drum machine synced to Clem Burke’s acoustic drums.',
    synthNotes: [329.63, 369.99, 415.3, 440.0, 415.3, 369.99, 329.63, 246.94],
    bpm: 115,
  },
  {
    id: 'song-midnight-city',
    title: 'Midnight City',
    artist: 'M83',
    album: 'Hurry Up, We’re Dreaming',
    releaseYear: 2011,
    genre: 'Synth-Pop / Indietronica',
    artistInitials: 'M.',
    pinpointClue: 'Opens with a pitch-bent vocal synth lead created by Anthony Gonzalez distorting his own voice.',
    synthNotes: [493.88, 392.0, 329.63, 440.0, 369.99, 293.66, 392.0, 329.63],
    bpm: 105,
  },
  {
    id: 'song-paper-planes',
    title: 'Paper Planes',
    artist: 'M.I.A.',
    album: 'Kala',
    releaseYear: 2007,
    genre: 'Alternative Hip-Hop / Indie',
    artistInitials: 'M. I. A.',
    pinpointClue: 'Built directly around the bass and guitar intro of The Clash’s 1982 track "Straight to Hell".',
    synthNotes: [293.66, 329.63, 349.23, 392.0, 349.23, 329.63, 293.66, 261.63],
    bpm: 86,
  },
  {
    id: 'song-virtual-insanity',
    title: 'Virtual Insanity',
    artist: 'Jamiroquai',
    album: 'Travelling Without Moving',
    releaseYear: 1996,
    genre: 'Acid Jazz / Funk',
    artistInitials: 'J.',
    pinpointClue: 'Inspired by witnessing underground malls in Sapporo, Japan during a winter tour.',
    synthNotes: [311.13, 349.23, 392.0, 466.16, 415.3, 392.0, 349.23, 311.13],
    bpm: 92,
  },
  {
    id: 'song-toxic',
    title: 'Toxic',
    artist: 'Britney Spears',
    album: 'In the Zone',
    releaseYear: 2003,
    genre: 'Dance-Pop / Electropop',
    artistInitials: 'B. S.',
    pinpointClue: 'Produced by Bloodshy & Avant in Stockholm, sampling Lata Mangeshkar’s 1981 Bollywood strings.',
    synthNotes: [261.63, 293.66, 311.13, 493.88, 466.16, 392.0, 311.13, 261.63],
    bpm: 143,
  },
];

let cachedSeedTracks: SpotifyTrackChallenge[] | null = null;
let cachedTopicArtwork: Record<string, string> | null = null;

async function fetchWikiThumbnail(wikiTitle: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`,
      {
        headers: {
          'User-Agent': 'GuessThatEditorialGame/1.0 (https://aistudio.google.com)',
        },
      }
    );
    if (res.ok) {
      const data = (await res.json()) as {
        thumbnail?: { source?: string };
        originalimage?: { source?: string };
      };
      return data.thumbnail?.source || data.originalimage?.source || null;
    }
  } catch {
    // ignore
  }
  return null;
}

async function fetchItunesArtwork(query: string, entity: 'song' | 'movie' = 'song'): Promise<string | null> {
  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=${entity}&limit=2`
    );
    if (res.ok) {
      const data = (await res.json()) as {
        results?: Array<{ artworkUrl100?: string }>;
      };
      const raw = data.results?.[0]?.artworkUrl100;
      if (raw) {
        return raw.replace('100x100bb', '600x600bb');
      }
    }
  } catch {
    // ignore
  }
  return null;
}

async function enrichTrackWithPreview(
  seed: Omit<SpotifyTrackChallenge, 'previewUrl' | 'albumArtUrl' | 'spotifyUrl'>
): Promise<SpotifyTrackChallenge> {
  try {
    const query = encodeURIComponent(`${seed.title} ${seed.artist.split(' ft.')[0]}`);
    const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=3`);
    if (response.ok) {
      const data = (await response.json()) as {
        results?: Array<{
          previewUrl?: string;
          artworkUrl100?: string;
          trackViewUrl?: string;
        }>;
      };
      const match = data.results?.find((r) => Boolean(r.previewUrl));
      if (match?.previewUrl) {
        return {
          ...seed,
          previewUrl: match.previewUrl,
          albumArtUrl: match.artworkUrl100 ? match.artworkUrl100.replace('100x100bb', '600x600bb') : null,
          spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(`${seed.title} ${seed.artist}`)}`,
        };
      }
    }
  } catch {
    // Fallback to synthesized preview if offline
  }
  return {
    ...seed,
    previewUrl: null,
    albumArtUrl: null,
    spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(`${seed.title} ${seed.artist}`)}`,
  };
}

function getRedirectUri(req: express.Request): string {
  const configuredAppUrl = process.env.APP_URL;
  if (configuredAppUrl && configuredAppUrl !== 'MY_APP_URL' && configuredAppUrl.startsWith('http')) {
    return `${configuredAppUrl.replace(/\/$/, '')}/auth/callback`;
  }
  const origin = req.query.origin as string | undefined;
  if (origin && origin.startsWith('http')) {
    return `${origin.replace(/\/$/, '')}/auth/callback`;
  }
  const host = req.headers['x-forwarded-host'] || req.headers.host || `localhost:${PORT}`;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  return `${proto}://${host}/auth/callback`;
}

// 1. Spotify OAuth Endpoints
app.get('/api/spotify/status', (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID || '';
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || '';
  const configured = Boolean(clientId && clientSecret);
  res.json({
    configured,
    connected: Boolean(activeSpotifySession),
    profile: activeSpotifySession
      ? {
          displayName: activeSpotifySession.displayName,
          spotifyId: activeSpotifySession.spotifyId,
          connectedAt: activeSpotifySession.connectedAt,
          tracksCount: activeSpotifySession.customTracks.length,
        }
      : null,
    callbackUrl: getRedirectUri(req),
  });
});

app.get('/api/spotify/auth-url', (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  if (!clientId) {
    res.status(400).json({
      error: 'SPOTIFY_CLIENT_ID is not configured in environment secrets.',
      callbackUrl: getRedirectUri(req),
    });
    return;
  }

  const redirectUri = getRedirectUri(req);
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: 'user-read-private user-top-read user-library-read',
    show_dialog: 'true',
  });

  res.json({
    url: `https://accounts.spotify.com/authorize?${params.toString()}`,
    redirectUri,
  });
});

const spotifyCallbackHandler = async (req: express.Request, res: express.Response) => {
  const code = req.query.code as string | undefined;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!code || !clientId || !clientSecret) {
    res.send(`
      <html>
        <body style="font-family: sans-serif; padding: 24px; background: #0B0B0C; color: #F5F4F0;">
          <p>Spotify authorization canceled or missing credentials.</p>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR' }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
        </body>
      </html>
    `);
    return;
  }

  try {
    const redirectUri = getRedirectUri(req);
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (tokenRes.ok) {
      const tokenData = (await tokenRes.json()) as { access_token: string };
      const accessToken = tokenData.access_token;

      const profileRes = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const profile = profileRes.ok
        ? ((await profileRes.json()) as { display_name?: string; id?: string })
        : { display_name: 'Spotify Listener', id: 'spotify_user' };

      const topRes = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const customTracks: SpotifyTrackChallenge[] = [];
      if (topRes.ok) {
        const topData = (await topRes.json()) as {
          items?: Array<{
            id: string;
            name: string;
            preview_url: string | null;
            external_urls?: { spotify?: string };
            artists: Array<{ name: string }>;
            album: {
              name: string;
              release_date?: string;
              images?: Array<{ url: string }>;
            };
          }>;
        };

        for (const item of topData.items || []) {
          const artistName = item.artists.map((a) => a.name).join(', ');
          const initials = artistName
            .split(' ')
            .map((part) => `${part[0]?.toUpperCase() || ''}.`)
            .join(' ');
          const releaseYear = Number(item.album.release_date?.slice(0, 4)) || 2020;

          let previewUrl = item.preview_url;
          if (!previewUrl) {
            const enriched = await enrichTrackWithPreview({
              id: `sp-${item.id}`,
              title: item.name,
              artist: artistName,
              album: item.album.name,
              releaseYear,
              genre: 'Spotify Personal Rotation',
              artistInitials: initials,
              pinpointClue: `From your personal Spotify rotation on the album "${item.album.name}".`,
              synthNotes: [293.66, 369.99, 440.0, 329.63, 293.66, 369.99, 440.0, 523.25],
              bpm: 118,
            });
            previewUrl = enriched.previewUrl;
          }

          customTracks.push({
            id: `sp-${item.id}`,
            title: item.name,
            artist: artistName,
            album: item.album.name,
            releaseYear,
            genre: 'Spotify Top Rotation',
            artistInitials: initials,
            pinpointClue: `Featured on the album "${item.album.name}" (${releaseYear}).`,
            previewUrl,
            albumArtUrl: item.album.images?.[0]?.url || null,
            spotifyUrl: item.external_urls?.spotify || null,
            synthNotes: [293.66, 369.99, 440.0, 329.63, 293.66, 369.99, 440.0, 523.25],
            bpm: 118,
          });
        }
      }

      activeSpotifySession = {
        accessToken,
        displayName: profile.display_name || 'Spotify Listener',
        spotifyId: profile.id || 'spotify_user',
        connectedAt: new Date().toISOString(),
        customTracks,
      };
    }
  } catch (err) {
    console.error('Spotify OAuth exchange error:', err);
  }

  res.send(`
    <html>
      <body style="font-family: sans-serif; padding: 24px; background: #0B0B0C; color: #F5F4F0;">
        <script>
          if (window.opener) {
            window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
            window.close();
          } else {
            window.location.href = '/';
          }
        </script>
        <p>Spotify connected. This window will close automatically.</p>
      </body>
    </html>
  `);
};

app.get(['/auth/callback', '/auth/callback/'], spotifyCallbackHandler);

// 2. Music Preview Catalog & Live Search API
app.get('/api/music/tracks', async (_req, res) => {
  if (!cachedSeedTracks) {
    cachedSeedTracks = await Promise.all(SEED_TRACK_QUERIES.map((seed) => enrichTrackWithPreview(seed)));
  }
  const combined = activeSpotifySession?.customTracks.length
    ? [...activeSpotifySession.customTracks, ...cachedSeedTracks]
    : cachedSeedTracks;

  res.json({
    source: activeSpotifySession ? 'spotify_oauth' : 'curated_stream',
    tracks: combined,
  });
});

app.get('/api/topic-artwork', async (_req, res) => {
  if (!cachedTopicArtwork) {
    const wikiTargets: Array<[string, string]> = [
      ['strip-3', 'Parasite_(2019_film)'],
      ['strip-4', 'Taylor_Swift'],
      ['strip-6', 'The_Dark_Knight'],
      ['strip-7', 'Leonardo_DiCaprio'],
      ['movie-parasite', 'Parasite_(2019_film)'],
      ['movie-titanic', 'Titanic_(1997_film)'],
      ['movie-lion-king', 'The_Lion_King'],
      ['movie-jurassic-park', 'Jurassic_Park_(film)'],
      ['movie-harry-potter-1', 'Harry_Potter_and_the_Philosopher%27s_Stone_(film)'],
      ['movie-dark-knight', 'The_Dark_Knight'],
      ['movie-finding-nemo', 'Finding_Nemo'],
      ['movie-toy-story', 'Toy_Story'],
      ['movie-matrix', 'The_Matrix'],
      ['movie-avatar', 'Avatar_(2009_film)'],
      ['movie-spider-verse', 'Spider-Man:_Into_the_Spider-Verse'],
      ['movie-grand-budapest', 'The_Grand_Budapest_Hotel'],
      ['movie-in-the-mood-for-love', 'In_the_Mood_for_Love'],
      ['movie-inception', 'Inception'],
      ['movie-whiplash', 'Whiplash_(2014_film)'],
      ['celeb-tyler-the-creator', 'Tyler,_the_Creator'],
      ['celeb-taylor-swift', 'Taylor_Swift'],
      ['celeb-michael-jackson', 'Michael_Jackson'],
      ['celeb-leonardo-dicaprio', 'Leonardo_DiCaprio'],
      ['celeb-dwayne-johnson', 'Dwayne_Johnson'],
      ['celeb-beyonce', 'Beyonc%C3%A9'],
      ['celeb-lionel-messi', 'Lionel_Messi'],
      ['celeb-zendaya', 'Zendaya'],
      ['celeb-cristiano-ronaldo', 'Cristiano_Ronaldo'],
      ['celeb-rihanna', 'Rihanna'],
      ['celeb-david-bowie', 'David_Bowie'],
      ['celeb-kendrick-lamar', 'Kendrick_Lamar'],
      ['celeb-hayao-miyazaki', 'Hayao_Miyazaki'],
    ];

    const itunesTargets: Array<[string, string, 'song' | 'movie']> = [
      ['strip-5', 'Billie Jean Michael Jackson Thriller', 'song'],
      ['strip-8', 'Get Lucky Daft Punk Random Access Memories', 'song'],
    ];

    const map: Record<string, string> = {};

    await Promise.all([
      ...wikiTargets.map(async ([id, title]) => {
        const url = await fetchWikiThumbnail(title);
        if (url) {
          map[id] = url;
        }
      }),
      ...itunesTargets.map(async ([id, query, entity]) => {
        const url = await fetchItunesArtwork(query, entity);
        if (url) {
          map[id] = url;
        }
      }),
    ]);

    cachedTopicArtwork = map;
  }

  res.json({ artwork: cachedTopicArtwork });
});

app.get('/api/music/search', async (req, res) => {
  const q = String(req.query.q || '').trim();
  if (!q) {
    res.status(400).json({ error: 'Search query required' });
    return;
  }

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=8`
    );
    if (!response.ok) {
      throw new Error('Upstream audio catalog error');
    }
    const data = (await response.json()) as {
      results?: Array<{
        trackId: number;
        trackName: string;
        artistName: string;
        collectionName: string;
        releaseDate?: string;
        primaryGenreName?: string;
        previewUrl?: string;
        artworkUrl100?: string;
      }>;
    };

    const tracks: SpotifyTrackChallenge[] = (data.results || [])
      .filter((r) => Boolean(r.previewUrl && r.trackName && r.artistName))
      .map((r) => {
        const initials = r.artistName
          .split(' ')
          .slice(0, 3)
          .map((w) => `${w[0]?.toUpperCase() || ''}.`)
          .join(' ');
        const releaseYear = Number(r.releaseDate?.slice(0, 4)) || 2018;
        return {
          id: `live-${r.trackId}`,
          title: r.trackName,
          artist: r.artistName,
          album: r.collectionName || 'Single Release',
          releaseYear,
          genre: r.primaryGenreName || 'Pop / Contemporary',
          artistInitials: initials,
          pinpointClue: `Released on "${r.collectionName || 'Single'}" in ${releaseYear}.`,
          previewUrl: r.previewUrl || null,
          albumArtUrl: r.artworkUrl100 ? r.artworkUrl100.replace('100x100bb', '600x600bb') : null,
          spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(`${r.trackName} ${r.artistName}`)}`,
          synthNotes: [261.63, 329.63, 392.0, 493.88, 392.0, 329.63, 293.66, 261.63],
          bpm: 120,
        };
      });

    res.json({ tracks });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Search failed' });
  }
});

// 2b. Error Flagging & Live Rectification Endpoints
interface ChallengeRectificationRecord {
  id: string;
  challengeId: string;
  category: 'songs' | 'movies' | 'celebrities';
  issueType: 'artwork' | 'audio' | 'clue_hint' | 'answer_typo';
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

const savedRectifications = new Map<string, ChallengeRectificationRecord>();

app.get('/api/rectifications', (_req, res) => {
  res.json({
    rectifications: Array.from(savedRectifications.values()),
  });
});

app.post('/api/rectifications', (req, res) => {
  const body = req.body as Partial<ChallengeRectificationRecord>;
  if (!body.challengeId || !body.category) {
    res.status(400).json({ error: 'challengeId and category are required' });
    return;
  }

  const record: ChallengeRectificationRecord = {
    id: body.id || `rect_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    challengeId: String(body.challengeId).slice(0, 80),
    category: body.category,
    issueType: body.issueType || 'clue_hint',
    notes: String(body.notes || '').slice(0, 300),
    status: body.status || 'rectified',
    createdAt: new Date().toISOString(),
    patch: {
      answer: body.patch?.answer ? String(body.patch.answer).slice(0, 120) : undefined,
      subtitle: body.patch?.subtitle ? String(body.patch.subtitle).slice(0, 160) : undefined,
      year: body.patch?.year ? String(body.patch.year).slice(0, 40) : undefined,
      genre: body.patch?.genre ? String(body.patch.genre).slice(0, 80) : undefined,
      initials: body.patch?.initials ? String(body.patch.initials).slice(0, 30) : undefined,
      pinpoint: body.patch?.pinpoint ? String(body.patch.pinpoint).slice(0, 160) : undefined,
      pinpointClue: body.patch?.pinpointClue
        ? String(body.patch.pinpointClue).slice(0, 400)
        : undefined,
      artworkUrl: body.patch?.artworkUrl ? String(body.patch.artworkUrl).slice(0, 600) : undefined,
      previewUrl:
        body.patch?.previewUrl !== undefined ? body.patch.previewUrl : undefined,
    },
  };

  savedRectifications.set(record.challengeId, record);
  res.json({ rectification: record });
});

app.delete('/api/rectifications/:challengeId', (req, res) => {
  const challengeId = String(req.params.challengeId || '');
  savedRectifications.delete(challengeId);
  res.json({ deleted: true, challengeId });
});

app.post('/api/rectify-lookup', async (req, res) => {
  const { category, query, wikiTitle } = req.body as {
    category?: 'songs' | 'movies' | 'celebrities';
    query?: string;
    wikiTitle?: string;
  };
  const cleanQuery = String(query || '').trim();
  if (!cleanQuery) {
    res.status(400).json({ error: 'Lookup query is required' });
    return;
  }

  try {
    if (category === 'songs') {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(cleanQuery)}&entity=song&limit=3`
      );
      if (response.ok) {
        const data = (await response.json()) as {
          results?: Array<{
            trackName?: string;
            artistName?: string;
            collectionName?: string;
            releaseDate?: string;
            primaryGenreName?: string;
            previewUrl?: string;
            artworkUrl100?: string;
          }>;
        };
        const match = data.results?.find((r) => Boolean(r.previewUrl || r.artworkUrl100));
        if (match) {
          const initials = (match.artistName || '')
            .split(' ')
            .slice(0, 3)
            .map((w) => `${w[0]?.toUpperCase() || ''}.`)
            .join(' ');
          res.json({
            found: true,
            title: match.trackName,
            subtitle: `${match.artistName} — ${match.collectionName || 'Single'}`,
            year: match.releaseDate ? match.releaseDate.slice(0, 4) : undefined,
            genre: match.primaryGenreName,
            initials: initials || undefined,
            artworkUrl: match.artworkUrl100
              ? match.artworkUrl100.replace('100x100bb', '600x600bb')
              : undefined,
            previewUrl: match.previewUrl || null,
          });
          return;
        }
      }
    } else {
      const normalizedWiki =
        wikiTitle || cleanQuery.replace(/\s+/g, '_');
      const wikiImg = await fetchWikiThumbnail(normalizedWiki);
      const itunesImg =
        category === 'movies'
          ? await fetchItunesArtwork(cleanQuery, 'movie')
          : null;

      if (wikiImg || itunesImg) {
        res.json({
          found: true,
          artworkUrl: wikiImg || itunesImg,
        });
        return;
      }
    }

    res.json({ found: false });
  } catch {
    res.json({ found: false });
  }
});

// 3. Server-Authoritative Multiplayer WebSocket Engine
interface LivePlayer {
  id: string;
  name: string;
  score: number;
  streak: number;
}

interface LiveDuelRoom {
  roomCode: string;
  category: 'songs' | 'movies' | 'celebrities';
  roundIndex: number;
  status: 'waiting' | 'active' | 'completed';
  players: LivePlayer[];
  lastEvent: string;
  processedEventIds: string[];
  updatedAt: number;
}

const liveRooms = new Map<string, LiveDuelRoom>();

function seedInitialLobbyRooms() {
  if (liveRooms.size === 0) {
    liveRooms.set('VINYL-88', {
      roomCode: 'VINYL-88',
      category: 'songs',
      roundIndex: 0,
      status: 'waiting',
      players: [{ id: 'host-sade', name: 'M. Lindqvist (Stockholm)', score: 340, streak: 2 }],
      lastEvent: 'Waiting for challenger in Songs ("Good Sound")...',
      processedEventIds: [],
      updatedAt: Date.now(),
    });
    liveRooms.set('NOIR-35', {
      roomCode: 'NOIR-35',
      category: 'movies',
      roundIndex: 1,
      status: 'waiting',
      players: [{ id: 'host-kurosawa', name: 'K. Takahashi (Tokyo)', score: 520, streak: 3 }],
      lastEvent: 'Open Pinpoint Cinema table — 5 rounds.',
      processedEventIds: [],
      updatedAt: Date.now(),
    });
  }
}
seedInitialLobbyRooms();

async function startServer() {
  const httpServer = createServer(app);
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  const broadcastRooms = () => {
    const payload = JSON.stringify({
      type: 'rooms:sync',
      rooms: Array.from(liveRooms.values()),
    });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  };

  wss.on('connection', (ws) => {
    // Initial sync on connect
    ws.send(
      JSON.stringify({
        type: 'rooms:sync',
        rooms: Array.from(liveRooms.values()),
      })
    );

    ws.on('message', (raw) => {
      try {
        const msg = JSON.parse(String(raw)) as {
          type: string;
          eventId?: string;
          roomCode?: string;
          playerId?: string;
          playerName?: string;
          category?: 'songs' | 'movies' | 'celebrities';
          pointsDelta?: number;
          correct?: boolean;
          summary?: string;
        };

        if (msg.type === 'room:create' && msg.roomCode && msg.playerId && msg.playerName) {
          const code = msg.roomCode.toUpperCase().slice(0, 10);
          if (!liveRooms.has(code)) {
            liveRooms.set(code, {
              roomCode: code,
              category: msg.category || 'songs',
              roundIndex: 0,
              status: 'waiting',
              players: [{ id: msg.playerId, name: msg.playerName.slice(0, 40), score: 0, streak: 0 }],
              lastEvent: `${msg.playerName} opened room ${code}`,
              processedEventIds: msg.eventId ? [msg.eventId] : [],
              updatedAt: Date.now(),
            });
            broadcastRooms();
          }
        } else if (msg.type === 'room:join' && msg.roomCode && msg.playerId && msg.playerName) {
          const room = liveRooms.get(msg.roomCode.toUpperCase());
          if (room) {
            if (msg.eventId && room.processedEventIds.includes(msg.eventId)) return;
            if (msg.eventId) room.processedEventIds.push(msg.eventId);

            const exists = room.players.some((p) => p.id === msg.playerId);
            if (!exists && room.players.length < 4) {
              room.players.push({
                id: msg.playerId,
                name: msg.playerName.slice(0, 40),
                score: 0,
                streak: 0,
              });
            }
            room.status = 'active';
            room.lastEvent = `${msg.playerName} joined the duel!`;
            room.updatedAt = Date.now();
            broadcastRooms();
          }
        } else if (msg.type === 'room:guess' && msg.roomCode && msg.playerId) {
          const room = liveRooms.get(msg.roomCode.toUpperCase());
          if (room && room.status !== 'completed') {
            if (msg.eventId && room.processedEventIds.includes(msg.eventId)) return;
            if (msg.eventId) room.processedEventIds.push(msg.eventId);

            const player = room.players.find((p) => p.id === msg.playerId);
            if (player) {
              if (msg.correct) {
                player.score += Math.max(10, Number(msg.pointsDelta) || 100);
                player.streak += 1;
                room.roundIndex += 1;
                if (room.roundIndex >= 5) {
                  room.status = 'completed';
                  room.lastEvent = `${player.name} clinched the final round (${player.score} pts)!`;
                } else {
                  room.lastEvent = msg.summary || `${player.name} solved Round ${room.roundIndex}!`;
                }
              } else {
                player.streak = 0;
                room.lastEvent = msg.summary || `${player.name} missed a deduction attempt.`;
              }
              room.updatedAt = Date.now();
              broadcastRooms();
            }
          }
        }
      } catch (err) {
        console.error('WS message parse error:', err);
      }
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Guess That! server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
