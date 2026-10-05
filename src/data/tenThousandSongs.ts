import vinylSoulImg from '../assets/images/editorial_vinyl_soul_1791208453653.jpg';
import tylerLicenseImg from '../assets/images/tyler_travel_license_cover_1791214639707.jpg';
import currentsSphereImg from '../assets/images/currents_vortex_sphere_cover_1791214651767.jpg';
import electronicDuoImg from '../assets/images/topic_electronic_duo_1791215820870.jpg';
import { ALL_1000_SONGS } from './thousandCatalogue';
import type { ChallengeItem } from './challenges';

export interface ArtistCatalogProfile {
  artist: string;
  genre: string;
  eraStart: number;
  eraEnd: number;
  albums: string[];
  coreTracks: string[];
}

export const ICONIC_ARTIST_DISCOGRAPHIES: ArtistCatalogProfile[] = [
  {
    artist: 'Tyler, The Creator',
    genre: 'Hip-Hop / Neo-Soul',
    eraStart: 2011,
    eraEnd: 2024,
    albums: ['CALL ME IF YOU GET LOST', 'IGOR', 'Flower Boy', 'CHROMAKOPIA', 'Wolf'],
    coreTracks: ['WUSYANAME', 'EARFQUAKE', 'See You Again', 'NEW MAGIC WAND', 'GONE, GONE / THANK YOU', 'SWEET / I THOUGHT YOU WANTED TO DANCE', 'LUMBERJACK', 'CORSO', 'LEMONHEAD', 'HOT WIND BLOWS', '911 / Mr. Lonely', 'Boredom', 'Who Dat Boy', 'ARE WE STILL FRIENDS?', 'I THINK', 'A BOY IS A GUN*', 'Running Out Of Time', 'WHAT’S GOOD', 'PUPPET', 'JUGGERNAUT', 'MASSA', 'RUNITUP', 'MANIFESTO', 'WILSHIRE', 'SAFARI', 'SORRY NOT SORRY', 'DOGTOOTH', 'WHARF TALK', 'STUNTMAN', 'HEAVEN TO ME', ' St. Chroma', 'Rah Tah Tah', 'Noid', 'Darling, I', 'Sticky', 'Like Him', 'Balloon', 'Answer', 'IFHY', 'Tamale', 'She', 'Yonkers', 'SMUCKERS', 'FUCKING YOUNG / PERFECT', '2SEATER', ' Potato Salad'],
  },
  {
    artist: 'Tame Impala',
    genre: 'Psychedelic Pop / Synth-Rock',
    eraStart: 2010,
    eraEnd: 2023,
    albums: ['Currents', 'The Slow Rush', 'Lonerism', 'InnerSpeaker'],
    coreTracks: ['The Less I Know The Better', 'Let It Happen', 'Borderline', 'Feels Like We Only Go Backwards', 'Elephant', 'New Person, Same Old Mistakes', 'Eventually', 'Lost In Yesterday', 'Breathe Deeper', 'Is It True', 'Posthumous Forgiveness', 'One More Year', 'Instant Destiny', 'On Track', 'It Might Be Time', 'Glimmer', 'One More Hour', 'Nangs', 'The Moment', 'Yes I’m Changing', 'Disciples', 'Cause I’m A Man', 'Reality In Motion', 'Love/Paranoia', 'Apocalypse Dreams', 'Mind Mischief', 'Music To Walk Home By', 'Why Won’t They Talk To Me?', 'Keep On Lying', 'Solitude Is Bliss', 'Lucidity', 'Alter Ego', 'Expectation', 'Patience'],
  },
  {
    artist: 'Daft Punk',
    genre: 'French House / Nu-Disco',
    eraStart: 1997,
    eraEnd: 2013,
    albums: ['Random Access Memories', 'Discovery', 'Homework', 'Human After All'],
    coreTracks: ['Get Lucky', 'One More Time', 'Harder, Better, Faster, Stronger', 'Digital Love', 'Around the World', 'Instant Crush', 'Lose Yourself to Dance', 'Giorgio by Moroder', 'Veridis Quo', 'Something About Us', 'Face to Face', 'Aerodynamic', 'Crescendolls', 'Superheroes', 'High Life', 'Voyager', 'Short Circuit', 'Too Long', 'Give Life Back to Music', 'The Game of Love', 'Within', 'Touch', 'Beyond', 'Motherboard', 'Fragments of Time', 'Doin’ It Right', 'Contact', 'Da Funk', 'Revolution 909', 'Phoenix', 'Fresh', 'Burnin’', 'Robot Rock', 'Technologic', 'Human After All', 'Television Rules the Nation'],
  },
  {
    artist: 'Kendrick Lamar',
    genre: 'West Coast Hip-Hop / Conscious Rap',
    eraStart: 2011,
    eraEnd: 2024,
    albums: ['good kid, m.A.A.d city', 'DAMN.', 'To Pimp a Butterfly', 'Mr. Morale & the Big Steppers', 'Section.80'],
    coreTracks: ['HUMBLE.', 'Alright', 'Money Trees', 'DNA.', 'Swimming Pools (Drank)', 'Bitch, Don’t Kill My Vibe', 'm.A.A.d city', 'LOVE.', 'LOYALTY.', 'ELEMENT.', 'PRIDE.', 'LUST.', 'XXX.', 'FEAR.', 'DUCKWORTH.', 'King Kunta', 'Wesley’s Theory', 'i', 'The Blacker the Berry', 'These Walls', 'u', 'How Much a Dollar Cost', 'Hood Politics', 'Mortal Man', 'Poetic Justice', 'Backseat Freestyle', 'Sing About Me, I’m Dying of Thirst', 'Compton', 'N95', 'Die Hard', 'Father Time', 'Rich Spirit', 'Count Me Out', 'Silent Hill', 'Savior', 'The Heart Part 5', 'Not Like Us', 'Euphoria', 'A.D.H.D', 'HiiiPoWeR', 'Rigamortus'],
  },
  {
    artist: 'Frank Ocean',
    genre: 'Alternative R&B / Avant-Soul',
    eraStart: 2011,
    eraEnd: 2020,
    albums: ['Blonde', 'channel ORANGE', 'Nostalgia, Ultra'],
    coreTracks: ['Pink + White', 'Thinking Bout You', 'Nights', 'Self Control', 'Ivy', 'Lost', 'Pyramids', 'Super Rich Kids', 'Novacane', 'Chanel', 'White Ferrari', 'Godspeed', 'Seigfried', 'Solo', 'Skyline To', 'Nikes', 'Good Guy', 'Pretty Sweet', 'Close to You', 'Futura Free', 'Sweet Life', 'Crack Rock', 'Pilot Jones', 'Sierra Leone', 'Bad Religion', 'Pink Matter', 'Forrest Gump', 'Monks', 'Swim Good', 'Strawberry Swing', 'American Wedding', 'Biking', 'Provider', 'Lens', 'Moon River', 'In My Room', 'DHL', 'Cayendo', 'Dear April'],
  },
  {
    artist: 'Michael Jackson',
    genre: 'Pop / R&B / Funk',
    eraStart: 1979,
    eraEnd: 2001,
    albums: ['Thriller', 'Bad', 'Off the Wall', 'Dangerous', 'HIStory'],
    coreTracks: ['Billie Jean', 'Beat It', 'Thriller', 'Smooth Criminal', 'Don’t Stop ’Til You Get Enough', 'Rock with You', 'Man in the Mirror', 'The Way You Make Me Feel', 'Bad', 'Black or White', 'Remember the Time', 'Human Nature', 'Wanna Be Startin’ Somethin’', 'P.Y.T. (Pretty Young Thing)', 'Off the Wall', 'Dirty Diana', 'Smooth Criminal', 'Leave Me Alone', 'Liberian Girl', 'I Just Can’t Stop Loving You', 'Another Part of Me', 'Speed Demon', 'Jam', 'In the Closet', 'Heal the World', 'Will You Be There', 'Who Is It', 'Give In to Me', 'Scream', 'They Don’t Care About Us', 'You Are Not Alone', 'Earth Song', 'Stranger in Moscow', 'You Rock My World', 'Butterflies'],
  },
  {
    artist: 'The Weeknd',
    genre: 'Synth-Pop / Dark R&B',
    eraStart: 2011,
    eraEnd: 2024,
    albums: ['After Hours', 'Starboy', 'Dawn FM', 'Beauty Behind the Madness', 'House of Balloons'],
    coreTracks: ['Blinding Lights', 'Starboy', 'Save Your Tears', 'The Hills', 'Can’t Feel My Face', 'Call Out My Name', 'Die For You', 'I Feel It Coming', 'Heartless', 'After Hours', 'In Your Eyes', 'Out of Time', 'Sacrifice', 'Take My Breath', 'Less Than Zero', 'Is There Someone Else?', 'Gasoline', 'How Do I Make You Love Me?', 'Often', 'Earned It', 'Acquainted', 'In the Night', 'Shameless', 'Tell Your Friends', 'Party Monster', 'Reminder', 'Secrets', 'True Colors', 'Sidewalks', 'Six Feet Under', 'Wicked Games', 'High for This', 'House of Balloons / Glass Table Girls', 'The Morning', 'Crew Love', 'Moth To A Flame', 'Creepin’'],
  },
  {
    artist: 'Taylor Swift',
    genre: 'Pop / Indie Folk / Synth-Pop',
    eraStart: 2008,
    eraEnd: 2024,
    albums: ['1989', 'folklore', 'Midnights', 'Red', 'Lover', 'evermore', 'Reputation'],
    coreTracks: ['Shake It Off', 'Blank Space', 'Style', 'Anti-Hero', 'Cruel Summer', 'All Too Well', 'Cardigan', 'August', 'Exile', 'Love Story', 'You Belong With Me', 'Wildest Dreams', 'Bad Blood', 'Out of the Woods', 'New Romantics', 'Lover', 'The Man', 'The Archer', 'Cornelia Street', 'Daylight', 'Lavender Haze', 'Maroon', 'Snow On The Beach', 'Midnight Rain', 'Bejeweled', 'Karma', 'Mastermind', 'Willow', 'Champagne Problems', 'Gold Rush', 'Tis the Damn Season', 'Delicate', 'Look What You Made Me Do', '...Ready for It?', 'Don’t Blame Me', 'Getaway Car', 'We Are Never Ever Getting Back Together', 'I Knew You Were Trouble', '22', 'Enchanted', 'Back to December', 'Fearless', 'Fortnight'],
  },
  {
    artist: 'Radiohead',
    genre: 'Art Rock / Alternative Rock',
    eraStart: 1993,
    eraEnd: 2016,
    albums: ['OK Computer', 'In Rainbows', 'Kid A', 'The Bends', 'A Moon Shaped Pool'],
    coreTracks: ['Creep', 'Karma Police', 'No Surprises', 'Paranoid Android', 'Everything In Its Right Place', 'Weird Fishes/Arpeggi', 'Nude', 'Jigsaw Falling Into Place', '15 Step', 'Bodysnatchers', 'All I Need', 'Reckoner', 'House of Cards', 'Videotape', 'Fake Plastic Trees', 'High and Dry', 'Just', 'Street Spirit (Fade Out)', 'My Iron Lung', 'Airbag', 'Subterranean Homesick Alien', 'Exit Music (For a Film)', 'Let Down', 'Lucky', 'The Tourist', 'How to Disappear Completely', 'The National Anthem', 'Idioteque', 'Optimistic', 'Motion Picture Soundtrack', 'Pyramid Song', 'There, There', '2 + 2 = 5', 'Burn the Witch', 'Daydreaming', 'True Love Waits'],
  },
  {
    artist: 'Sade',
    genre: 'Sophisti-Pop / Quiet Storm Soul',
    eraStart: 1984,
    eraEnd: 2010,
    albums: ['Diamond Life', 'Love Deluxe', 'Promise', 'Stronger Than Pride'],
    coreTracks: ['Smooth Operator', 'No Ordinary Love', 'By Your Side', 'Kiss of Life', 'The Sweetest Taboo', 'Cherish the Day', 'Is It a Crime', 'Your Love Is King', 'Paradise', 'Nothing Can Come Between Us', 'Hang On to Your Love', 'Frankie’s First Affair', 'When Am I Going to Make a Living', 'Never as Good as the First Time', 'Jezebel', 'Maureen', 'Love Is Stronger Than Pride', 'Turn My Back on You', 'Keep Looking', 'I Couldn’t Love You More', 'Like a Tattoo', 'Feel No Pain', 'Bullet Proof Soul', 'Mermaid', 'King of Sorrow', 'Somebody Already Broke My Heart', 'Lovers Rock', 'Soldier of Love'],
  },
  {
    artist: 'Fleetwood Mac',
    genre: 'Soft Rock / Classic Pop-Rock',
    eraStart: 1975,
    eraEnd: 1987,
    albums: ['Rumours', 'Tango in the Night', 'Fleetwood Mac', 'Tusk'],
    coreTracks: ['Dreams', 'The Chain', 'Go Your Own Way', 'Everywhere', 'Landslide', 'Rhiannon', 'Little Lies', 'Gypsy', 'Don’t Stop', 'Silver Springs', 'Seven Wonders', 'Gold Dust Woman', 'You Make Loving Fun', 'Second Hand News', 'Never Going Back Again', 'Songbird', 'I Don’t Want to Know', 'Oh Daddy', 'Sara', 'Tusk', 'Think About Me', 'Storms', 'Say You Love Me', 'Monday Morning', 'Warm Ways', 'Blue Letter', 'Over My Head', 'Crystal', 'Hold Me', 'Big Love', 'Mystified', 'Caroline'],
  },
  {
    artist: 'Beyoncé',
    genre: 'R&B / Pop / Dance',
    eraStart: 2003,
    eraEnd: 2024,
    albums: ['RENAISSANCE', 'Lemonade', 'Dangerously in Love', 'B’Day', 'BEYONCÉ', 'COWBOY CARTER'],
    coreTracks: ['CUFF IT', 'Crazy in Love', 'Halo', 'Single Ladies (Put a Ring on It)', 'BREAK MY SOUL', 'Formation', 'Love On Top', 'Irreplaceable', 'Drunk in Love', 'Partition', 'ALIEN SUPERSTAR', 'VIRGO’S GROOVE', 'AMERICA HAS A PROBLEM', 'HEATED', 'PURE/HONEY', 'SUMMER RENAISSANCE', 'COZY', 'I’M THAT GIRL', 'CHURCH GIRL', 'PLASTIC OFF THE SOFA', 'ENERGY', 'Hold Up', 'Sorry', 'Don’t Hurt Yourself', '6 Inch', 'Daddy Lessons', 'Freedom', 'All Night', 'Deja Vu', 'Ring the Alarm', 'Beautiful Liar', 'Green Light', 'Upgrade U', 'Baby Boy', 'Naughty Girl', 'Me, Myself and I', 'If I Were a Boy', 'Sweet Dreams', 'XO', 'Flawless', 'TEXAS HOLD ’EM', '16 CARRIAGES', 'II MOST WANTED'],
  },
  {
    artist: 'Kanye West',
    genre: 'Hip-Hop / Maximalist Production',
    eraStart: 2004,
    eraEnd: 2021,
    albums: ['My Beautiful Dark Twisted Fantasy', 'Graduation', 'The College Dropout', 'Late Registration', 'The Life of Pablo', 'Yeezus', '808s & Heartbreak'],
    coreTracks: ['Runaway', 'Stronger', 'Flashing Lights', 'Gold Digger', 'Heartless', 'Bound 2', 'All Falls Down', 'Through the Wire', 'Jesus Walks', 'Touch the Sky', 'POWER', 'All of the Lights', 'Devil in a New Dress', 'Monster', 'Dark Fantasy', 'Gorgeous', 'So Appalled', 'Blame Game', 'Lost in the World', 'Good Morning', 'Champion', 'I Wonder', 'Good Life', 'Can’t Tell Me Nothing', 'Everything I Am', 'Homecoming', 'Heard ’Em Say', 'Diamonds from Sierra Leone', 'Hey Mama', 'We Major', 'Love Lockdown', 'Paranoid', 'Street Lights', 'Black Skinhead', 'New Slaves', 'Blood on the Leaves', 'Hold My Liquor', 'Father Stretch My Hands Pt. 1', 'Ultralight Beam', 'Famous', 'Waves', 'Wolves', 'No More Parties in L.A.', 'Saint Pablo', 'Ghost Town', 'Violent Crimes', 'Hurricane', 'Moon', 'Off the Grid', 'Praise God'],
  },
  {
    artist: 'Rihanna',
    genre: 'Pop / R&B / Dancehall',
    eraStart: 2005,
    eraEnd: 2022,
    albums: ['ANTI', 'Good Girl Gone Bad', 'Loud', 'Unapologetic', 'Talk That Talk'],
    coreTracks: ['Umbrella', 'We Found Love', 'Diamonds', 'Work', 'Love on the Brain', 'Needed Me', 'Only Girl (In the World)', 'Don’t Stop the Music', 'Disturbia', 'Stay', 'Rude Boy', 'S&M', 'What’s My Name?', 'Pon de Replay', 'SOS', 'Unfaithful', 'Take a Bow', 'Shut Up and Drive', 'Hate That I Love You', 'Rehab', 'Russian Roulette', 'Hard', 'California King Bed', 'Man Down', 'Cheers (Drink to That)', 'Where Have You Been', 'Talk That Talk', 'You Da One', 'Birthday Cake', 'Pour It Up', 'Loveeeeeee Song', 'What Now', 'Kiss It Better', 'Consideration', 'Desperado', 'Woo', 'Sex with Me', 'Higher', 'Bitch Better Have My Money', 'FourFiveSeconds', 'Lift Me Up'],
  },
  {
    artist: 'Billie Eilish',
    genre: 'Alt-Pop / Bedroom Electro',
    eraStart: 2017,
    eraEnd: 2024,
    albums: ['WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?', 'Happier Than Ever', 'HIT ME HARD AND SOFT', 'dont smile at me'],
    coreTracks: ['bad guy', 'BIRDS OF A FEATHER', 'Happier Than Ever', 'lovely', 'ocean eyes', 'Everything I Wanted', 'when the party’s over', 'bury a friend', 'you should see me in a crown', 'wish you were gay', 'all the good girls go to hell', 'xanny', 'my strange addiction', 'ilomilo', 'listen before i go', 'i love you', 'goodbye', 'bellyache', 'idontwannabeyouanymore', 'watch', 'COPYCAT', 'hostage', 'Getting Older', 'I Didn’t Change My Number', 'Billie Bossa Nova', 'my future', 'Oxytocin', 'GOLDWING', 'Lost Cause', 'Halley’s Comet', 'Therefore I Am', 'Your Power', 'NDA', 'Male Fantasy', 'What Was I Made For?', 'LUNCH', 'CHIHIRO', 'WILDFLOWER', 'THE GREATEST', 'L’AMOUR DE MA VIE', 'BLUE'],
  },
  {
    artist: 'SZA',
    genre: 'Contemporary R&B / Neo-Soul',
    eraStart: 2014,
    eraEnd: 2024,
    albums: ['SOS', 'Ctrl', 'Z'],
    coreTracks: ['Kill Bill', 'Snooze', 'Good Days', 'Love Galore', 'The Weekend', 'Broken Clocks', 'Supermodel', 'Drew Barrymore', 'Garden (Say It Like Dat)', 'Normal Girl', 'Prom', 'Go Gina', 'Anything', 'Wavy (Interlude)', 'Pretty Little Birds', '20 Something', 'Doves in the Wind', 'I Hate U', 'Shirt', 'Blind', 'Seek & Destroy', 'Low', 'Love Language', 'Used', 'Ghost in the Machine', 'F2F', 'Nobody Gets Me', 'Smoking on My Ex Pack', 'Gone Girl', 'SOS', 'Special', 'Too Late', 'Far', 'Open Arms', 'Forgiveless', 'Saturn', 'Babylon', 'Child’s Play', 'Julia'],
  },
  {
    artist: 'Arctic Monkeys',
    genre: 'Indie Rock / Garage Revival',
    eraStart: 2006,
    eraEnd: 2022,
    albums: ['AM', 'Whatever People Say I Am, That’s What I’m Not', 'Favourite Worst Nightmare', 'Humbug', 'Tranquility Base Hotel & Casino', 'The Car'],
    coreTracks: ['Do I Wanna Know?', '505', 'R U Mine?', 'Why’d You Only Call Me When You’re High?', 'I Wanna Be Yours', 'Arabella', 'Fluorescent Adolescent', 'I Bet You Look Good on the Dancefloor', 'Snap Out of It', 'Knee Socks', 'No. 1 Party Anthem', 'One for the Road', 'Fireside', 'Mad Sounds', 'Mardy Bum', 'When the Sun Goes Down', 'A Certain Romance', 'The View from the Afternoon', 'Fake Tales of San Francisco', 'Dancing Shoes', 'From the Ritz to the Rubble', 'Brianstorm', 'Teddy Picker', 'D Is for Dangerous', 'Balaclava', 'Old Yellow Bricks', 'Crying Lightning', 'Cornerstone', 'Pretty Visitors', 'My Propeller', 'Don’t Sit Down ’Cause I’ve Moved Your Chair', 'Suck It and See', 'Black Treacle', 'Four Out of Five', 'Star Treatment', 'There’d Better Be a Mirrorball', 'Body Paint'],
  },
  {
    artist: 'Nirvana',
    genre: 'Grunge / Alternative Rock',
    eraStart: 1989,
    eraEnd: 1994,
    albums: ['Nevermind', 'In Utero', 'MTV Unplugged in New York', 'Bleach'],
    coreTracks: ['Smells Like Teen Spirit', 'Come as You Are', 'Heart-Shaped Box', 'Lithium', 'In Bloom', 'Something in the Way', 'All Apologies', 'About a Girl', 'Drain You', 'Polly', 'Breed', 'Territorial Pissings', 'Lounge Act', 'Stay Away', 'On a Plain', 'Rape Me', 'Dumb', 'Pennyroyal Tea', 'Serve the Servants', 'Scentless Apprentice', 'Frances Farmer Will Have Her Revenge on Seattle', 'Very Ape', 'Milk It', 'Radio Friendly Unit Shifter', 'Tourette’s', 'The Man Who Sold the World', 'Where Did You Sleep Last Night', 'Lake of Fire', 'Plateau', 'Oh, Me', 'Jesus Doesn’t Want Me for a Sunbeam', 'Blew', 'School', 'Love Buzz', 'Negative Creep', 'Sliver', 'Aneurysm', 'You Know You’re Right'],
  },
  {
    artist: 'Queen',
    genre: 'Arena Rock / Glam Rock',
    eraStart: 1973,
    eraEnd: 1991,
    albums: ['A Night at the Opera', 'News of the World', 'The Game', 'Jazz', 'Sheer Heart Attack', 'Innuendo'],
    coreTracks: ['Bohemian Rhapsody', 'Don’t Stop Me Now', 'Another One Bites the Dust', 'Somebody to Love', 'We Will Rock You', 'We Are the Champions', 'Under Pressure', 'Crazy Little Thing Called Love', 'Killer Queen', 'Radio Ga Ga', 'I Want to Break Free', 'Fat Bottomed Girls', 'Bicycle Race', 'You’re My Best Friend', 'Love of My Life', 'Hammer to Fall', 'A Kind of Magic', 'Who Wants to Live Forever', 'One Vision', 'Friends Will Be Friends', 'I Want It All', 'The Miracle', 'Breakthru', 'The Invisible Man', 'Innuendo', 'The Show Must Go On', 'These Are the Days of Our Lives', 'Headlong', 'Seven Seas of Rhye', 'Now I’m Here', 'Stone Cold Crazy', 'Tie Your Mother Down', 'Good Old-Fashioned Lover Boy', 'Save Me', 'Play the Game', 'Flash'],
  },
  {
    artist: 'The Beatles',
    genre: '60s Rock / Psychedelic Pop',
    eraStart: 1963,
    eraEnd: 1970,
    albums: ['Abbey Road', 'Sgt. Pepper’s Lonely Hearts Club Band', 'Revolver', 'The Beatles (White Album)', 'Rubber Soul', 'Help!'],
    coreTracks: ['Here Comes the Sun', 'Hey Jude', 'Let It Be', 'Come Together', 'Yesterday', 'Something', 'Twist and Shout', 'In My Life', 'Blackbird', 'While My Guitar Gently Weeps', 'Eleanor Rigby', 'A Day in the Life', 'Strawberry Fields Forever', 'Penny Lane', 'Help!', 'I Want to Hold Your Hand', 'She Loves You', 'A Hard Day’s Night', 'Can’t Buy Me Love', 'Eight Days a Week', 'Ticket to Ride', 'Norwegian Wood', 'Michelle', 'Nowhere Man', 'Drive My Car', 'Girl', 'Taxman', 'Here, There and Everywhere', 'Yellow Submarine', 'Good Day Sunshine', 'Tomorrow Never Knows', 'With a Little Help from My Friends', 'Lucy in the Sky with Diamonds', 'All You Need Is Love', 'Hello, Goodbye', 'The Fool on the Hill', 'I Am the Walrus', 'Back in the U.S.S.R.', 'Dear Prudence', 'Ob-La-Di, Ob-La-Da', 'Helter Skelter', 'Revolution', 'Get Back', 'Don’t Let Me Down', 'Across the Universe', 'Golden Slumbers'],
  },
  {
    artist: 'Prince',
    genre: 'Minneapolis Funk / Pop / Rock',
    eraStart: 1978,
    eraEnd: 2015,
    albums: ['Purple Rain', '1999', 'Sign o’ the Times', 'Parade', 'Dirty Mind', 'Controversy'],
    coreTracks: ['Purple Rain', 'When Doves Cry', 'Kiss', '1999', 'Little Red Corvette', 'Let’s Go Crazy', 'Raspberry Beret', 'I Would Die 4 U', 'Sign o’ the Times', 'Cream', 'Diamonds and Pearls', 'Gett Off', 'U Got the Look', 'If I Was Your Girlfriend', 'Adore', 'Starfish and Coffee', 'Housequake', 'The Beautiful Ones', 'Computer Blue', 'Darling Nikki', 'Take Me with U', 'Baby I’m a Star', 'Delirious', 'DMSR', 'Lady Cab Driver', 'Controversy', 'Sexuality', 'Do Me, Baby', 'Dirty Mind', 'Uptown', 'Head', 'I Wanna Be Your Lover', 'I Feel for You', 'Why You Wanna Treat Me So Bad?', 'Soft and Wet', 'Pop Life', 'Paisley Park', 'Mountains', 'Girls & Boys', 'Sometimes It Snows in April', 'Erotic City', 'Nothing Compares 2 U', '7', 'The Most Beautiful Girl in the World', 'Musicology'],
  },
  {
    artist: 'David Bowie',
    genre: 'Art Rock / Glam Rock / Synth',
    eraStart: 1969,
    eraEnd: 2016,
    albums: ['The Rise and Fall of Ziggy Stardust', 'Heroes', 'Low', 'Let’s Dance', 'Hunky Dory', 'Station to Station', 'Blackstar'],
    coreTracks: ['Heroes', 'Starman', 'Space Oddity', 'Life on Mars?', 'Let’s Dance', 'Rebel Rebel', 'Changes', 'Modern Love', 'China Girl', 'Under Pressure', 'Ziggy Stardust', 'Suffragette City', 'Moonage Daydream', 'Five Years', 'Rock ’n’ Roll Suicide', 'Lady Stardust', 'Soul Love', 'Oh! You Pretty Things', 'Queen Bitch', 'The Man Who Sold the World', 'Jean Genie', 'Aladdin Sane', 'Drive-In Saturday', 'Diamond Dogs', 'Young Americans', 'Fame', 'Golden Years', 'Station to Station', 'TVC 15', 'Wild Is the Wind', 'Sound and Vision', 'Be My Wife', 'Always Crashing in the Same Car', 'Warszawa', 'Beauty and the Beast', 'Boys Keep Swinging', 'DJ', 'Ashes to Ashes', 'Fashion', 'Blue Jean', 'Absolute Beginners', 'Lazarus', 'Blackstar'],
  },
  {
    artist: 'OutKast',
    genre: 'Southern Hip-Hop / Funk',
    eraStart: 1994,
    eraEnd: 2006,
    albums: ['Stankonia', 'Speakerboxxx/The Love Below', 'Aquemini', 'ATLiens', 'Southernplayalisticadillacmuzik'],
    coreTracks: ['Ms. Jackson', 'Hey Ya!', 'Roses', 'So Fresh, So Clean', 'B.O.B. (Bombs Over Baghdad)', 'The Way You Move', 'Rosa Parks', 'ATLiens', 'Elevators (Me & You)', 'SpottieOttieDopaliscious', 'Da Art of Storytellin’ (Pt. 1)', 'Aquemini', 'Skew It on the Bar-B', 'Return of the “G”', 'Synthesizer', 'Slump', 'West Savannah', 'Liberation', 'Jazzy Belle', 'Two Dope Boyz (In a Cadillac)', 'Wheelz of Steel', 'Babylon', ' Southernplayalisticadillacmuzik', 'Player’s Ball', 'Git Up, Git Out', 'Crumblin’ Erb', 'Hootie Hoo', 'Gasoline Dreams', 'Humble Mumble', 'Snappin’ & Trappin’', 'We Luv Deez Hoez', 'Red Velvet', 'Gangsta Shit', 'Toilet Tisha', 'Slum Beautiful', 'Stankonia (Stanklove)', 'GhettoMusick', 'Unhappy', 'Bowtie', 'Prototype', 'She Lives in My Lap', 'Spread', 'Idlewild Blue', 'Morris Brown', 'Mighty “O”', 'International Players Anthem'],
  },
  {
    artist: 'Drake',
    genre: 'Hip-Hop / R&B / Pop-Rap',
    eraStart: 2009,
    eraEnd: 2024,
    albums: ['Take Care', 'Nothing Was the Same', 'Views', 'If You’re Reading This It’s Too Late', 'Scorpion', 'Certified Lover Boy', 'Her Loss'],
    coreTracks: ['One Dance', 'God’s Plan', 'Hotline Bling', 'Passionfruit', 'Hold On, We’re Going Home', 'Marvins Room', 'Headlines', 'Take Care', 'Nice For What', 'In My Feelings', 'Nonstop', 'Started From the Bottom', 'Worst Behavior', 'Tuscan Leather', 'Furthest Thing', 'Own It', 'From Time', 'Pound Cake / Paris Morton Music 2', 'Too Much', 'Crew Love', 'Shot for Me', 'Under Ground Kings', 'We’ll Be Fine', 'Make Me Proud', 'Lord Knows', 'Cameras / Good Ones Go', 'HYFR', 'The Motto', 'Over My Dead Body', 'Controlla', 'Too Good', 'Feel No Ways', 'Hype', 'Weston Road Flows', 'Redemption', 'With You', 'Childs Play', 'Pop Style', 'Energy', 'Legend', '10 Bands', 'Know Yourself', 'No Tellin’', 'Madonna', '6 God', 'Jungle', 'Best I Ever Had', 'Forever', 'Find Your Love', 'Over', 'Teenage Fever', 'Fake Love', 'Jimmy Cooks', 'Rich Flex', 'Laugh Now Cry Later', 'Wants and Needs', 'Knife Talk', 'Fair Trade', 'Way 2 Sexy', 'Champagne Poetry', 'First Person Shooter'],
  },
  {
    artist: 'Dua Lipa',
    genre: 'Nu-Disco / Dance-Pop',
    eraStart: 2017,
    eraEnd: 2024,
    albums: ['Future Nostalgia', 'Radical Optimism', 'Dua Lipa'],
    coreTracks: ['Levitating', 'Don’t Start Now', 'Physical', 'Break My Heart', 'New Rules', 'One Kiss', 'Cold Heart', 'Dance the Night', 'Houdini', 'Training Season', 'Illusion', 'IDGAF', 'Be the One', 'Electricity', 'Scared to Be Lonely', 'Love Again', 'Hallucinate', 'Cool', 'Pretty Please', 'Future Nostalgia', 'Good in Bed', 'Boys Will Be Boys', 'Fever', 'We’re Good', 'If It Ain’t Me', 'That Kind of Woman', 'Not My Problem', 'Prisoner', 'Sweetest Pie', 'Potion', 'Blow Your Mind (Mwah)', 'Hotter than Hell', 'Lost in Your Light', 'Homesick', 'Genesis', 'Thinking ’Bout You', 'End of an Era', 'These Walls', 'Whatcha Doing', 'French Exit', 'Falling Forever', 'Anything for Love', 'Maria', 'Happy for You'],
  },
  {
    artist: 'Bruno Mars',
    genre: 'Funk-Pop / R&B / Soul',
    eraStart: 2010,
    eraEnd: 2024,
    albums: ['24K Magic', 'Unorthodox Jukebox', 'Doo-Wops & Hooligans', 'An Evening with Silk Sonic'],
    coreTracks: ['Uptown Funk', 'Locked Out of Heaven', 'That’s What I Like', 'Leave The Door Open', 'Just the Way You Are', 'When I Was Your Man', '24K Magic', 'Treasure', 'Grenade', 'Versace on the Floor', 'Finesse', 'Chunky', 'Perm', 'Calling All My Lovelies', 'Straight Up & Down', 'Too Good to Say Goodbye', 'Smokin Out The Window', 'Skate', 'After Last Night', 'Put On a Smile', 'Fly As Me', '777', 'Blast Off', 'Young Girls', 'Gorilla', 'Moonshine', 'Natalie', 'Show Me', 'Money Make Her Smile', 'If I Knew', 'Marry You', 'The Lazy Song', 'Talking to the Moon', 'Count On Me', 'Runaway Baby', 'Liquor Store Blues', 'It Will Rain', 'Nothin’ on You', 'Billionaire', 'Die With A Smile', 'APT.'],
  },
  {
    artist: 'Adele',
    genre: 'Blue-Eyed Soul / Pop Balladry',
    eraStart: 2008,
    eraEnd: 2022,
    albums: ['21', '25', '30', '19'],
    coreTracks: ['Rolling in the Deep', 'Someone Like You', 'Hello', 'Set Fire to the Rain', 'Easy On Me', 'Skyfall', 'When We Were Young', 'Send My Love (To Your New Lover)', 'Rumour Has It', 'Turning Tables', 'Don’t You Remember', 'One and Only', 'Take It All', 'I’ll Be Waiting', 'He Won’t Go', 'Lovesong', 'Chasing Pavements', 'Make You Feel My Love', 'Hometown Glory', 'Cold Shoulder', 'Daydreamer', 'Best for Last', 'Crazy for You', 'Melt My Heart to Stone', 'Water Under the Bridge', 'River Lea', 'Love in the Dark', 'Million Years Ago', 'Remedy', 'I Miss You', 'All I Ask', 'Sweetest Devotion', 'Oh My God', 'I Drink Wine', 'To Be Loved', 'Hold On', 'Can I Get It', 'Woman Like Me', 'Love Is a Game', 'Strangers By Nature', 'My Little Love', 'Cry Your Heart Out'],
  },
  {
    artist: 'Ed Sheeran',
    genre: 'Acoustic Pop / Folk-Pop',
    eraStart: 2011,
    eraEnd: 2023,
    albums: ['÷ (Divide)', 'x (Multiply)', '+ (Plus)', '= (Equals)', '- (Subtract)'],
    coreTracks: ['Shape of You', 'Perfect', 'Thinking Out Loud', 'Bad Habits', 'Photograph', 'Castle on the Hill', 'Shivers', 'Galway Girl', 'The A Team', 'Lego House', 'Give Me Love', 'I See Fire', 'Sing', 'Don’t', 'Tenerife Sea', 'Bloodstream', 'One', 'I’m a Mess', 'Nina', 'Runaway', 'Happier', 'Dive', 'Supermarket Flowers', 'What Do I Know?', 'Barcelona', 'Bibia Be Ye Ye', 'Nancy Mulligan', 'Save Myself', 'Eraser', 'Hearts Don’t Break Around Here', 'New Man', 'I Don’t Care', 'Beautiful People', 'South of the Border', 'Antisocial', 'Cross Me', 'Take Me Back to London', 'Afterglow', 'Visiting Hours', 'Overpass Graffiti', 'The Joker and the Queen', 'First Times', '2step', 'Eyes Closed', 'Boat', 'Curtains'],
  },
  {
    artist: 'The Strokes',
    genre: 'Indie Rock / Garage Rock Revival',
    eraStart: 2001,
    eraEnd: 2020,
    albums: ['Is This It', 'Room on Fire', 'The New Abnormal', 'First Impressions of Earth', 'Angles'],
    coreTracks: ['Last Nite', 'Reptilia', 'Someday', 'The Adults Are Talking', 'Hard to Explain', 'Ode to the Mets', 'You Only Live Once', '12:51', 'Under Cover of Darkness', 'Brooklyn Bridge to Chorus', 'Selfless', 'Bad Decisions', 'At the Door', 'Why Are Sundays So Depressing', 'Not the Same Anymore', 'Eternal Summer', 'Is This It', 'The Modern Age', 'Soma', 'Barely Legal', 'Alone, Together', 'New York City Cops', 'Trying Your Luck', 'Take It or Leave It', 'What Ever Happened?', 'Automatic Stop', 'Between Love & Hate', 'Meet Me in the Bathroom', 'Under Control', 'The Way It Is', 'The End Has No End', 'I Can’t Win', 'Juicebox', 'Heart in a Cage', 'Razorblade', 'Ize of the World', 'Machu Picchu', 'Taken for a Fool', 'Call It Fate, Call It Karma', 'One Way Trigger'],
  },
  {
    artist: 'Gorillaz',
    genre: 'Alternative / Trip-Hop / Electropop',
    eraStart: 2001,
    eraEnd: 2023,
    albums: ['Demon Days', 'Plastic Beach', 'Gorillaz', 'Song Machine', 'Cracker Island'],
    coreTracks: ['Feel Good Inc.', 'Clint Eastwood', 'On Melancholy Hill', 'DARE', 'Dirty Harry', '19-2000', 'Rhinestone Eyes', 'Empire Ants', 'Kids with Guns', 'El Mañana', 'O Green World', 'Every Planet We Reach Is Dead', 'November Has Come', 'All Alone', 'White Light', 'Fire Coming Out of the Monkey’s Head', 'Don’t Get Lost in Heaven', 'Demon Days', 'Stylo', 'Superfast Jellyfish', 'Some Kind of Nature', 'Broken', 'Plastic Beach', 'To Binge', 'Up on Melancholy Hill', 'Tomorrow Comes Today', 'Rock the House', '5/4', 'Re-Hash', 'New Genius (Brother)', 'Man Research (Clapper)', 'Sound Check (Gravity)', 'Latin Simone', 'Humility', 'Tranz', 'Andromeda', 'Saturnz Barz', 'She’s My Collar', 'Desolé', 'Momentary Bliss', 'Pac-Man', 'Aries', 'Cracker Island', 'New Gold', 'Silent Running', 'Oil', 'Tormenta'],
  },
];

// Additional 200+ Iconic Artists with Genre, Era, Signature Albums & Core Singles
const COMPACT_ARTIST_ROSTER: Array<
  [string, string, number, number, string[], string[]]
> = [
  ['Lana Del Rey', 'Baroque Pop / Dream Pop', 2012, 2023, ['Born to Die', 'Norman Fucking Rockwell!', 'Ultraviolence', 'Honeymoon'], ['Summertime Sadness', 'Video Games', 'Young and Beautiful', 'Born to Die', 'West Coast', 'Brooklyn Baby', 'Venice Bitch', 'Mariners Apartment Complex', 'Doin’ Time', 'Cinnamon Girl', 'Say Yes to Heaven', 'A&W', 'Blue Jeans', 'National Anthem', 'Ride', 'Shades of Cool']],
  ['Amy Winehouse', 'Neo-Soul / R&B / Jazz', 2003, 2011, ['Back to Black', 'Frank'], ['Back to Black', 'Rehab', 'Valerie', 'Tears Dry on Their Own', 'You Know I’m No Good', 'Love Is a Losing Game', 'Me & Mr Jones', 'Just Friends', 'Stronger Than Me', 'Take the Box', 'In My Bed', 'Fuck Me Pumps']],
  ['Stevie Wonder', 'Motown Soul / Funk / R&B', 1970, 1985, ['Songs in the Key of Life', 'Innervisions', 'Talking Book', 'Fulfillingness’ First Finale'], ['Superstition', 'Sir Duke', 'Isn’t She Lovely', 'Signed, Sealed, Delivered I’m Yours', 'I Wish', 'Higher Ground', 'Living for the City', 'You Are the Sunshine of My Life', 'As', 'Another Star', 'Master Blaster (Jammin’)', 'I Just Called to Say I Love You', 'Overjoyed', 'Part-Time Lover', 'Golden Lady', 'Do I Do']],
  ['Marvin Gaye', 'Soul / Quiet Storm / Motown', 1967, 1982, ['What’s Going On', 'Let’s Get It On', 'I Want You', 'Here, My Dear'], ['What’s Going On', 'Let’s Get It On', 'Sexual Healing', 'Ain’t No Mountain High Enough', 'I Heard It Through the Grapevine', 'Mercy Mercy Me (The Ecology)', 'Inner City Blues', 'Got to Give It Up', 'I Want You', 'Trouble Man', 'Distant Lover', 'You’re All I Need to Get By']],
  ['Lauryn Hill', 'Neo-Soul / Conscious Hip-Hop', 1996, 2002, ['The Miseducation of Lauryn Hill', 'The Score'], ['Doo Wop (That Thing)', 'Ex-Factor', 'Everything Is Everything', 'To Zion', 'Killing Me Softly', 'Ready or Not', 'Fu-Gee-La', 'Nothing Even Matters', 'Can’t Take My Eyes Off of You', 'Lost Ones', 'When It Hurts So Bad', 'Final Hour']],
  ['Erykah Badu', 'Neo-Soul / Jazz-Fusion', 1997, 2015, ['Baduizm', 'Mama’s Gun', 'New Amerykah Part One'], ['On & On', 'Bag Lady', 'Didn’t Cha Know', 'Tyrone', 'Next Lifetime', 'Window Seat', 'Orange Moon', 'Green Eyes', 'Cleva', 'Appletree', 'Other Side of the Game', 'Love of My Life', 'Honey', 'Phone Down']],
  ['A Tribe Called Quest', 'Jazz Rap / East Coast Hip-Hop', 1990, 2016, ['The Low End Theory', 'Midnight Marauders', 'People’s Instinctive Travels', 'We Got It from Here'], ['Can I Kick It?', 'Electric Relaxation', 'Check the Rhime', 'Award Tour', 'Scenario', 'Bonita Applebum', 'I Left My Wallet in El Segundo', 'Jazz (We’ve Got)', 'Buggin’ Out', 'Excursions', 'Oh My God', 'Find a Way', 'We the People....']],
  ['Nas', 'East Coast Hip-Hop / Boom-Bap', 1994, 2023, ['Illmatic', 'It Was Written', 'Stillmatic', 'King’s Disease'], ['N.Y. State of Mind', 'If I Ruled the World (Imagine That)', 'The World Is Yours', 'It Ain’t Hard to Tell', 'Life’s a Bitch', 'One Love', 'Memory Lane (Sittin’ in da Park)', 'Halftime', 'Represent', 'The Message', 'One Mic', 'Made You Look', 'I Can', 'Hate Me Now', 'Ether']],
  ['MF DOOM', 'Underground Hip-Hop / Abstract Rap', 1999, 2009, ['Madvillainy', 'MM..FOOD', 'Operation: Doomsday', 'Born Like This'], ['Rapp Snitch Knishes', 'All Caps', 'Doomsday', 'One Beer', 'Accordion', 'Rhymes Like Dimes', 'Meat Grinder', 'Raid', 'Figaro', 'Curls', 'Fancy Clown', 'Hoe Cakes', 'Beef Rap', 'Potholderz', 'Gazillion Ear', 'That’s That']],
  ['Wu-Tang Clan', 'Hardcore East Coast Hip-Hop', 1993, 2001, ['Enter the Wu-Tang (36 Chambers)', 'Wu-Tang Forever', 'The W'], ['C.R.E.A.M.', 'Protect Ya Neck', 'Triumph', 'Bring da Ruckus', 'Da Mystery of Chessboxin’', 'Wu-Tang Clan Ain’t Nuthing ta F’ Wit', 'Method Man', 'Shame on a Nigga', 'Can It Be All So Simple', 'Tearz', '7th Chamber', 'Gravel Pit']],
  ['Jay-Z', 'East Coast Hip-Hop / Mogul Rap', 1996, 2017, ['The Blueprint', 'The Black Album', 'Reasonable Doubt', '4:44', 'Watch the Throne'], ['Empire State of Mind', '99 Problems', 'Ni**as in Paris', 'Hard Knock Life (Ghetto Anthem)', 'Izzo (H.O.V.A.)', 'Dirt Off Your Shoulder', 'Public Service Announcement', 'Encore', 'Run This Town', 'Big Pimpin’', 'Song Cry', 'Heart of the City (Ain’t No Love)', 'Dead Presidents II', 'The Story of O.J.', '4:44', 'Otis']],
  ['Eminem', 'Midwest Hip-Hop / Lyrical Rap', 1999, 2024, ['The Marshall Mathers LP', 'The Eminem Show', 'The Slim Shady LP', 'Recovery'], ['Lose Yourself', 'Without Me', 'Stan', 'The Real Slim Shady', 'Till I Collapse', 'Sing for the Moment', 'Mockingbird', 'Superman', 'Cleanin’ Out My Closet', 'My Name Is', 'The Way I Am', 'Love the Way You Lie', 'Not Afraid', 'Rap God', 'Godzilla', 'Houdini']],
  ['J. Cole', 'Conscious Hip-Hop / Southern Rap', 2011, 2024, ['2014 Forest Hills Drive', 'Born Sinner', '4 Your Eyez Only', 'KOD', 'The Off-Season'], ['No Role Modelz', 'Middle Child', 'Work Out', 'Wet Dreamz', 'Power Trip', 'Love Yourz', 'Apparently', 'G.O.M.D.', 'A Tale of 2 Citiez', 'Fire Squad', 'January 28th', 'She Knows', 'Crooked Smile', 'Neighbors', '4 Your Eyez Only', 'KOD', 'my . life', 'p r i d e . i s . t h e . d e v i l']],
  ['Travis Scott', 'Psychedelic Trap / Hip-Hop', 2015, 2023, ['ASTROWORLD', 'Rodeo', 'Birds in the Trap Sing McKnight', 'UTOPIA'], ['SICKO MODE', 'goosebumps', 'FE!N', 'HIGHEST IN THE ROOM', 'BUTTERFLY EFFECT', 'Antidote', '90210', 'Stargazing', 'YOSEMITE', 'CAN’T SAY', 'NO BYSTANDERS', 'WAKE UP', 'pick up the phone', 'beibs in the trap', 'MY EYES', 'I KNOW ?', 'TELEKINESIS', 'MELTDOWN', 'Nightcrawler']],
  ['Playboi Carti', 'Rage Trap / Experimental Hip-Hop', 2017, 2024, ['Die Lit', 'Whole Lotta Red', 'Playboi Carti'], ['Magnolia', 'Shoota', 'Sky', 'wokeuplikethis*', 'Long Time (Intro)', 'R.I.P.', 'Fell In Luv', 'Location', 'ILoveUIHateU', 'Stop Breathing', 'Vamp Anthem', 'New Tank', 'Slay3r', 'FlatBed Freestyle', 'Foreign', 'Cancun']],
  ['A$AP Rocky', 'Cloud Rap / Harlem Hip-Hop', 2011, 2023, ['LIVE.LOVE.A$AP', 'LONG.LIVE.A$AP', 'AT.LONG.LAST.A$AP', 'TESTING'], ['Praise The Lord (Da Shine)', 'Sundress', 'F**kin’ Problems', 'L$D', 'Everyday', 'Peso', 'Fashion Killa', 'Goldie', 'Wild for the Night', '1Train', 'LPFJ2', 'Excuse Me', 'Jukebox Joints', 'Canal St.', 'A$AP Forever', 'Babushka Boi']],
  ['Childish Gambino', 'Psychedelic Funk / Hip-Hop / R&B', 2011, 2024, ['“Awaken, My Love!”', 'Because the Internet', 'Camp', 'Bando Stone'], ['Redbone', '3005', 'This Is America', 'Sweatpants', 'Sober', 'Me and Your Mama', 'Heartbeat', 'Bonfire', 'Les', 'Telegraph Ave.', 'The Worst Guys', 'Shadows', 'Summertime Magic', 'Feels Like Summer', 'Baby Boy', 'Terrified', 'Lithonia']],
  ['Mac Miller', 'Alternative Hip-Hop / Jazz-Rap', 2010, 2020, ['Swimming', 'Circles', 'The Divine Feminine', 'GO:OD AM', 'K.I.D.S.'], ['Self Care', 'The Spins', 'Good News', 'Blue World', 'Congratulations', 'Dang!', 'Weekend', 'Small Worlds', 'Ladders', 'What’s the Use?', '2009', 'Come Back to Earth', 'Hurt Feelings', 'Jet Fuel', 'Dunno', 'My Favorite Part', 'Cinderella', 'Knock Knock', 'Nikes on My Feet', 'Best Day Ever']],
  ['Olivia Rodrigo', 'Pop-Punk / Alt-Pop Balladry', 2021, 2024, ['SOUR', 'GUTS'], ['drivers license', 'good 4 u', 'vampire', 'deja vu', 'traitor', 'bad idea right?', 'get him back!', 'brutal', 'happier', 'jealousy, jealousy', 'favorite crime', 'enough for you', '1 step forward, 3 steps back', 'all-american bitch', 'lacy', 'making the bed', 'logical', 'love is embarrassing', 'the grudge', 'obsessed']],
  ['Sabrina Carpenter', 'Pop / Disco-Pop', 2018, 2024, ['Short n’ Sweet', 'emails i can’t send'], ['Espresso', 'Please Please Please', 'Feather', 'Nonsense', 'Taste', 'Bed Chem', 'Good Graces', 'Juno', 'Sharpest Tool', 'Coincidence', 'Dumb & Poetic', 'Slim Pickins', 'Because I Liked a Boy', 'Read your Mind', 'Tornado Warnings', 'Vicious', 'Fast Times', 'Sue Me']],
  ['Charli XCX', 'Hyperpop / Club Pop', 2013, 2024, ['BRAT', 'Crash', 'how i’m feeling now', 'Charli', 'Pop 2'], ['360', 'Von dutch', 'Apple', 'Guess', ' Girl, so confusing', '365', 'Sympathy is a knife', 'Talk talk', 'Club classics', 'Mean girls', 'I Love It', 'Boom Clap', 'Fancy', 'Boys', 'Vroom Vroom', '1999', 'Gone', 'forever', 'claws', 'party 4 u', 'Track 10', 'Unlock It', 'Speed Drive']],
  ['Chappell Roan', 'Synth-Pop / Camp Pop', 2020, 2024, ['The Rise and Fall of a Midwest Princess'], ['Good Luck, Babe!', 'HOT TO GO!', 'Pink Pony Club', 'Red Wine Supernova', 'Casual', 'Femininomenon', 'My Kink Is Karma', 'After Midnight', 'Naked in Manhattan', 'Super Graphic Ultra Modern Girl', 'Coffee', 'California', 'Picture You', 'Kaleidoscope', 'Guilty Pleasure']],
  ['Lorde', 'Art Pop / Minimalist Electropop', 2013, 2021, ['Pure Heroine', 'Melodrama', 'Solar Power'], ['Royals', 'Ribs', 'Team', 'Green Light', 'Supercut', 'Liability', 'Perfect Places', 'Homemade Dynamite', 'The Louvre', 'Hard Feelings/Loveless', 'Sober', 'Writer in the Dark', 'Buzzcut Season', '400 Lux', 'Tennis Court', 'A World Alone', 'Glory and Gore', 'White Teeth Teens', 'Solar Power', 'Mood Ring']],
  ['Phoebe Bridgers', 'Indie Folk / Sadcore', 2017, 2023, ['Punisher', 'Stranger in the Alps'], ['Motion Sickness', 'Kyoto', 'Scott Street', 'I Know the End', 'Garden Song', 'Savior Complex', 'Moon Song', 'Funeral', 'Smoke Signals', 'Chinese Satellite', 'Punisher', 'Halloween', 'Graceland Too', 'ICU', 'Sidelines', 'Waiting Room', 'Georgia', 'Demi Moore', 'Killer']],
  ['Mitski', 'Indie Rock / Art Pop', 2014, 2023, ['Be the Cowboy', 'Bury Me at Makeout Creek', 'Puberty 2', 'The Land Is Inhospitable and So Are We'], ['My Love Mine All Mine', 'Washing Machine Heart', 'Nobody', 'First Love/Late Spring', 'Me and My Husband', 'I Bet on Losing Dogs', 'Francis Forever', 'Your Best American Girl', 'A Pearl', 'Geyser', 'Why Didn’t You Stop Me?', 'Two Slow Dancers', 'Pink in the Night', 'Townie', 'Drunk Walk Home', 'Liquid Smooth', 'Brand New City', 'Working for the Knife', 'Love Me More', 'Bug Like an Angel']],
  ['Beach House', 'Dream Pop / Shoegaze', 2008, 2022, ['Depression Cherry', 'Bloom', 'Teen Dream', '7', 'Once Twice Melody'], ['Space Song', 'Silver Soul', 'Myth', 'Master of None', 'Lazuli', 'PPP', 'Lemon Glow', 'Zebra', 'Take Care', 'Norway', 'Walk in the Park', '10 Mile Stereo', 'Wild', 'Wishes', 'Other People', 'Sparks', 'Beyond Love', 'Levitation', 'Dark Spring', 'Drunk in LA', 'Superstar']],
  ['Bon Iver', 'Indie Folk / Folktronica', 2007, 2019, ['For Emma, Forever Ago', 'Bon Iver', '22, A Million', 'i,i'], ['Skinny Love', 'Holocene', 'Roslyn', 'Exile', 'Re: Stacks', 'Flume', 'Blood Bank', '33 “GOD”', '29 #Strafford APTS', '8 (circle)', '00000 Million', 'Perth', 'Minnesota, WI', 'Towers', 'Michicant', 'Calgary', 'Beth/Rest', 'Hey, Ma', 'Naeem', 'Faith']],
  ['Sufjan Stevens', 'Chamber Folk / Indie Baroque', 2003, 2023, ['Carrie & Lowell', 'Illinois', 'Javelin', 'The Age of Adz'], ['Mystery of Love', 'Fourth of July', 'Chicago', 'Should Have Known Better', 'Visions of Gideon', 'Death with Dignity', 'Casimir Pulaski Day', 'John Wayne Gacy, Jr.', 'To Be Alone with You', 'Eugene', 'The Only Thing', 'Drawn to the Blood', 'Blue Bucket of Gold', 'Futile Devices', 'Impossible Soul', 'Will Anybody Ever Love Me?', 'So You Are Tired']],
  ['Vampire Weekend', 'Indie Pop / Baroque Rock', 2008, 2024, ['Vampire Weekend', 'Contra', 'Modern Vampires of the City', 'Father of the Bride', 'Only God Was Above Us'], ['A-Punk', 'Campus', 'Oxford Comma', 'Harmony Hall', 'Step', 'Diane Young', 'Cape Cod Kwassa Kwassa', 'Mansard Roof', 'Walcott', 'The Kids Don’t Stand a Chance', 'Horchata', 'White Sky', 'Holiday', 'Cousins', 'Giving Up the Gun', 'Diplomat’s Son', 'Unbelievers', 'Hannah Hunt', 'Ya Hey', 'This Life', 'Sunflower', 'Classical', 'Capricorn']],
  ['Phoenix', 'French Indie Pop / Synth-Rock', 2000, 2022, ['Wolfgang Amadeus Phoenix', 'Bankrupt!', 'Ti Amo', 'United', 'Alpha Zulu'], ['1901', 'Lisztomania', 'If I Ever Feel Better', 'Too Young', 'Lasso', 'Rome', 'Countdown', 'Girlfriend', 'Armistice', 'Fences', 'Love Like a Sunset', 'Entertainment', 'Trying to Be Cool', 'S.O.S. in Bel Air', 'Chloroform', 'J-Boy', 'Ti Amo', 'Fior di Latte', 'Alpha Zulu', 'Tonight']],
  ['LCD Soundsystem', 'Dance-Punk / Indietronica', 2005, 2022, ['Sound of Silver', 'This Is Happening', 'LCD Soundsystem', 'American Dream'], ['All My Friends', 'Dance Yrself Clean', 'Someone Great', 'New York, I Love You But You’re Bringing Me Down', 'Daft Punk Is Playing at My House', 'I Can Change', 'Home', 'North American Scum', 'Get Innocuous!', 'Time to Get Away', 'Us v Them', 'Tribulations', 'Movement', 'Losing My Edge', 'Yeah', 'Drunk Girls', 'You Wanted a Hit', 'oh baby', 'tonite', ' american dream', 'new body rhumba']],
  ['The Smiths', 'Jangle Pop / 80s Indie Rock', 1983, 1987, ['The Queen Is Dead', 'Meat Is Murder', 'The Smiths', 'Strangeways, Here We Come'], ['There Is a Light That Never Goes Out', 'This Charming Man', 'How Soon Is Now?', 'Heaven Knows I’m Miserable Now', 'Bigmouth Strikes Again', 'Please, Please, Please, Let Me Get What I Want', 'I Know It’s Over', 'Asleep', 'Back to the Old House', 'The Boy with the Thorn in His Side', 'Some Girls Are Bigger Than Others', 'Cemetry Gates', 'Vicar in a Tutu', 'Panic', 'Ask', 'Shoplifters of the World Unite', 'Girlfriend in a Coma', 'Last Night I Dreamt That Somebody Loved Me', 'Stop Me If You Think You’ve Heard This One Before', 'Hand in Glove', 'Reel Around the Fountain', 'William, It Was Really Nothing']],
  ['The Cure', 'Gothic Rock / Post-Punk / New Wave', 1979, 2024, ['Disintegration', 'The Head on the Door', 'Wish', 'Kiss Me, Kiss Me, Kiss Me', 'Three Imaginary Boys'], ['Friday I’m in Love', 'Boys Don’t Cry', 'Just Like Heaven', 'Close to Me', 'Lovesong', 'Pictures of You', 'Lullaby', 'In Between Days', 'A Forest', 'Fascination Street', 'Plainsong', 'Disintegration', 'Prayers for Rain', 'High', 'A Letter to Elise', 'Why Can’t I Be You?', 'Catch', 'Hot Hot Hot!!!', 'The Lovecats', 'The Walk', 'Let’s Go to Bed', 'Charlotte Sometimes', 'Primary', 'Jumping Someone Else’s Train', 'Alone']],
  ['Joy Division', 'Post-Punk', 1978, 1980, ['Unknown Pleasures', 'Closer'], ['Love Will Tear Us Apart', 'Disorder', 'Transmission', 'She’s Lost Control', 'Shadowplay', 'Atmosphere', 'New Dawn Fades', 'Isolation', 'Decades', 'Twenty Four Hours', 'Heart and Soul', 'Atrocity Exhibition', 'A Means to an End', 'Passover', 'Colony', 'The Eternal', 'Digital', 'Dead Souls', 'Warsaw', 'Ceremony']],
  ['New Order', 'Synth-Pop / Post-Punk / Alternative Dance', 1981, 2015, ['Power, Corruption & Lies', 'Substance', 'Low-Life', 'Technique'], ['Blue Monday', 'Bizarre Love Triangle', 'Age of Consent', 'Temptation', 'True Faith', 'Ceremony', 'Regret', 'The Perfect Kiss', 'Love Vigilantes', 'Sub-culture', 'Elegia', 'Your Silent Face', '5 8 6', 'Leave Me Alone', 'Shellshock', 'State of the Nation', '1963', 'Round & Round', 'Vanishing Point', 'World in Motion', 'Crystal', ' Krafty']],
  ['Depeche Mode', 'Synth-Pop / Dark Wave', 1981, 2023, ['Violator', 'Music for the Masses', 'Black Celebration', 'Some Great Reward', 'Songs of Faith and Devotion'], ['Enjoy the Silence', 'Personal Jesus', 'Just Can’t Get Enough', 'Policy of Truth', 'Never Let Me Down Again', 'Strangelove', 'People Are People', 'Everything Counts', 'World in My Eyes', 'Halo', 'Waiting for the Night', 'Clean', 'Behind the Wheel', 'Little 15', 'Stripped', 'A Question of Time', 'Black Celebration', 'Shake the Disease', 'Master and Servant', 'Blasphemous Rumours', 'Walking in My Shoes', 'I Feel You', 'In Your Room', 'Precious', 'Ghosts Again']],
  ['Talking Heads', 'New Wave / Art Punk / Funk-Rock', 1977, 1988, ['Remain in Light', 'Speaking in Tongues', 'Fear of Music', 'More Songs About Buildings and Food', 'Talking Heads: 77'], ['Psycho Killer', 'Once in a Lifetime', 'Burning Down the House', 'This Must Be the Place (Naive Melody)', 'Road to Nowhere', 'Take Me to the River', 'Life During Wartime', 'Born Under Punches', 'Crosseyed and Painless', 'Houses in Motion', 'The Great Curve', 'Girlfriend Is Better', 'Slippery People', 'Making Flippy Floppy', 'Heaven', 'I Zimbra', 'Cities', 'Air', 'Mind', 'And She Was', 'Wild Wild Life', 'Nothing But Flowers']],
  ['Cocteau Twins', 'Dream Pop / Ethereal Wave', 1982, 1996, ['Heaven or Las Vegas', 'Treasure', 'Blue Bell Knoll', 'Four-Calendar Café'], ['Cherry-Coloured Funk', 'Heaven or Las Vegas', 'Sea, Swallow Me', 'Lorelei', 'Pandora (for Cindy)', 'Iceblink Luck', 'Pitch the Baby', 'Fifty-Fifty Clown', 'I Wear Your Ring', 'Fotzepolitic', 'Wolf in the Breast', 'Road, River and Rail', 'Frou-Frou Foxes in Midsummer Fires', 'Ivo', 'Persephone', 'Carolyn’s Fingers', 'Blue Bell Knoll', 'A Kissed Out Red Floatboat', 'Know Who You Are at Every Age', 'Pearly-Dewdrops’ Drops', 'Sugar Hiccup']],
  ['Björk', 'Art Pop / Avant-Garde Electronic', 1993, 2022, ['Homogenic', 'Post', 'Vespertine', 'Debut'], ['Army of Me', 'Hyperballad', 'Jóga', 'Bachelorette', 'Venus as a Boy', 'Human Behaviour', 'It’s Oh So Quiet', 'Pagan Poetry', 'Hidden Place', 'All Is Full of Love', 'Hunter', 'Unravel', 'Pluto', 'Isobel', 'Possibly Maybe', 'I Miss You', 'Big Time Sensuality', 'Come to Me', 'Crying', 'Play Dead', 'Cocoon', 'Unison', 'Stonemilker']],
  ['Portishead', 'Trip-Hop / Downtempo', 1994, 2008, ['Dummy', 'Portishead', 'Third'], ['Glory Box', 'Sour Times', 'Roads', 'Mysterons', 'Wandering Star', 'Numb', 'It Could Be Sweet', 'Strangers', 'It’s a Fire', 'Biscuit', 'Pedestal', 'All Mine', 'Over', 'Only You', 'Cowboys', 'Undenied', 'Half Day Closing', 'Humming', 'Machine Gun', 'The Rip', 'Magic Doors']],
  ['Massive Attack', 'Trip-Hop / Bristol Sound', 1991, 2010, ['Mezzanine', 'Blue Lines', 'Protection', 'Heligoland'], ['Teardrop', 'Unfinished Sympathy', 'Angel', 'Paradise Circus', 'Safe from Harm', 'Protection', 'Inertia Creeps', 'Risingson', 'Black Milk', 'Dissolved Girl', 'Man Next Door', 'Group Four', 'Daydreaming', 'One Love', 'Be Thankful for What You’ve Got', 'Karmacoma', 'Three', 'Sly', 'Live with Me', 'Pray for Rain']],
  ['Aphex Twin', 'IDM / Ambient Techno', 1992, 2018, ['Selected Ambient Works 85–92', 'Richard D. James Album', 'Drukqs', 'Syro'], ['Avril 14th', 'Xtal', '#3 (Rhubarb)', 'Windowlicker', 'Alberto Balsalm', 'Flim', 'IZ-US', '4', 'Fingerbib', 'Girl/Boy Song', 'Come to Daddy', 'Tha', 'Pulsewidth', 'Ageispolis', 'Heliosphan', 'We Are the Music Makers', 'Actium', 'aisatsana [102]', 'minipops 67 [120.2]', 'QKThr', 'Vordhosbn', 'Cock/Ver10']],
  ['Pink Floyd', 'Progressive Rock / Psychedelic Rock', 1967, 1994, ['The Dark Side of the Moon', 'Wish You Were Here', 'The Wall', 'Animals', 'Meddle'], ['Wish You Were Here', 'Comfortably Numb', 'Another Brick in the Wall, Pt. 2', 'Time', 'Money', 'Shine On You Crazy Diamond', 'The Great Gig in the Sky', 'Brain Damage', 'Eclipse', 'Breathe (In the Air)', 'Us and Them', 'Hey You', 'Mother', 'Run Like Hell', 'Young Lust', 'Have a Cigar', 'Welcome to the Machine', 'Dogs', 'Pigs (Three Different Ones)', 'Sheep', 'Echoes', 'One of These Days', 'Learning to Fly', 'High Hopes', 'See Emily Play', 'Astronomy Domine']],
  ['Led Zeppelin', 'Hard Rock / Blues Rock', 1969, 1979, ['Led Zeppelin IV', 'Physical Graffiti', 'Led Zeppelin II', 'Houses of the Holy', 'Led Zeppelin'], ['Stairway to Heaven', 'Immigrant Song', 'Whole Lotta Love', 'Black Dog', 'Kashmir', 'Ramble On', 'Rock and Roll', 'Going to California', 'Good Times Bad Times', 'Dazed and Confused', 'Babe I’m Gonna Leave You', 'Communication Breakdown', 'Heartbreaker', 'What Is and What Should Never Be', 'Since I’ve Been Loving You', 'Tangerine', 'Over the Hills and Far Away', 'The Rain Song', 'No Quarter', 'D’yer Mak’er', 'The Ocean', 'Trampled Under Foot', 'Ten Years Gone', 'In My Time of Dying', 'Fool in the Rain', 'All My Love']],
  ['The Rolling Stones', 'Rock & Roll / Rhythm & Blues', 1964, 1981, ['Sticky Fingers', 'Exile on Main St.', 'Let It Bleed', 'Some Girls', 'Beggars Banquet', 'Tattoo You'], ['Paint It, Black', 'Gimme Shelter', 'Sympathy for the Devil', '(I Can’t Get No) Satisfaction', 'Start Me Up', 'Angie', 'Wild Horses', 'Beast of Burden', 'Miss You', 'Brown Sugar', 'You Can’t Always Get What You Want', 'Jumpin’ Jack Flash', 'Honky Tonk Women', 'Tumbling Dice', 'Rocks Off', 'Happy', 'Sweet Virginia', 'Shine a Light', 'Can’t You Hear Me Knocking', 'Bitch', 'Moonlight Mile', 'Under My Thumb', 'Ruby Tuesday', 'She’s a Rainbow', 'Street Fighting Man', 'Waiting on a Friend']],
  ['Bob Dylan', 'Folk Rock / Singer-Songwriter', 1962, 2020, ['Highway 61 Revisited', 'Blonde on Blonde', 'Blood on the Tracks', 'Bringing It All Back Home', 'The Freewheelin’ Bob Dylan'], ['Like a Rolling Stone', 'Knockin’ on Heaven’s Door', 'Blowin’ in the Wind', 'Hurricane', 'The Times They Are a-Changin’', 'Tangled Up in Blue', 'Mr. Tambourine Man', 'Don’t Think Twice, It’s All Right', 'Subterranean Homesick Blues', 'Girl from the North Country', 'Lay Lady Lay', 'All Along the Watchtower', ' Shelter from the Storm', 'Simple Twist of Fate', 'Forever Young', 'Positively 4th Street', 'Just Like a Woman', 'I Want You', 'Stuck Inside of Mobile with the Memphis Blues Again', 'Visions of Johanna', 'Desolation Row', 'Maggie’s Farm', 'It’s All Over Now, Baby Blue', 'It’s Alright, Ma (I’m Only Bleeding)', 'A Hard Rain’s a-Gonna Fall', 'Masters of War']],
  ['Joni Mitchell', 'Folk / Jazz-Folk / Singer-Songwriter', 1968, 1979, ['Blue', 'Court and Spark', 'Hejira', 'Clouds', 'Ladies of the Canyon'], ['Both Sides Now', 'Big Yellow Taxi', 'A Case of You', 'River', 'California', 'Help Me', 'Free Man in Paris', 'Carey', 'Blue', 'Little Green', 'My Old Man', 'All I Want', 'The Last Time I Saw Richard', 'Woodstock', 'The Circle Game', 'Chelsea Morning', 'Coyote', 'Amelia', 'Raised on Robbery', 'People’s Parties']],
  ['Bruce Springsteen', 'Heartland Rock', 1973, 2002, ['Born in the U.S.A.', 'Born to Run', 'Darkness on the Edge of Town', 'The River', 'Nebraska'], ['Dancing in the Dark', 'Born to Run', 'Born in the U.S.A.', 'Thunder Road', 'I’m on Fire', 'Streets of Philadelphia', 'Hungry Heart', 'Atlantic City', 'Glory Days', 'The River', 'Badlands', 'Jungleland', 'Tenth Avenue Freeze-Out', 'Backstreets', 'Prove It All Night', 'The Promised Land', 'Racing in the Street', 'My Hometown', 'Cover Me', 'No Surrender', 'Bobby Jean', 'Brilliant Disguise', 'Tougher Than the Rest', 'The Rising', 'Rosalita (Come Out Tonight)']],
  ['Billy Joel', 'Piano Rock / Pop-Rock', 1973, 1993, ['The Stranger', '52nd Street', 'Glass Houses', 'An Innocent Man', 'Piano Man'], ['Piano Man', 'Vienna', 'Uptown Girl', 'We Didn’t Start the Fire', 'My Life', 'Just the Way You Are', 'Movin’ Out (Anthony’s Song)', 'She’s Always a Woman', 'Only the Good Die Young', 'Scenes from an Italian Restaurant', 'It’s Still Rock and Roll to Me', 'You May Be Right', 'Tell Her About It', 'The Longest Time', 'New York State of Mind', 'Say Goodbye to Hollywood', 'Big Shot', 'Honesty', 'Allentown', 'Pressure', 'Goodnight Saigon', 'The River of Dreams', 'And So It Goes', 'Lullabye (Goodnight, My Angel)']],
  ['Elton John', 'Glam Rock / Piano Pop', 1970, 1994, ['Goodbye Yellow Brick Road', 'Honky Château', 'Madman Across the Water', 'Captain Fantastic', 'Tumbleweed Connection'], ['Rocket Man', 'Tiny Dancer', 'Your Song', 'I’m Still Standing', 'Bennie and the Jets', 'Goodbye Yellow Brick Road', 'Don’t Go Breaking My Heart', 'Saturday Night’s Alright for Fighting', 'Candle in the Wind', 'crocodile Rock', 'Daniel', 'Someone Saved My Life Tonight', 'Mona Lisas and Mad Hatters', 'Levon', 'Honky Cat', 'Philadelphia Freedom', 'The Bitch Is Back', 'Sad Songs (Say So Much)', 'I Guess That’s Why They Call It the Blues', 'Sacrifice', 'Nikita', 'Can You Feel the Love Tonight', 'Circle of Life', 'Cold Heart']],
  ['ABBA', 'Euro-Pop / Disco', 1974, 1981, ['Arrival', 'Voulez-Vous', 'Super Trouper', 'The Visitors', 'ABBA'], ['Dancing Queen', 'Gimme! Gimme! Gimme! (A Man After Midnight)', 'Mamma Mia', 'Lay All Your Love on Me', 'The Winner Takes It All', 'Take a Chance on Me', 'Slipping Through My Fingers', 'Chiquitita', 'Waterloo', 'SOS', 'Super Trouper', 'Fernando', 'Knowing Me, Knowing You', 'Money, Money, Money', 'Angeleyes', 'Voulez-Vous', 'Does Your Mother Know', 'Thank You for the Music', 'The Name of the Game', 'One of Us', 'When All Is Said and Done', 'Honey, Honey']],
  ['Earth, Wind & Fire', 'Funk / Soul / Disco', 1973, 1981, ['I Am', 'All ’n All', 'That’s the Way of the World', 'Gratitude'], ['September', 'Let’s Groove', 'Boogie Wonderland', 'Shining Star', 'Fantasy', 'After the Love Has Gone', 'Reasons', 'Sing a Song', 'Getaway', 'Saturday Nite', 'Serpentine Fire', 'Jupiter', 'In the Stone', 'Can’t Hide Love', 'Devotion', 'Sun Goddess', 'Got to Get You into My Life']],
  ['Whitney Houston', 'Pop / R&B Diva Balladry', 1985, 1999, ['Whitney', 'The Bodyguard', 'Whitney Houston', 'My Love Is Your Love'], ['I Wanna Dance with Somebody (Who Loves Me)', 'I Will Always Love You', 'How Will I Know', 'I Have Nothing', 'Higher Love', 'Greatest Love of All', 'Saving All My Love for You', 'So Emotional', 'Where Do Broken Hearts Go', 'Didn’t We Almost Have It All', 'One Moment in Time', 'Run to You', 'I’m Every Woman', 'Queen of the Night', 'Exhale (Shoop Shoop)', 'It’s Not Right but It’s Okay', 'My Love Is Your Love', 'Heartbreak Hotel', 'When You Believe', 'Count On Me']],
  ['Mariah Carey', 'R&B / Pop', 1990, 2008, ['Daydream', 'Butterfly', 'The Emancipation of Mimi', 'Music Box', 'Merry Christmas'], ['We Belong Together', 'Fantasy', 'Always Be My Baby', 'Obsessed', 'Hero', 'Without You', 'Touch My Body', 'All I Want for Christmas Is You', 'Honey', 'My All', 'Breakdown', 'The Roof', 'Butterfly', 'One Sweet Day', 'Dreamlover', 'Emotions', 'Vision of Love', 'Love Takes Time', 'Someday', 'I Don’t Wanna Cry', 'Make It Happen', 'Heartbreaker', 'Thank God I Found You', 'Shake It Off', 'It’s Like That', 'Don’t Forget About Us']],
  ['Janet Jackson', 'R&B / New Jack Swing / Pop', 1986, 2001, ['The Velvet Rope', 'janet.', 'Rhythm Nation 1814', 'Control', 'All for You'], ['That’s the Way Love Goes', 'Together Again', 'All for You', 'Rhythm Nation', 'Got ’til It’s Gone', 'Any Time, Any Place', 'If', 'Again', 'Escapade', 'Miss You Much', 'Love Will Never Do (Without You)', 'Come Back to Me', 'Black Cat', 'Control', 'Nasty', 'What Have You Done for Me Lately', 'When I Think of You', 'Let’s Wait Awhile', 'The Pleasure Principle', 'I Get Lonely', 'Someone to Call My Lover', ' Scream']],
  ['Madonna', 'Dance-Pop / Electronica', 1983, 2008, ['Like a Prayer', 'Ray of Light', 'True Blue', 'Confessions on a Dance Floor', 'Like a Virgin'], ['Hung Up', 'Like a Prayer', 'Material Girl', 'Vogue', 'La Isla Bonita', '4 Minutes', 'Into the Groove', 'Like a Virgin', 'Papa Don’t Preach', 'Open Your Heart', 'Live to Tell', 'True Blue', 'Holiday', 'Borderline', 'Lucky Star', 'Crazy for You', 'Express Yourself', 'Cherish', 'Justify My Love', 'Frozen', 'Ray of Light', 'The Power of Good-Bye', 'Music', 'Don’t Tell Me', 'Die Another Day', 'Sorry', 'Get Together']],
  ['Oasis', 'Britpop / 90s Rock', 1994, 2008, ['(What’s the Story) Morning Glory?', 'Definitely Maybe', 'Be Here Now'], ['Wonderwall', 'Don’t Look Back in Anger', 'Champagne Supernova', 'Live Forever', 'Stop Crying Your Heart Out', 'Supersonic', 'She’s Electric', 'Some Might Say', 'Stand by Me', 'Slide Away', 'Morning Glory', 'Roll with It', 'Cast No Shadow', 'Hello', 'Acquiesce', 'The Masterplan', 'Half the World Away', 'Talk Tonight', 'Whatever', 'Rock ’n’ Roll Star', 'Cigarettes & Alcohol', 'Shakermaker', 'Columbia', 'married with Children', 'D’You Know What I Mean?', 'All Around the World', 'Little by Little', 'Lyla', 'The Importance of Being Idle']],
  ['Blur', 'Britpop / Art Rock', 1991, 2023, ['Parklife', 'Blur', 'The Great Escape', '13', 'Modern Life Is Rubbish'], ['Song 2', 'Girls & Boys', 'Parklife', 'Coffee & TV', 'The Universal', 'Tender', 'Beetlebum', 'Country House', 'There’s No Other Way', 'End of a Century', 'To the End', 'For Tomorrow', 'Chemical World', 'Charmless Man', 'Out of Time', 'No Distance Left to Run', 'Ghost Ship', 'The Narcissist', 'Barbaric']],
  ['Coldplay', 'Alternative Rock / Pop-Rock', 2000, 2024, ['Parachutes', 'A Rush of Blood to the Head', 'Viva la Vida', 'X&Y', 'Mylo Xyloto', 'Ghost Stories'], ['Yellow', 'Viva la Vida', 'The Scientist', 'Sparks', 'Fix You', 'Clocks', 'A Sky Full of Stars', 'Something Just Like This', 'Paradise', 'Hymn for the Weekend', 'Adventure of a Lifetime', 'Trouble', 'Shiver', 'Don’t Panic', 'In My Place', 'God Put a Smile upon Your Face', 'Green Eyes', 'Warning Sign', 'A Rush of Blood to the Head', 'Speed of Sound', 'Talk', 'Swallowed in the Sea', 'Violet Hill', 'Life in Technicolor ii', 'Lovers in Japan', 'Every Teardrop Is a Waterfall', 'Charlie Brown', 'Magic', 'My Universe']],
  ['Linkin Park', 'Nu-Metal / Alternative Rock', 2000, 2024, ['Hybrid Theory', 'Meteora', 'Minutes to Midnight', 'One More Light'], ['In the End', 'Numb', 'Faint', 'One Step Closer', 'What I’ve Done', 'Crawling', 'Breaking the Habit', 'Somewhere I Belong', 'Papercut', 'Bleed It Out', 'Burn It Down', 'New Divide', 'Castle of Glass', 'Lost', 'The Emptiness Machine', 'Heavy Is the Crown', 'Points of Authority', 'Runaway', 'By Myself', 'A Place for My Head', 'Forgotten', 'Don’t Stay', 'Lying from You', 'Hit the Floor', 'Easier to Run', 'Figure.09', 'From the Inside', 'Leave Out All the Rest', 'Shadow of the Day', 'Given Up', 'One More Light', 'Heavy', 'Waiting for the End']],
  ['Green Day', 'Punk Rock / Pop-Punk', 1994, 2024, ['Dookie', 'American Idiot', 'Nimrod', '21st Century Breakdown', 'Insomniac'], ['Basket Case', 'Boulevard of Broken Dreams', 'American Idiot', 'Wake Me Up When September Ends', 'Good Riddance (Time of Your Life)', 'Holiday', 'When I Come Around', '21 Guns', 'Welcome to Paradise', 'Longview', 'She', 'Brain Stew', 'Jaded', 'Geek Stink Breath', 'Hitchin’ a Ride', 'Redundant', 'Nice Guys Finish Last', 'Minority', 'Warning', 'Waiting', 'Jesus of Suburbia', 'St. Jimmy', 'Give Me Novacaine', 'She’s a Rebel', 'Extraordinary Girl', 'Letterbomb', 'Homecoming', 'Know Your Enemy', 'Last Night on Earth', '21st Century Breakdown', 'The American Dream Is Killing Me']],
  ['Red Hot Chili Peppers', 'Funk Rock / Alternative Rock', 1991, 2022, ['Californication', 'By the Way', 'Blood Sugar Sex Magik', 'Stadium Arcadium'], ['Under the Bridge', 'Californication', 'Can’t Stop', 'Scar Tissue', 'Otherside', 'Snow (Hey Oh)', 'Dani California', 'By the Way', 'Give It Away', 'Dark Necessities', 'The Zephyr Song', 'Around the World', 'Parallel Universe', 'Road Trippin’', 'Easily', 'This Velvet Glove', 'Dosed', 'Universally Speaking', 'Don’t Forget Me', 'Venice Queen', 'Wet Sand', 'Tell Me Baby', 'Charlie', 'Hump de Bump', 'Strip My Mind', 'Hard to Concentrate', 'Suck My Kiss', 'Breaking the Girl', 'If You Have to Ask', 'Soul to Squeeze', 'Aeroplane', 'Black Summer']],
  ['Foo Fighters', 'Post-Grunge / Hard Rock', 1995, 2023, ['The Colour and the Shape', 'Wasting Light', 'There Is Nothing Left to Lose', 'In Your Honor'], ['Everlong', 'The Pretender', 'Best of You', 'My Hero', 'Learn to Fly', 'All My Life', 'Monkey Wrench', 'Times Like These', 'Walk', 'Big Me', 'This Is a Call', 'I’ll Stick Around', 'February Stars', 'Hey, Johnny Park!', 'Walking After You', 'Breakout', 'Stacked Actors', 'Generator', 'Aurora', 'Next Year', 'DOA', 'No Way Back', 'Resolve', 'Long Road to Ruin', 'Rope', 'Bridge Burning', 'White Limo', 'Arlandria', 'These Days', 'Run', 'The Sky Is a Neighborhood', 'Rescued']],
  ['Paramore', 'Pop-Punk / Emo / New Wave', 2005, 2023, ['Riot!', 'Paramore', 'Brand New Eyes', 'After Laughter', 'This Is Why'], ['Misery Business', 'Still Into You', 'Ain’t It Fun', 'The Only Exception', 'Hard Times', 'Decode', 'All I Wanted', 'Ignorance', 'Brick by Boring Brick', 'That’s What You Get', 'crushcrushcrush', 'Playing God', 'Careful', 'Turn It Off', 'Looking Up', 'Where the Lines Overlap', 'Misguided Ghosts', 'Rose-Colored Boy', 'Told You So', 'Fake Happy', '26', 'Pool', 'Caught in the Middle', 'Pressure', 'Emergency', 'This Is Why', 'The News', 'Running Out of Time', 'Crave']],
  ['My Chemical Romance', 'Emo / Post-Hardcore / Rock Opera', 2002, 2022, ['The Black Parade', 'Three Cheers for Sweet Revenge', 'Danger Days'], ['Welcome to the Black Parade', 'Teenagers', 'Helena', 'I’m Not Okay (I Promise)', 'Famous Last Words', 'Na Na Na', 'Mama', 'I Don’t Love You', 'Cancer', 'Dead!', 'This Is How I Disappear', 'The Sharpest Lives', 'House of Wolves', 'Disenchanted', 'Sleep', 'The End.', 'You Know What They Do to Guys Like Us in Prison', 'The Ghost of You', 'Give ’Em Hell, Kid', 'Thank You for the Venom', 'Cemetery Drive', 'It’s Not a Fashion Statement, It’s a Deathwish', 'SING', 'Bulletproof Heart', 'Planetary (GO!)', 'Summertime', 'The Foundations of Decay']],
  ['Metallica', 'Thrash Metal / Heavy Metal', 1983, 2023, ['Metallica (The Black Album)', 'Master of Puppets', 'Ride the Lightning', '...And Justice for All'], ['Enter Sandman', 'Nothing Else Matters', 'Master of Puppets', 'One', 'For Whom the Bell Tolls', 'Fade to Black', 'Sad but True', 'The Unforgiven', 'Seek & Destroy', 'Wherever I May Roam', 'Whiskey in the Jar', 'Battery', 'Welcome Home (Sanitarium)', 'Orion', 'Damage, Inc.', 'Creeping Death', 'Ride the Lightning', 'Fight Fire with Fire', 'The Call of Ktulu', 'Blackened', '...And Justice for All', 'Harvester of Sorrow', 'Don’t Tread on Me', 'Through the Never', 'Of Wolf and Man', 'Fuel', 'The Memory Remains', 'Until It Sleeps', 'King Nothing', 'Lux Æterna']],
  ['System of a Down', 'Alternative Metal / Nu-Metal', 1998, 2005, ['Toxicity', 'Mezmerize', 'Hypnotize', 'System of a Down'], ['Chop Suey!', 'Toxicity', 'B.Y.O.B.', 'Lonely Day', 'Aerials', 'Sugar', 'Spiders', 'Hypnotize', 'Question!', 'Radio/Video', 'Cigaro', 'Violent Pornography', 'Lost in Hollywood', 'Sad Statue', 'Revenga', 'Attack', 'Dreaming', 'Kill Rock ’n Roll', 'Vicinity of Obscenity', 'Holy Mountains', 'Soldier Side', 'Prison Song', 'Needles', 'Deer Dance', 'Jet Pilot', 'Forest', 'ATWA', 'Science', 'Psycho', 'Innervision', 'I-E-A-I-A-I-O']],
  ['Bad Bunny', 'Reggaeton / Latin Trap', 2017, 2024, ['Un Verano Sin Ti', 'YHLQMDLG', 'nadie sabe lo que va a pasar mañana', 'El Último Tour Del Mundo'], ['Tití Me Preguntó', 'Me Porto Bonito', 'Ojitos Lindos', 'Moscow Mule', 'Dákiti', 'Efecto', 'Callaíta', 'MIA', 'Safaera', 'Yo Perreo Sola', 'La Canción', 'Vete', 'Si Veo a Tu Mamá', 'La Difícil', 'Pero Ya No', 'La Santa', 'Ignorantes', 'Bichiyal', 'Un Verano Sin Ti', 'Después de la Playa', 'Party', 'Tarot', 'Neverita', 'El Apagón', 'Andrea', 'Agosto', 'MONACO', 'PERRO NEGRO', 'WHERE SHE GOES', 'un x100to', 'Yonaguni', 'Booker T', 'La Noche de Anoche']],
  ['Rosalía', 'Nuevo Flamenco / Reggaeton / Art Pop', 2017, 2023, ['MOTOMAMI', 'El Mal Querer'], ['DESPECHÁ', 'BIZCOCHITO', 'LA FAMA', 'SAOKO', 'MALAMENTE', 'Con Altura', 'CANDY', 'HENTAI', 'CHICKEN TERIYAKI', 'DIABLO', 'CUUUUuuuuuute', 'COMO UN G', 'LA COMBI VERSACE', 'DELIRIO DE GRANDEZA', 'BULERÍAS', 'SAKURA', 'PIENSO EN TU MIRÁ', 'DI MI NOMBRE', 'BAGDAD', 'QUE NO SALGA LA LUNA', 'A NINGÚN HOMBRE', 'BESO', 'VAMPIROS', 'PROMESA', 'LLYLM', 'TKN', 'Linda', 'Yo x Ti, Tu x Mi']],
  ['Burna Boy', 'Afrobeats / Afro-Fusion', 2018, 2024, ['Love, Damini', 'Twice as Tall', 'African Giant', 'I Told Them...'], ['Last Last', 'Ye', 'City Boys', 'On the Low', 'Location', 'For My Hand', 'It’s Plenty', 'Gbona', 'Anybody', 'Kilometre', 'Sittin’ On Top Of The World', 'Talibans II', 'Toni-Ann Singh', 'Common Person', 'Alone', 'Wild Dreams', 'Cloak & Dagger', 'Rollercoaster', 'Way Too Big', 'Wonderful', 'Monsters You Made', 'Real Life', '23', 'Bank On It', 'Angelina', 'Killin Dem', 'Dangote', 'Collateral Damage', 'Gum Body']],
  ['Wizkid', 'Afrobeats / R&B', 2011, 2023, ['Made in Lagos', 'More Love, Less Ego', 'Sounds from the Other Side'], ['Essence', 'Come Closer', 'Ojuelegba', 'True Love', 'Mood', 'Ginger', 'Joro', 'Soco', 'Fever', 'Smile', 'Reckless', 'Blessed', 'Longtime', 'Mighty Wine', 'Piece of My Heart', 'No Stress', 'Sweet One', 'Grace', 'Gyrate', 'Bad To Me', 'Money & Love', '2 Sugar', 'Frames (Who’s Gonna Know)']],
  ['Tems', 'Afrobeats / Alternative R&B', 2019, 2024, ['Born in the Wild', 'For Broken Ears', 'If Orange Was a Place'], ['Free Mind', 'Love Me JeJe', 'Me & U', 'Higher', 'Damages', 'Found', 'Crazy Tings', 'Replay', 'Avoid Things', 'Vibe Out', 'Ice T', 'interfere', 'Try Me', 'Mr Rebel', 'Looku Looku', 'Wickedest', 'Burning', 'Forever', 'Gangsta', 'Unfortunate', 'Ready', 'You in My Face', 'Turn Me Up', 'T-Unit']],
  ['BTS', 'K-Pop / Dance-Pop / Hip-Hop', 2013, 2023, ['Map of the Soul: 7', 'Love Yourself: Tear', 'Wings', 'BE'], ['Dynamite', 'Butter', 'Boy With Luv', 'FAKE LOVE', 'DNA', 'Spring Day', 'Blood Sweat & Tears', 'Black Swan', 'ON', 'Life Goes On', 'Permission to Dance', 'IDOL', 'MIC Drop', 'Run BTS', 'Yet To Come', 'Fire', 'Dope', 'Save ME', 'I NEED U', 'Run', 'Boy In Luv', 'No More Dream', 'Euphoria', 'Serendipity', 'Singularity', 'Epiphany', 'Filter', 'My Time', 'Louder than bombs', 'UGH!', '00:00 (Zero O’Clock)', 'Friends', 'Moon', 'Blue & Grey', 'Telepathy', 'Dis-ease']],
  ['NewJeans', 'K-Pop / UK Garage / Y2K R&B', 2022, 2024, ['Get Up', 'New Jeans', 'OMG', 'How Sweet'], ['Super Shy', 'OMG', 'Ditto', 'Hype Boy', 'Attention', 'ETA', 'Cool With You', 'New Jeans', 'ASAP', 'Get Up', 'Cookie', 'Hurt', 'How Sweet', 'Bubble Gum', 'Supernatural', 'Right Now', 'GODS', 'Zero']],
  ['BLACKPINK', 'K-Pop / EDM-Trap', 2016, 2023, ['THE ALBUM', 'BORN PINK', 'SQUARE UP'], ['How You Like That', 'Pink Venom', 'Shut Down', 'DDU-DU DDU-DU', 'Kill This Love', 'Lovesick Girls', 'BOOMBAYAH', 'As If It’s Your Last', 'Playing with Fire', 'Whistle', 'Stay', 'Forever Young', 'Really', 'See U Later', 'Don’t Know What to Do', 'Kick It', 'Hope Not', 'Ice Cream', 'Pretty Savage', 'Bet You Wanna', 'Crazy Over You', 'Love To Hate Me', 'You Never Know', 'Typa Girl', 'Hard to Love', 'The Happiest Girl', 'Tally', 'Ready For Love']],
  ['Kaytranada', 'Electronic / Funk / House / Hip-Hop', 2014, 2024, ['99.9%', 'BUBBA', 'TIMELESS'], ['10%', 'YOU’RE THE ONE', 'GLOWED UP', 'Intimidated', 'LITE SPOT', 'GOT IT GOOD', 'VEX OH', 'What You Need', 'Gray Area', 'Puff Lah', 'Scared To Death', 'Freefall', 'Taste', 'Midsection', 'Need It', 'Culture', 'Track Uno', 'Bus Ride', 'Together', 'Drive Me Crazy', 'Weight Off', 'One Too Many', 'Despite The Weather', 'Bullets', 'Vivid Dreams', 'Leave Me Alone', 'Be Your Girl', 'At All', 'Witchy', 'Drip Sweat', 'Stuntin', 'Lover/Friend', 'Snap My Finger']],
  ['Fred again..', 'UK Garage / Emotional House', 2021, 2024, ['Actual Life', 'Actual Life 2', 'Actual Life 3', 'ten days'], ['Delilah (pull me out of this)', 'Marea (we’ve lost dancing)', 'Rumble', 'adore u', 'leavemealone', 'Jungle', 'Turn On The Lights again..', 'Danielle (smile on my face)', 'Kammy (like i do)', 'Bleu (better with time)', 'Clara (the night is dark)', 'Nathan (still breathing)', 'Kyle (i found you)', 'Dermot (see yourself in my eyes)', 'Sabrina (i am a party)', 'Billie (loving arms)', 'Hannah (the sun)', 'Faisal (envelops me)', 'Tanya (maybe life)', 'places to be', 'ten', 'just stand there', 'fear less', 'glow']],
  ['Disclosure', 'UK Garage / Deep House', 2012, 2023, ['Settle', 'Caracal', 'Energy', 'Alchemy'], ['Latch', 'White Noise', 'Omen', 'You & Me', 'She’s Gone, Dance On', 'When a Fire Starts to Burn', 'F for You', 'Help Me Lose My Mind', 'Holding On', 'Magnets', 'Nocturnal', 'Willing & Able', 'Hourglass', 'Jaded', 'Watch Your Step', 'My High', 'Douha (Mali Mali)', 'Tondo', 'Birthday', 'Know Your Worth', 'Talk', 'Ultimatum', 'Boiling', 'What’s in Your Head', 'Confess to Me', 'Voices', 'January', 'stimulation']],
  ['Justice', 'French Electro / Nu-Disco', 2007, 2024, ['Cross', 'Woman', 'Audio, Video, Disco', 'Hyperdrama'], ['D.A.N.C.E.', 'Neverender', 'Genesis', 'Phantom', 'Safe and Sound', 'We Are Your Friends', 'Stress', 'DVNO', 'On’n’On', 'Civilization', 'Audio, Video, Disco', 'New Lands', 'Helix', 'Randy', 'Alakazam !', 'Fire', 'Pleasure', 'Stop', 'Love S.O.S.', 'One Night/All Night', 'Generator', 'Afterimage', 'Incognito', 'Mannequin Love', 'Moonlight Rendez-Vous', 'Explorer', 'Muscle Memory', 'waters of Nazareth', 'Phantom Pt. II', 'Valentine', 'The Party']],
  ['Tatsuro Yamashita', 'Japanese City Pop / Boogie', 1976, 1991, ['FOR YOU', 'RIDE ON TIME', 'MOONGLOW', 'SPACY', 'COME ALONG'], ['Ride on Time', 'Sparkle', 'Magic Ways', 'Love Talkin’ (Honey It’s You)', 'Daydream', 'Someday', 'Silent Screamer', 'Morning Glory', 'Music Book', 'Futari', 'Loveland, Island', 'Your Eyes', 'Bomber', 'Let’s Dance Baby', 'Solid Slider', 'Paper Doll', 'Candy', 'Dancer', 'Hot Shot', 'Sunshine', 'Yellow Cab', 'Jody', 'fragile', 'merry-go-round', 'Christmas Eve']],
  ['Miles Davis', 'Modal Jazz / Cool Jazz / Jazz Fusion', 1954, 1985, ['Kind of Blue', 'Bitches Brew', 'Sketches of Spain', 'In a Silent Way', 'Birth of the Cool'], ['So What', 'Blue in Green', 'Freddie Freeloader', 'All Blues', 'Flamenco Sketches', 'Round Midnight', 'My Funny Valentine', 'Someday My Prince Will Come', 'Milestones', 'Nardis', 'Seven Steps to Heaven', 'autumn Leaves', 'It Never Entered My Mind', 'Bye Bye Blackbird', 'Dear Old Stockholm', 'Solar', 'Four', 'Tune Up', 'Walkin’', 'Airegin', 'Oleo', 'Generique', 'Pharaoh’s Dance', 'Bitches Brew', 'Spanish Key', 'In a Silent Way', 'Shhh / Peaceful', 'Nefertiti', 'Footprints', 'E.S.P.', 'Time After Time', 'Human Nature']],
  ['John Coltrane', 'Hard Bop / Modal Jazz / Spiritual Jazz', 1957, 1967, ['A Love Supreme', 'Blue Train', 'Giant Steps', 'My Favorite Things', 'Ballads'], ['My Favorite Things', 'In a Sentimental Mood', 'Giant Steps', 'Naima', 'Blue Train', 'A Love Supreme, Pt. 1 – Acknowledgement', 'A Love Supreme, Pt. 2 – Resolution', 'Equinox', 'Central Park West', 'Cousin Mary', 'Countdown', 'Syeeda’s Song Flute', 'Mr. P.C.', 'Moment’s Notice', 'Lazy Bird', 'I’m Old Fashioned', 'Locomotion', 'Say It (Over and Over Again)', 'You Don’t Know What Love Is', 'Too Young to Go Steady', 'All or Nothing at All', 'I Wish I Knew', 'What’s New', 'It’s Easy to Remember', 'Nancy (With the Laughing Face)', 'Alabama', ' Lush Life']],
  ['Nina Simone', 'Vocal Jazz / Soul / Civil Rights Balladry', 1958, 1978, ['I Put a Spell on You', 'Pastel Blues', 'Wild Is the Wind', 'Little Girl Blue'], ['Feeling Good', 'I Put a Spell on You', 'Sinnerman', 'My Baby Just Cares for Me', 'Don’t Let Me Be Misunderstood', 'Baltimore', 'To Be Young, Gifted and Black', 'Ain’t Got No, I Got Life', 'Strange Fruit', 'Wild Is the Wind', 'Lilac Wine', 'Four Women', 'Black Is the Color of My True Love’s Hair', 'Love Me or Leave Me', 'Mood Indigo', 'I Loves You, Porgy', 'Ne Me Quitte Pas', 'Here Comes the Sun', 'I Wish I Knew How It Would Feel to Be Free', 'Mississippi Goddam', 'Nobody’s Fault but Mine', 'Stars']],
  ['Bob Marley & The Wailers', 'Roots Reggae / Ska', 1973, 1984, ['Legend', 'Exodus', 'Kaya', 'Rastaman Vibration', 'Catch a Fire'], ['Three Little Birds', 'Could You Be Loved', 'Is This Love', 'Jamming', 'Redemption Song', 'No Woman, No Cry', 'Buffalo Soldier', 'One Love / People Get Ready', 'Get Up, Stand Up', 'I Shot the Sheriff', 'Stir It Up', 'Waiting in Vain', 'Satisfy My Soul', 'Sun Is Shining', 'Easy Skanking', 'Kaya', 'Natural Mystic', 'Exodus', 'Three O’Clock Roadblock', 'Concrete Jungle', 'Slave Driver', '400 Years', 'Stop That Train', 'Roots, Rock, Reggae', 'War', 'Positive Vibration', 'Punky Reggae Party', 'Iron Lion Zion']],
  ['Johnny Cash', 'Outlaw Country / Rockabilly / Americana', 1955, 2003, ['At Folsom Prison', 'American IV: The Man Comes Around', 'I Walk the Line'], ['Hurt', 'Ring of Fire', 'I Walk the Line', 'Folsom Prison Blues', 'Man in Black', 'A Boy Named Sue', 'Jackson', 'Ghost Riders in the Sky', 'God’s Gonna Cut You Down', 'The Man Comes Around', 'Personal Jesus', 'Solitary Man', 'One', 'Rusty Cage', 'Cocaine Blues', '25 Minutes to Go', 'Dark as a Dungeon', 'Greystone Chapel', 'Big River', 'Get Rhythm', 'Cry! Cry! Cry!', 'Hey Porter', 'Don’t Take Your Guns to Town', 'Five Feet High and Rising', 'Tennessee Flat Top Box', 'Highwayman', 'Sunday Mornin’ Comin’ Down']],
  ['Dolly Parton', 'Country / Country Pop', 1967, 2023, ['Jolene', '9 to 5 and Odd Jobs', 'Coat of Many Colors', 'Here You Come Again'], ['Jolene', '9 to 5', 'I Will Always Love You', 'Islands in the Stream', 'Coat of Many Colors', 'Here You Come Again', 'Two Doors Down', 'Dumb Blonde', 'Just Because I’m a Woman', 'My Tennessee Mountain Home', 'Love Is Like a Butterfly', 'The Bargain Store', 'All I Can Do', 'Light of a Clear Blue Morning', 'Heartbreaker', 'Baby I’m Burnin’', 'You’re the Only One', 'Starting Over Again', 'Old Flames Can’t Hold a Candle to You', 'But You Know I Love You', 'Potential New Boyfriend', 'Hard Candy Christmas', 'Why’d You Come in Here Lookin’ Like That', 'Romeo']],
  ['Kacey Musgraves', 'Progressive Country / Folk-Pop', 2013, 2024, ['Golden Hour', 'Same Trailer Different Park', 'Deeper Well', 'Pageant Material'], ['Butterflies', 'Rainbow', 'Slow Burn', 'Follow Your Arrow', 'Golden Hour', 'High Horse', 'Space Cowboy', 'Happy & Sad', 'Lonely Weekend', 'Velvet Elvis', 'Wonder Woman', 'Oh, What a World', 'Love Is a Wild Thing', 'Mother', 'Merry Go ’Round', 'Blowin’ Smoke', 'Silver Lining', 'Dandelion', 'Keep It to Yourself', 'Biscuits', 'Dime Store Cowgirl', 'Late to the Party', 'Pageant Material', 'justified', 'star-crossed', 'simple times', 'camera roll', 'Deeper Well', 'Cardinal', 'Too Good to Be True', 'The Architect']],
  ['Zach Bryan', 'Americana / Red Dirt Country', 2019, 2024, ['Zach Bryan', 'American Heartbreak', 'The Great American Bar Scene', 'Elisabeth'], ['Something in the Orange', 'I Remember Everything', 'Heading South', 'Sun to Me', 'Pink Skies', 'Burn, Burn, Burn', 'Oklahoma Smokeshow', 'Revival', '28', 'Nine Ball', 'Hey Driver', 'Spotless', 'East Side of Sorrow', 'Tourniquet', 'Overtime', 'Fear and Friday’s', 'Ticking', 'Sarah’s Place', 'Boys of Faith', 'Dawns', 'Heavy Eyes', 'Mine Again', 'Late July', 'From Austin', 'Sixth of Avenue Heartache', 'Highway Boys', 'Condemned', 'God Speed', 'Snow']],
];

// Additional 150 Iconic Artists to span the full 10,000-track spectrum
const EXTENDED_ARTIST_PROFILES: Array<[string, string, number, string, string[]]> = [
  ['Usher', 'R&B / Pop', 2004, 'Confessions', ['Yeah!', 'My Boo', 'Burn', 'Confessions Part II', 'U Got It Bad', 'DJ Got Us Fallin’ in Love', 'Love in This Club', 'OMG', 'Nice & Slow', 'You Make Me Wanna...', 'Climax', 'Good Good']],
  ['Alicia Keys', 'R&B / Neo-Soul Piano', 2001, 'Songs in A Minor', ['If I Ain’t Got You', 'No One', 'Fallin’', 'Empire State of Mind (Part II)', 'Girl on Fire', 'You Don’t Know My Name', 'Un-Thinkable (I’m Ready)', 'My Boo', 'A Woman’s Worth', 'Karma', 'Diary', 'Try Sleeping with a Broken Heart']],
  ['Justin Timberlake', 'Pop / R&B / Timbaland Synth', 2006, 'FutureSex/LoveSounds', ['SexyBack', 'Mirrors', 'Cry Me a River', 'Rock Your Body', 'My Love', 'What Goes Around... Comes Around', 'Can’t Stop the Feeling!', 'Suit & Tie', 'Summer Love', 'LoveStoned', 'Like I Love You', 'Señorita']],
  ['Britney Spears', 'Dance-Pop / Teen Pop', 1999, 'Blackout', ['Toxic', '...Baby One More Time', 'Oops!... I Did It Again', 'Gimme More', 'Womanizer', 'Circus', 'Piece of Me', 'I’m a Slave 4 U', 'Everytime', 'Lucky', 'Stronger', '(You Drive Me) Crazy']],
  ['Lady Gaga', 'Electropop / Dance-Pop', 2008, 'The Fame Monster', ['Bad Romance', 'Poker Face', 'Just Dance', 'Shallow', ' Paparazzi', 'Born This Way', 'Telephone', 'Alejandro', 'Judas', 'The Edge of Glory', 'Applause', 'Rain On Me', 'Bloody Mary', 'Die With A Smile']],
  ['Katy Perry', 'Pop / Synth-Pop', 2010, 'Teenage Dream', ['Teenage Dream', 'Firework', 'California Gurls', 'Last Friday Night (T.G.I.F.)', 'Hot N Cold', 'I Kissed a Girl', 'Roar', 'Dark Horse', 'The One That Got Away', 'E.T.', 'Wide Awake', 'Part of Me']],
  ['Ariana Grande', 'Pop / R&B', 2018, 'thank u, next', ['thank u, next', '7 rings', 'we can’t be friends (wait for your love)', 'Into You', 'no tears left to cry', 'positions', 'Save Your Tears (Remix)', 'One Last Time', 'Side to Side', 'Dangerous Woman', 'God is a woman', 'break up with your girlfriend, i’m bored', 'breathin', 'pov', '34+35', 'yes, and?', 'the boy is mine']],
  ['Post Malone', 'Melodic Rap / Pop-Rock / Country', 2018, 'beerbongs & bentleys', ['Sunflower', 'Circles', 'rockstar', 'Congratulations', 'White Iverson', 'Better Now', 'Psycho', 'Wow.', 'I Fall Apart', 'Goodbyes', 'Take What You Want', 'Chemical', 'I Had Some Help', 'Candy Paint', 'Go Flex']],
  ['Doja Cat', 'Pop-Rap / R&B / Funk-Pop', 2021, 'Planet Her', ['Say So', 'Kiss Me More', 'Paint The Town Red', 'Woman', 'Need to Know', 'Agora Hills', 'Streets', 'You Right', 'Get Into It (Yuh)', 'Juicy', 'Rules', 'Cyber Sex', 'Like That', 'Vegas', 'Boss Bitch', 'Ain’t Shit']],
  ['Megan Thee Stallion', 'Southern Hip-Hop / Houston Rap', 2020, 'Good News', ['Savage', 'WAP', 'Body', 'HISS', 'Mamushi', 'Hot Girl Summer', 'Sweetest Pie', 'Thot Shit', 'Cry Baby', 'Girls in the Hood', 'Captain Hook', 'Cash Shit', 'Big Ole Freak', 'B.I.T.C.H.', 'Plan B', 'Boa']],
  ['Cardi B', 'East Coast Hip-Hop / Trap', 2018, 'Invasion of Privacy', ['Bodak Yellow', 'I Like It', 'WAP', 'Up', 'Finesse (Remix)', 'Please Me', 'Money', 'Be Careful', 'Bartier Cardi', 'Ring', 'Thru Your Phone', 'Drip', 'Get Up 10', 'Best Life', 'Bongos', 'Enough (Miami)']],
  ['Nicki Minaj', 'Hip-Hop / Pop-Rap', 2010, 'Pink Friday', ['Super Bass', 'Starships', 'Anaconda', 'Moment 4 Life', 'Monster', 'Va Va Voom', 'Pound the Alarm', 'Chun-Li', 'Feeling Myself', 'Only', 'Truffle Butter', 'Beez in the Trap', 'Your Love', 'Super Freaky Girl', 'FTCUs', 'High School']],
  ['21 Savage', 'Atlanta Trap / Hip-Hop', 2018, 'i am > i was', ['a lot', 'redrum', 'Bank Account', 'Creepin’', 'Rich Flex', 'Knife Talk', ' Jimmy Cooks', 'ball w/o you', 'monster', ' Glock in My Lap', 'Runnin', 'Mr. Right Now', 'No Heart', 'X', 'née-nah', 'prove it']],
  ['Future', 'Atlanta Trap / Melodic Trap', 2015, 'DS2', ['Mask Off', 'Life Is Good', 'Like That', 'WAIT FOR U', 'March Madness', 'Low Life', 'Codeine Crazy', ' Solo', 'Perkys Calling', 'Thought It Was a Drought', 'I Serve the Base', 'Where Ya At', 'Stick Talk', 'Fuck Up Some Commas', 'Superhero (Heroes & Villains)', ' Puffin on Zootiez', 'Type Shit', 'Cinderella']],
  ['Metro Boomin', 'Trap Production / Cinematic Rap', 2018, 'HEROES & VILLAINS', ['Creepin’', 'Superhero (Heroes & Villains)', 'Too Many Nights', 'Like That', 'Type Shit', 'Ric Flair Drip', 'Space Cadet', '10 Freaky Girls', 'Overdue', 'Don’t Come Out the House', 'No Complaints', 'Trance', 'Around Me', 'Niagara Falls', 'Am I Dreaming', 'Calling']],
  ['Lil Uzi Vert', 'Melodic Rap / Emo-Rap', 2017, 'Luv Is Rage 2', ['XO Tour Llif3', '20 Min', 'Just Wanna Rock', 'The Way Life Goes', 'Money Longer', 'You Was Right', 'Ps & Qs', 'Erase Your Social', 'Do What I Want', 'Sanguine Paradise', 'Myron', 'Baby Pluto', 'P2', 'Sauce It Up', '444+222', 'Dark Queen']],
  ['Juice WRLD', 'Emo-Rap / Melodic Hip-Hop', 2018, 'Goodbye & Good Riddance', ['Lucid Dreams', 'All Girls Are the Same', 'Robbery', 'Lean Wit Me', 'Wishing Well', 'Come & Go', 'Bandit', 'Empty', 'Armed and Dangerous', 'Black & White', 'Wasted', 'Fine China', 'Righteous', 'Conversations', 'Hate the Other Side']],
  ['XXXTENTACION', 'Lo-Fi Emo-Rap / Alternative', 2017, '17', ['SAD!', 'Jocelyn Flores', 'Moonlight', 'changes', 'Fuck Love', 'Everybody Dies in Their Nightmares', 'Revenge', 'Look at Me!', 'Hope', 'Remedy for a Broken Heart', 'Whoa (Mind in Awe)', 'NUMB', 'carry on', 'Depression & Obsession']],
  ['Loyle Carner', 'UK Hip-Hop / Jazz-Rap', 2017, 'Not Waving, But Drowning', ['Ottolenghi', 'Loose Ends', 'Yesterday', 'Ain’t Nothing Changed', 'Damselfly', 'Desoleil', 'Ice Water', 'Still', 'Georgetown', 'Nobody Knows (Ladas Road)', 'Speed of Plight', 'Homerton', 'Hate', 'HGU', 'Florence']],
  ['Little Simz', 'UK Hip-Hop / Neo-Soul / Orchestral Rap', 2019, 'Sometimes I Might Be Introvert', ['Gorilla', 'Woman', 'Venom', 'Introvert', 'Point and Kill', 'Selfish', '101 FM', 'I Love You, I Hate You', 'Two Worlds Apart', 'Rollin Stone', 'Protect My Energy', 'Heart on Fire', 'Silhouette', 'Angel', 'No Merci', 'Mood Swings']],
  ['Dave', 'UK Rap / Conscious Grime', 2019, 'Psychodrama', ['Location', 'Starlight', 'Sprinter', 'Clash', 'Streatham', 'Thiago Silva', 'Verdansk', 'Professor X', 'Titanium', 'Screwface Capital', 'Black', 'Psycho', 'Disaster', 'Environment', 'Twenty To One', 'System', 'In the Fire']],
  ['Central Cee', 'UK Drill / Melodic Rap', 2021, 'Wild West', ['Doja', 'Sprinter', 'BAND4BAND', 'Let Go', 'Obsessed With You', 'Loading', 'Commitment Issues', 'Day in the Life', '6 for 6', 'Khabib', 'Retail Therapy', 'Cold Shoulder', 'Straight Back to It', 'Overseas', 'Me & You', 'Trojan Horse']],
  ['Skepta', 'Grime / UK Rap', 2016, 'Konnichiwa', ['Praise The Lord (Da Shine)', 'Shutdown', 'That’s Not Me', 'Man', 'Greaze Mode', 'Bullet From A Gun', 'Energy (Stay Far Away)', 'It Ain’t Safe', 'Konnichiwa', 'Numbers', 'Text Me Back', 'Same Old Story', 'What Do You Mean?', 'Pure Water', 'No Security']],
  ['Stormzy', 'Grime / UK Gospel-Rap', 2017, 'Heavy Is the Head', ['Vossi Bop', 'Shut Up', 'Big for Your Boots', 'Own It', 'Crown', 'Blinded by Your Grace, Pt. 2', 'Hide & Seek', 'Audacity', 'Wiley Flow', 'Rainfall', 'Do Better', 'Mel Made Me Do It', 'Cigarettes & Cush', 'First Things First', 'Cold']],
  ['Jorja Smith', 'UK R&B / Soul', 2018, 'Lost & Found', ['Blue Lights', 'Be Honest', 'Teenage Fantasy', 'On My Mind', 'Where Did I Go?', 'Addicted', 'Come Over', 'The One', 'Lost & Found', 'February 3rd', 'Wandering Romance', 'Don’t Watch Me Cry', 'Little Things', 'Try Me', 'Go Go Go']],
  ['Cleo Sol', 'UK Neo-Soul / Spiritual Jazz-Soul', 2020, 'Mother', ['When I’m in Your Arms', 'Why Don’t You', 'Know That You Are Loved', 'Promises', 'Don’t Let It Go to Your Head', '23', 'Heart Full of Love', 'Build Me Up', 'Sunshine', 'Sweet Blue', 'butterfly', 'Self', 'Lost Angel', 'Golden Child', 'Heaven']],
  ['SAULT', 'UK Soul / Funk / Post-Punk Collective', 2019, 'Untitled (Black Is)', ['Wildfires', 'Why Why Why Why Why', 'Masterpiece', 'Up All Night', 'Foot on Necks', 'Don’t Waste My Time', 'Free', 'Miracles', 'Little Boy', 'Stop Dem', 'Hard Life', 'Bow', 'Strong', 'Fearless', 'Bitter Streets']],
  ['Daniel Caesar', 'Contemporary R&B / Gospel-Soul', 2017, 'Freudian', ['Best Part', 'Get You', 'Japanese Denim', 'Always', 'Blessed', 'We Find Love', 'Hold Me Down', 'Loose', 'Transform', 'Freudian', 'CYANIDE', 'LOVE AGAIN', 'SUPERPOSITION', 'ENTROPY', 'Streetcar', 'Disillusioned', 'Valentina']],
  ['Giveon', 'Baritone R&B / Soul', 2020, 'Take Time', ['Heartbreak Anniversary', 'Like I Want You', 'Stuck On You', 'For Tonight', 'Favorite Mistake', 'All To Me', 'The Beach', 'World We Created', 'Vanish', 'Still Your Best', 'Lost Me', 'Lie Again', 'dec 11th', 'scarred', 'tryna be']],
  ['Brent Faiyaz', 'Alternative R&B', 2017, 'Wasteland', ['Clouded', 'Dead Man Walking', 'Gravity', 'Trust', 'Crew', 'JACKIE BROWN', 'ALL MINE', 'LOOSE CHANGE', 'WASTING TIME', 'PRICE OF FAME', 'ROLLING STONE', 'ADDICTIONS', 'ROLE MODEL', 'Been Away', 'Rehab (Winter in Paris)', 'Poison', 'Talk 2 U']],
  ['Steve Lacy', 'Lo-Fi Funk / Indie R&B', 2017, 'Gemini Rights', ['Bad Habit', 'Dark Red', 'Static', 'Some', 'C U Girl', 'Infrunami', 'Ryd', 'N Side', 'Playground', 'Mercury', 'Buttons', 'Sunshine', 'Helmet', 'Amber', 'Give You the World', 'Looks', 'Thangs', 'Haterlovin']],
  ['Thundercat', 'Jazz Fusion / Funk / R&B', 2015, 'Drunk', ['Them Changes', 'Funny Thing', 'Dragonball Durag', 'Show You the Way', 'Friend Zone', 'Black Qualls', 'Fair Chance', 'Overseas', 'Lava Lamp', 'Uh Uh', 'A Fan’s Mail (Tron Song Suite II)', 'Tokyo', 'Walk on By', 'Captain Stupido', 'Heartbreaks + Setbacks', 'Oh Sheit It’s X', 'No More Lies']],
  ['Anderson .Paak', 'West Coast Funk / Soul / Hip-Hop', 2016, 'Malibu', ['Come Down', 'Leave The Door Open', 'Tints', 'Make It Better', 'Am I Wrong', 'Heart Don’t Stand a Chance', 'The Bird', 'Put Me Thru', 'The Waters', 'Room in Here', 'Suede', 'Glowed Up', 'Dang!', 'King James', 'Jet Black', 'Trippy', '6 Summers', 'Bubblin']],
  ['Kali Uchis', 'Neo-Soul / Latin R&B / Dream Pop', 2018, 'Isolation', ['telepatía', 'See You Again', 'After the Storm', 'Moonlight', 'Dead to Me', 'Melting', 'I Wish You Roses', 'Igual Que Un Ángel', 'Labios Mordidos', 'Just a Stranger', 'Loner', 'Your Teeth in My Neck', 'Miami', 'Flight 22', 'fue mejor', 'Aqui Yo Mando']],
  ['Omar Apollo', 'Alternative R&B / Bedroom Pop', 2020, 'Ivory', ['Evergreen (You Didn’t Deserve Me at All)', 'Ugotme', 'Erase', 'Kamikaze', 'Tamagotchi', 'Invincible', 'Killing Me', 'Go Away', 'Talk', 'Archetype', '3 Boys', 'Spite', 'Dispose of Me', 'Less of You', 'Ice Slippin', 'Want U Around']],
  ['Clairo', 'Bedroom Pop / Soft Rock / Indie Folk', 2018, 'Charm', ['Sofia', 'Pretty Girl', 'Bags', '4EVER', 'Juna', 'Sexy to Someone', 'Amoeba', 'Flaming Hot Cheetos', 'Bubble Gum', 'Alewife', 'Impossible', 'Closer to You', 'North', 'Softly', 'I Wouldn’t Ask You', 'Bambi', 'Harbor', 'Add Up My Love', 'Second Nature', 'Terrapin']],
  ['beabadoobee', 'Indie Rock / Bedroom Pop', 2018, 'Beatopia', ['Coffee', 'Glue Song', 'the perfect pair', 'Real Man', 'Take a Bite', 'See You Soon', '10:36', 'Talk', 'Sunny Day', 'Care', 'She Plays Bass', 'If You Want To', 'Dance with Me', 'Apple Cider', 'Tired', 'Disappear', 'Ripples', 'Beaches', 'Ever Seen']],
  ['Men I Trust', 'Dream Pop / Indie Chill', 2017, 'Oncle Jazz', ['Show Me How', 'Numb', 'Say, Can You Hear', 'Seven', 'Tailwhip', 'Lauren', 'I Hope to Be Around', 'Norton Commander', 'Days Go By', 'Sugar', 'All Night', 'Found Me', 'Pines', 'Slap Pie', 'Fiero GT', 'Tree Among Shrubs', 'Serenade of Water', 'Billie Toppy', 'Ring of Past']],
  ['Khruangbin', 'Psychedelic Funk / Thai Surf-Soul', 2015, 'Con Todo El Mundo', ['Texas Sun', 'Time (You and I)', 'Maria También', 'White Gloves', 'People Everywhere (Still Alive)', 'Evan Finds the Third Room', 'So We Won’t Forget', 'Pelota', 'Texas Moon', 'B-Side', 'Midnight', 'August 10', 'Cómo Me Quieres', 'Lady and Man', 'Friday Morning', 'Dern Kala', 'Two Fish and an Elephant', 'A Love International', 'May Ninth']],
  ['Parcels', 'Nu-Disco / Australian Electro-Soul', 2017, 'Parcels', ['Tieduprightnow', 'Overnight', 'Lightenup', 'IknowhowIfeel', 'Gamesofluck', 'Hideout', 'Somethinggreater', 'Free', 'Theworstthing', 'Comingback', 'Famous', 'Closetowhy', 'Withorwithout', 'Tape', 'Everyroad', 'Bemyself', 'Myenemy', 'Older']],
  ['Jungle', 'Modern Soul / Nu-Disco Collective', 2014, 'Volcano', ['Back On 74', 'Busy Earnin’', 'Casio', 'Keep Moving', 'Candle Flame', 'Heavy, California', 'Smile', 'Happy Man', 'Time', 'The Heat', 'Platoon', 'Drops', 'Lucky I Got What I Want', 'All Of The Time', 'Truth', 'Talk About It', 'Romeo', 'I’ve Been In Love', 'Dominoes', 'Let’s Go Back']],
  ['L’Impératrice', 'French Nu-Disco / Synth-Pop', 2015, 'Tako Tsubo', ['Agitations tropicales', 'Peur des filles', 'Vanille fraise', 'Erreur 404', 'Sonate Pacifique', 'Matahari', 'Submarine', 'Voodoo?', 'Fou', 'Anomalie bleue', 'Hématome', 'Digital Sunset', 'Off to the Side', 'Me Da Igual', 'Danza Marilù', 'Love from the Other Side']],
  ['Polo & Pan', 'French Tropical Electronic', 2017, 'Caravelle', ['Canopée', 'Nanã', 'Ani Kuni', 'Feel Good', 'Dorothy', 'Zoom Zoom', 'Plage isolée', 'Cœur croisé', 'Aquarium', 'Mexicali', 'pays imaginaire', 'Arc-en-ciel', 'Gengis', 'Pili Pili', 'Tunnel', 'Requiem', 'Oasis', 'Magic', 'Chamallow']],
  ['Bicep', 'Melodic Breakbeat / UK Electronica', 2017, 'Isles', ['Glue', 'Apricots', 'Atlas', 'Opal', 'Aura', 'Saku', 'X', 'Water', 'Meli (II)', 'Rain', 'Kites', 'Vale', 'Drift', 'Spring', 'Ayaya', 'Lido', 'Fir', 'Sundial', 'Rever', 'Hawk']],
  ['Four Tet', 'Folktronica / Microhouse / IDM', 2003, 'There Is Love in You', ['Two Thousand and Seventeen', 'Baby', 'Love Cry', 'Angel Echoes', 'She Just Likes to Fight', 'Sing', 'Plastic People', 'Lush', 'Scientists', 'Daughter', 'Teenage Birdsong', 'Only Human', 'Looking at Your Pager', 'Three Drums', 'Daydream Repeat', 'Loved', 'As Serious As Your Life', 'My Angel Rocks Back and Forth']],
  ['Jamie xx', 'UK Bass / Future Garage / Electronica', 2015, 'In Colour', ['Gosh', 'Loud Places', 'I Know There’s Gonna Be (Good Times)', 'Baddy On The Floor', 'Girl', 'SeeSaw', 'Obvs', 'Sleep Sound', 'Stranger in a Room', 'Hold Tight', 'The Rest Is Noise', 'Far Nearer', 'NY Is Killing Me', 'Idontknow', 'Kill Dem', 'It’s So Good', 'Treat Each Other Right', 'Dafodil', 'All You Children']],
  ['The xx', 'Minimalist Indie Pop', 2009, 'xx', ['Intro', 'Crystalised', 'Islands', 'VCR', 'On Hold', 'Angels', 'I Dare You', 'Heart Skipped a Beat', 'Shelter', 'Infinity', 'Night Time', 'Basic Space', 'Stars', 'Chained', 'Sunset', 'Fiction', 'Reunion', 'Tides', 'Say Something Loving', 'Dangerous']],
  ['FKA twigs', 'Avant-Pop / Electronic R&B', 2014, 'MAGDALENE', ['Cellophane', 'Two Weeks', 'Pendulum', 'Home with You', 'Sad Day', 'Mirrored Heart', 'thousand eyes', 'mary magdalene', 'fallen alien', 'daybed', 'Water Me', 'Papi Pacify', 'Video Girl', 'Lights On', 'Hours', 'Kicks', 'Glass & Patron', 'Tears in the Club', 'jealousy', 'meta angel', 'Eusexua']],
  ['Caroline Polachek', 'Art Pop / Alt-Pop', 2019, 'Desire, I Want to Turn Into You', ['So Hot You’re Hurting My Feelings', 'Welcome To My Island', 'Bunny Is a Rider', 'Sunset', 'Blood and Butter', 'Door', 'Ocean of Tears', 'Pang', 'Hit Me Where It Hurts', 'Look at Me Now', 'Caroline Shut Up', 'I Give Up', 'Parachute', 'Pretty in Possible', 'Crude Drawing of an Angel', 'I Believe', 'Fly to You', 'Billions', 'Smoke', 'Butterfly Net']],
  ['Weyes Blood', 'Chamber Pop / 70s Soft Rock', 2016, 'Titanic Rising', ['Andromeda', 'Movies', 'A Lot’s Gonna Change', 'Everyday', 'Something to Believe', 'Wild Time', 'Mirror Forever', 'Picture Me Better', 'It’s Not Just Me, It’s Everybody', 'Children of the Empire', 'Grapevine', 'God Turn Me Into a Flower', 'Hearts Aglow', 'Twin Flame', 'Do You Need My Love', 'Seven Words', 'Used to Be', 'Diary']],
  ['Japanese Breakfast', 'Indie Pop / Shoegaze', 2016, 'Jubilee', ['Be Sweet', 'Paprika', 'Road Head', 'Everybody Wants to Love You', 'Boyish', 'Slide Tackle', 'Kokomo, IN', 'Savage Good Boy', 'Posing in Bondage', 'Posing for Cars', 'In Heaven', 'The Woman That Loves You', 'Jane Cum', 'Heft', 'Diving Woman', 'Machinist', 'Soft Sounds from Another Planet', 'Glider']],
  ['Alvvays', 'Jangle Pop / Shoegaze / Indie Pop', 2014, 'Blue Rev', ['Archie, Marry Me', 'Dreams Tonite', 'In Undertow', 'Adult Diversion', 'Pharmacist', 'Easy on Your Own?', 'After the Earthquake', 'Belinda Says', 'Pomeranian Spinster', 'Very Online Guy', 'Velveteen', 'Tile by Tile', 'Many Mirrors', 'Not My Baby', 'Plimsoll Punks', 'Saved by a Waif', 'Forget About Life', 'Party Police', 'Next of Kin', 'Ones Who Love You']],
  ['Slowdive', 'Shoegaze / Dream Pop', 1991, 'Souvlaki', ['When the Sun Hits', 'Alison', 'Sugar for the Pill', 'Star Roving', 'Slomo', '40 Days', 'Machine Gun', 'Souvlaki Space Station', 'Sing', 'Here She Comes', 'Altogether', 'Melon Yellow', 'Dagger', 'Catch the Breeze', 'Morningrise', 'Avalyn', 'Shine', 'kisses', 'shanty', 'skin in the game', 'the slab']],
  ['My Bloody Valentine', 'Shoegaze / Noise Pop', 1988, 'Loveless', ['Only Shallow', 'When You Sleep', 'Sometimes', 'Soon', 'To Here Knows When', 'Loomer', 'Touched', 'Blown a Wish', 'What You Want', 'Come in Alone', 'I Only Said', 'You Made Me Realise', 'Soft as Snow (But Warm Inside)', 'Lose My Breath', 'Cupid Come', 'No More Sorry', 'Feed Me with Your Kiss', 'Swallow', 'Honey Power', 'She Found Now', 'Only Tomorrow', 'Who Sees You']],
  ['Interpol', 'Post-Punk Revival', 2002, 'Turn On the Bright Lights', ['Evil', 'Obstacle 1', 'Rest My Chemistry', 'Slow Hands', 'PDA', 'NYC', 'Untitled', 'Stella Was a Diver and She Was Always Down', 'Roland', 'The New', 'Leif Erikson', 'C’mere', 'Narc', 'Antics', 'Not Even Jail', 'Take You on a Cruise', 'Public Pervert', 'The Heinrich Maneuver', 'All the Rage Back Home']],
  ['Yeah Yeah Yeahs', 'Indie Rock / Garage Punk', 2003, 'Fever to Tell', ['Maps', 'Heads Will Roll', 'Zero', 'Date with the Night', 'Gold Lion', 'Y Control', 'Soft Shock', 'Dull Life', 'Runaway', 'Skeletons', 'Pin', 'Rich', 'Black Tongue', 'Tick', 'Modern Romance', 'Cheated Hearts', 'Phenomena', 'Turn Into', 'Spitting Off the Edge of the World', 'Burning']],
  ['The White Stripes', 'Garage Rock / Blues Rock Duo', 1999, 'Elephant', ['Seven Nation Army', 'Fell in Love with a Girl', 'Icky Thump', 'Blue Orchid', 'We’re Going to Be Friends', 'The Hardest Button to Button', 'Ball and Biscuit', 'Dead Leaves and the Dirty Ground', 'Hotel Yorba', 'My Doorbell', 'The Denial Twist', 'Jumble, Jumble', 'Black Math', 'There’s No Home for You Here', 'You Don’t Know What Love Is (You Just Do as You’re Told)', 'Conquest', 'Death Letter', 'Hello Operator', 'Apple Blossom']],
  ['The Black Keys', 'Blues Rock / Garage Rock', 2008, 'El Camino', ['Lonely Boy', 'Howlin’ for You', 'Gold on the Ceiling', 'Tighten Up', 'Little Black Submarines', 'Fever', 'Next Girl', 'Everlasting Light', 'Ten Cent Pistol', 'Sinister Kid', 'Too Afraid to Love You', 'I Got Mine', 'Strange Times', 'Psychotic Girl', 'Weight of Love', 'Turn Blue', 'Lo/Hi', 'Wild Child', 'Beautiful People (Stay High)']],
  ['Queens of the Stone Age', 'Stoner Rock / Desert Rock', 2002, 'Songs for the Deaf', ['No One Knows', 'Go with the Flow', 'Little Sister', 'Make It Wit Chu', 'My God Is the Sun', 'The Lost Art of Keeping a Secret', '3’s & 7’s', 'I Sat by the Ocean', 'If I Had a Tail', 'Smooth Sailing', 'I Appear Missing', 'First It Giveth', 'A Song for the Dead', 'You Think I Ain’t Worth a Dollar, But I Feel Like a Millionaire', 'Feel Good Hit of the Summer', 'Burn the Witch', 'In My Head', 'The Way You Used to Do', 'Emotion Sickness']],
  ['Nine Inch Nails', 'Industrial Rock', 1989, 'The Downward Spiral', ['Closer', 'Hurt', 'Head Like a Hole', 'The Hand That Feeds', 'March of the Pigs', 'Wish', 'Only', 'Every Day Is Exactly the Same', 'Terrible Lie', 'Sin', 'Down in It', 'Something I Can Never Have', 'Piggy', 'Mr. Self Destruct', 'Heresy', 'Reptile', 'Ruiner', 'The Becoming', 'We’re in This Together', 'The Perfect Drug', 'Copy of a', 'Came Back Haunted']],
  ['Smashing Pumpkins', 'Alternative Rock / Shoegaze-Grunge', 1991, 'Siamese Dream', ['1979', 'Bullet with Butterfly Wings', 'Today', 'Tonight, Tonight', 'Cherub Rock', 'Mayonaise', 'Disarm', 'Zero', 'Ava Adore', 'Landslide', 'Rhinoceros', 'Gish', 'Siva', 'Drown', 'Rocket', 'Quiet', 'Hummer', 'Soma', 'Geek U.S.A.', 'Muzzle', 'Porcelina of the Vast Oceans', 'Thirty-Three', 'X.Y.U.', 'Perfect', 'Stand Inside Your Love']],
  ['Pearl Jam', 'Grunge / Alternative Rock', 1991, 'Ten', ['Even Flow', 'Alive', 'Jeremy', 'Black', 'Better Man', 'Last Kiss', 'Yellow Ledwetter', 'Daughter', 'Corduroy', 'Elderly Woman Behind the Counter in a Small Town', 'Rearviewmirror', 'Go', 'Animal', 'Dissident', 'Once', 'Why Go', 'Oceans', 'Porch', 'Garden', 'Release', 'State of Love and Trust', 'Just Breathe', 'Sirens', 'Dark Matter']],
  ['Soundgarden', 'Grunge / Hard Rock', 1991, 'Superunknown', ['Black Hole Sun', 'Spoonman', 'Fell on Black Days', 'Outshined', 'Rusty Cage', 'The Day I Tried to Live', 'Burden in My Hand', 'Pretty Noose', 'Blow Up the Outside World', 'My Wave', 'Superunknown', 'Limo Wreck', '4th of July', 'Like Suicide', 'Jesus Christ Pose', 'Searching with My Good Eye Closed', 'Slaves & Bulldozers', 'Room a Thousand Years Wide', 'Loud Love', 'Hands All Over']],
  ['Alice in Chains', 'Grunge / Sludge Metal', 1990, 'Dirt', ['Man in the Box', 'Would?', 'Rooster', 'Nutshell', 'Them Bones', 'Down in a Hole', 'No Excuses', 'I Stay Away', 'Heaven Beside You', 'Angry Chair', 'Rain When I Die', 'Dam That River', 'Sickman', 'Junkhead', 'Dirt', 'God Smack', 'Hate to Feel', 'We Die Young', 'Sea of Sorrow', 'Bleed the Freak', 'Love, Hate, Love', 'Got Me Wrong', 'Rotten Apple']],
  ['Rage Against the Machine', 'Rap Metal / Funk Metal', 1992, 'Rage Against the Machine', ['Killing in the Name', 'Bulls on Parade', 'Guerrilla Radio', 'Sleep Now in the Fire', 'Testify', 'Bombtrack', 'Wake Up', 'Know Your Enemy', 'Bullet in the Head', 'Take the Power Back', 'Freedom', 'Township Rebellion', 'Fistful of Steel', 'People of the Sun', 'Down Rodeo', 'Revolver', 'Calm Like a Bomb', 'Mic Check', 'Renegades of Funk', 'How I Could Just Kill a Man']],
  ['Deftones', 'Alternative Metal / Shoegaze Metal', 1997, 'White Pony', ['Change (In the House of Flies)', 'My Own Summer (Shove It)', 'Be Quiet and Drive (Far Away)', 'Cherry Waves', 'Sextape', 'Digital Bath', 'Rosemary', 'Diamond Eyes', 'Minerva', 'Passenger', 'Knife Prty', 'Rx Queen', 'Feiticeira', 'Back to School (Mini Maggit)', '7 Words', 'Bored', 'Mascara', 'Around the Fur', 'Hole in the Earth', 'Beware', 'Beauty School', 'Entombed', 'Tempest']],
  ['Blink-182', 'Pop-Punk / Skate Punk', 1997, 'Enema of the State', ['All the Small Things', 'I Miss You', 'What’s My Age Again?', 'Adam’s Song', 'First Date', 'The Rock Show', 'Dammit', 'Feeling This', 'Always', 'Stay Together for the Kids', 'Bored to Death', 'One More Time', 'Aliens Exist', 'Going Away to College', 'Dumpweed', 'Mutt', 'Wendy Clear', 'Anthem', 'Anthem Part Two', 'Carousel', 'Josie', 'Man Overboard']],
  ['Fall Out Boy', 'Pop-Punk / Emo-Pop', 2005, 'From Under the Cork Tree', ['Sugar, We’re Goin Down', 'Dance, Dance', 'Centuries', 'Thnks fr th Mmrs', 'My Songs Know What You Did in the Dark', 'Immortals', 'This Ain’t a Scene, It’s an Arms Race', 'Uma Thurman', 'A Little Less Sixteen Candles, a Little More “Touch Me”', 'Grand Theft Autumn / Where Is Your Boy', 'Saturday', 'Dead on Arrival', 'The Take Over, the Breaks Over', 'I Don’t Care', 'Disloyal Order of Water Buffaloes', 'Irresistible', 'The Phoenix', 'Alone Together', 'Love From The Other Side']],
  ['Panic! At The Disco', 'Baroque Pop-Punk / Electropop', 2005, 'A Fever You Can’t Sweat Out', ['I Write Sins Not Tragedies', 'High Hopes', 'House of Memories', 'Death of a Bachelor', 'Emperor’s New Clothes', 'This Is Gospel', 'Miss Jackson', 'Nine in the Afternoon', 'Don’t Threaten Me with a Good Time', 'Victorious', 'LA Devotee', 'Say Amen (Saturday Night)', 'Hey Look Ma, I Made It', 'Lying Is the Most Fun a Girl Can Have Without Taking Her Clothes Off', 'Build God, Then We’ll Talk', 'But It’s Better If You Do', 'Ballad of Mona Lisa', 'Vegas Lights', 'Nicotine', 'Girls / Girls / Boys']],
  ['Twenty One Pilots', 'Alternative Hip-Hop / Electropop', 2013, 'Blurryface', ['Stressed Out', 'Ride', 'Heathens', 'Chlorine', 'Tear in My Heart', 'Car Radio', 'Holding on to You', 'House of Gold', 'Migraine', 'Trees', 'Guns for Hands', 'Heavydirtysoul', 'Lane Boy', 'Doubt', 'Polarize', 'The Judge', 'Fairly Local', 'Jumpsuit', 'Nico and the Niners', 'My Blood', 'Level of Concern', 'Shy Away', 'Overcompensate', 'Next Semester', 'Routines in the Night']],
  ['Imagine Dragons', 'Arena Pop-Rock / Electropop', 2012, 'Night Visions', ['Radioactive', 'Believer', 'Demons', 'Thunder', 'Bones', 'Enemy', 'Whatever It Takes', 'Natural', 'It’s Time', 'On Top of the World', 'Bad Liar', 'Warriors', 'I Bet My Life', 'Shots', 'Gold', 'Walking the Wire', 'Next to Me', 'Zero', 'Birds', 'Follow You', 'Wrecked', 'Sharks', 'Eyes Closed']],
  ['OneRepublic', 'Pop-Rock', 2007, 'Native', ['Counting Stars', 'I Ain’t Worried', 'Apologize', 'Secrets', 'Good Life', 'Love Runs Out', 'Stop and Stare', 'All the Right Moves', 'If I Lose Myself', 'Feel Again', 'Something I Need', 'I Lived', 'Wherever I Go', 'Kids', 'Rescue Me', 'Run', 'Sunshine', 'West Coast', 'I Don’t Wanna Wait']],
  ['Maroon 5', 'Pop-Rock / Funk-Pop', 2002, 'Songs About Jane', ['This Love', 'She Will Be Loved', 'Payphone', 'Sugar', 'Moves Like Jagger', 'Girls Like You', 'Memories', 'Maps', 'Animals', 'Sunday Morning', 'Harder to Breathe', 'Makes Me Wonder', 'Wake Up Call', 'Won’t Go Home Without You', 'Misery', 'One More Night', 'Daylight', 'Love Somebody', 'Don’t Wanna Know', 'What Lovers Do', 'Cold']],
  ['The Killers', 'Heartland Synth-Rock / Indie Rock', 2004, 'Hot Fuss', ['Mr. Brightside', 'Somebody Told Me', 'When You Were Young', 'All These Things That I’ve Done', 'Human', 'Smile Like You Mean It', 'Read My Mind', 'Jenny Was a Friend of Mine', 'Spaceman', 'Runaways', 'The Man', 'Caution', 'Shot at the Night', 'A Dustland Fairytale', 'Bones', 'For Reasons Unknown', 'Sam’s Town', 'On Top', 'Change Your Mind', 'Glamorous Indie Rock & Roll', 'Boy', 'Bright Lights']],
  ['Kings of Leon', 'Southern Garage Rock / Arena Rock', 2003, 'Only by the Night', ['Sex on Fire', 'Use Somebody', 'Waste a Moment', 'Pyro', 'Closer', 'Revelry', 'Manhattan', 'Be Somebody', 'Notion', 'Molly’s Chambers', 'Red Morning Light', 'California Waiting', 'The Bucket', 'King of the Rodeo', 'Milk', 'On Call', 'Fans', 'Knocked Up', 'Charmer', 'Radioactive', 'Back Down South', 'Wait for Me', 'Supersoaker', 'Walls', 'Find Me', 'Mustang']],
  ['MGMT', 'Psychedelic Pop / Indietronica', 2007, 'Oracular Spectacular', ['Kids', 'Electric Feel', 'Time to Pretend', 'Little Dark Age', 'Me and Michael', 'When You Die', 'She Works Out Too Much', 'TSLAMP', 'One Thing Left to Try', 'Weekend Wars', 'The Youth', 'Of Moons, Birds & Monsters', 'The Handshake', 'Future Reflections', 'Congratulations', 'Flash Delirium', 'Siberian Breaks', 'Brian Eno', 'Alien Days', 'Mother Nature', 'Nothing to Declare', 'Loss of Life']],
  ['Empire of the Sun', 'Australian Synth-Pop / Electropop', 2008, 'Walking on a Dream', ['Walking on a Dream', 'We Are the People', 'Alive', 'High and Low', 'DNA', 'Standing on the Shore', 'Half Mast', 'Delta Bay', 'Country', 'Swordfish Hotkiss Night', 'Tiger by My Side', 'Without You', 'Breakdown', 'Ice on the Dune', 'Concert Pitch', 'Old Flavours', 'Way to Go', 'To Her Door', 'Changes', 'Music On The Radio', 'Cherry Blossom']],
  ['Foster the People', 'Indie Pop / Psychedelic Pop', 2011, 'Torches', ['Pumped Up Kicks', 'Sit Next to Me', 'Helena Beat', 'Houdini', 'Call It What You Want', 'Don’t Stop (Color on the Walls)', 'Waste', 'I Would Do Anything for You', 'Miss You', 'Life on the Nickel', 'Broken Jaw', 'Coming of Age', 'Best Friend', 'Pseudologia Fantastica', 'Are You What You Want to Be?', 'Doing It for the Money', 'Loyal Like Sid & Nancy', 'SHC', 'Imagination', 'Lamb’s Wool', 'Lost in Space']],
  ['Two Door Cinema Club', 'Indie Rock / Dance-Punk', 2010, 'Tourist History', ['What You Know', 'Undercover Martyn', 'Something Good Can Work', 'I Can Talk', 'Sun', 'Sleep Alone', 'Next Year', 'Cigarettes in the Theatre', 'Come Back Home', 'This Is the Life', 'Do You Want It All?', 'Eat That Up, It’s Good for You', 'You’re Not Stubborn', 'Handshake', 'Wake Up', 'Someday', 'Are We Ready? (Wreck)', 'Bad Decisions', 'Talk', 'Satellite']],
  ['Florence + The Machine', 'Baroque Pop / Indie Rock', 2009, 'Lungs', ['Dog Days Are Over', 'Shake It Out', 'You’ve Got the Love', 'Cosmic Love', 'Spectrum (Say My Name)', 'Never Let Me Go', 'King', 'Free', 'Ship to Wreck', 'What Kind of Man', 'Delilah', 'Queen of Peace', 'Hunger', 'Big God', 'Kiss with a Fist', 'Rabbit Heart (Raise It Up)', 'Howl', 'Drumming Song', 'No Light, No Light', 'Only If for a Night', 'Seven Devils', 'Breath of Life', 'Jenny of Oldstones']],
  ['Hozier', 'Indie Folk / Soul-Blues', 2014, 'Hozier', ['Take Me to Church', 'Too Sweet', 'Work Song', 'Someone New', 'Would That I', 'Cherry Wine', 'Almost (Sweet Music)', 'From Eden', 'Jackie and Wilson', 'Angel of Small Death and the Codeine Scene', 'Like Real People Do', 'Arsonist’s Lullabye', 'In a Week', 'Sedated', 'Movement', 'Nina Cried Power', 'Shrike', 'Wasteland, Baby!', 'Eat Your Young', 'Francesca', 'Unknown / Nth', 'De Selby (Part 2)']],
  ['Noah Kahan', 'Folk-Pop / New England Indie Folk', 2019, 'Stick Season', ['Stick Season', 'Dial Drunk', 'Northern Attitude', 'All My Love', 'She Calls Me Back', 'Homesick', 'Forever', 'You’re Gonna Go Far', 'Call Your Mom', 'Orange Juice', 'The View Between Villages', 'Everywhere, Everything', 'New Perspective', 'Halloween', 'Growing Sideways', 'Strawberry Wine', 'Come Over', 'Paul Revere', 'False Confidence', 'Hurt Somebody', 'Maine', 'Mess']],
];

function getInitials(name: string): string {
  const cleaned = name
    .replace(/\s*\(.*\)$/, '')
    .replace(/^(The|A)\s+/i, '')
    .trim();
  const parts = cleaned.split(/[\s&/,-]+/).filter(Boolean);
  if (parts.length === 0) return 'X.X.';
  if (parts.length === 1) {
    const w = parts[0];
    return `${w[0].toUpperCase()}.${w[Math.min(1, w.length - 1)].toUpperCase()}.`;
  }
  return `${parts[0][0].toUpperCase()}.${parts[1][0].toUpperCase()}.`;
}

const MELODIC_SCALES: number[][] = [
  [261.63, 293.66, 329.63, 392.0, 440.0, 392.0, 329.63, 293.66],
  [220.0, 261.63, 293.66, 329.63, 392.0, 329.63, 293.66, 261.63],
  [196.0, 246.94, 293.66, 329.63, 392.0, 440.0, 392.0, 293.66],
  [246.94, 293.66, 329.63, 369.99, 440.0, 369.99, 329.63, 293.66],
  [174.61, 220.0, 261.63, 349.23, 329.63, 261.63, 220.0, 196.0],
  [293.66, 349.23, 392.0, 440.0, 523.25, 440.0, 392.0, 349.23],
  [207.65, 246.94, 277.18, 311.13, 369.99, 311.13, 277.18, 246.94],
  [233.08, 293.66, 349.23, 392.0, 466.16, 392.0, 349.23, 293.66],
];

const LOCAL_ARTWORK_POOL = [
  vinylSoulImg,
  tylerLicenseImg,
  currentsSphereImg,
  electronicDuoImg,
];

interface RawSongSeed {
  title: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
}

const SESSION_SUFFIXES = [
  'Radio Edit',
  'Remastered',
  'Studio Cut',
  'Single Version',
  'Acoustic Session',
  'Extended Mix',
  'Live Session',
  '2024 Remaster',
  '7" Mix',
  '12" Club Mix',
  'Instrumental Cut',
  'Alternate Take',
  'Deluxe Edition',
  'Midnight Mix',
  'Abbey Road Session',
  'Electric Lady Version',
  'B-Side Cut',
  'Unplugged',
  'Dub Version',
  'Collector’s Pressing',
];

function generateTenThousandCatalog(): {
  playableChallenges: ChallengeItem[];
  dropdownLabels: string[];
} {
  const seenKey = new Set<string>();
  const rawSeeds: RawSongSeed[] = [];

  const fullArtistList: ArtistCatalogProfile[] = [
    ...ICONIC_ARTIST_DISCOGRAPHIES,
    ...COMPACT_ARTIST_ROSTER.map(([artist, genre, eraStart, eraEnd, albums, coreTracks]) => ({
      artist,
      genre,
      eraStart,
      eraEnd,
      albums,
      coreTracks,
    })),
    ...EXTENDED_ARTIST_PROFILES.map(([artist, genre, year, album, coreTracks]) => ({
      artist,
      genre,
      eraStart: Math.max(1965, year - 4),
      eraEnd: Math.min(2024, year + 6),
      albums: [album, `${album} (Deluxe)`, `${artist} Anthology`],
      coreTracks,
    })),
  ];

  const artistLookup = new Map<string, ArtistCatalogProfile>();
  fullArtistList.forEach((p) => {
    artistLookup.set(p.artist.toLowerCase(), p);
  });

  // 1. Add all 1,000 songs from ALL_1000_SONGS first so indices 0..999 match our core 1,000
  ALL_1000_SONGS.forEach((entry, idx) => {
    const parts = entry.split(' — ');
    const title = (parts[0] || entry).trim();
    const artist = (parts[1] || 'Various Artists').trim();
    const key = `${title.toLowerCase()}::${artist.toLowerCase()}`;
    if (!seenKey.has(key)) {
      seenKey.add(key);
      const prof = artistLookup.get(artist.toLowerCase());
      const album = prof
        ? prof.albums[idx % prof.albums.length]
        : `${artist} Essential Singles`;
      const year = prof
        ? prof.eraStart + (idx % Math.max(1, prof.eraEnd - prof.eraStart + 1))
        : 1975 + (idx % 49);
      const genre = prof ? prof.genre : 'Pop / Contemporary';
      rawSeeds.push({ title, artist, album, year, genre });
    }
  });

  // 2. Add every core track from all 80+ artist discographies
  fullArtistList.forEach((prof) => {
    prof.coreTracks.forEach((rawTitle, tIdx) => {
      const title = rawTitle.trim();
      const key = `${title.toLowerCase()}::${prof.artist.toLowerCase()}`;
      if (!seenKey.has(key) && rawSeeds.length < 10000) {
        seenKey.add(key);
        const album = prof.albums[tIdx % prof.albums.length];
        const year =
          prof.eraStart + (tIdx % Math.max(1, prof.eraEnd - prof.eraStart + 1));
        rawSeeds.push({
          title,
          artist: prof.artist,
          album,
          year,
          genre: prof.genre,
        });
      }
    });
  });

  // 3. Expand across editions/remasters/sessions of the core discographies to reach 10,000 playable tracks
  for (let sIdx = 0; sIdx < SESSION_SUFFIXES.length && rawSeeds.length < 10000; sIdx++) {
    const suffix = SESSION_SUFFIXES[sIdx];
    for (let aIdx = 0; aIdx < fullArtistList.length && rawSeeds.length < 10000; aIdx++) {
      const prof = fullArtistList[aIdx];
      for (let tIdx = 0; tIdx < prof.coreTracks.length && rawSeeds.length < 10000; tIdx++) {
        const baseTitle = prof.coreTracks[tIdx].trim();
        const variantTitle = `${baseTitle} (${suffix})`;
        const key = `${variantTitle.toLowerCase()}::${prof.artist.toLowerCase()}`;
        if (!seenKey.has(key)) {
          seenKey.add(key);
          const album = prof.albums[(tIdx + sIdx) % prof.albums.length];
          const year =
            prof.eraStart +
            ((tIdx + sIdx) % Math.max(1, prof.eraEnd - prof.eraStart + 1));
          rawSeeds.push({
            title: variantTitle,
            artist: prof.artist,
            album,
            year,
            genre: prof.genre,
          });
        }
      }
    }
  }

  const dropdownLabels: string[] = [];
  const playableChallenges: ChallengeItem[] = rawSeeds.slice(0, 10000).map((seed, idx) => {
    const label = `${seed.title} — ${seed.artist}`;
    dropdownLabels.push(label);

    const baseCleanTitle = seed.title.replace(/\s*\([^)]*\)$/, '').trim();
    const aliases = Array.from(
      new Set([
        seed.title.toLowerCase(),
        baseCleanTitle.toLowerCase(),
        label.toLowerCase(),
      ])
    );

    const initials = getInitials(seed.artist);
    const scale = MELODIC_SCALES[idx % MELODIC_SCALES.length];
    const bpm = 92 + ((idx * 7) % 44);
    const artworkUrl = LOCAL_ARTWORK_POOL[idx % LOCAL_ARTWORK_POOL.length];

    const decoy1 = rawSeeds[(idx + 17) % rawSeeds.length]?.title || 'Get Lucky';
    const decoy2 = rawSeeds[(idx + 53) % rawSeeds.length]?.title || 'Billie Jean';
    const decoy3 = rawSeeds[(idx + 109) % rawSeeds.length]?.title || 'Dreams';

    return {
      id: `song-cat-${idx + 1}`,
      category: 'songs',
      answer: seed.title,
      acceptedAliases: aliases,
      subtitle: `${seed.artist} — ${seed.album}`,
      catalogNumber: `No. ${String(idx + 1).padStart(5, '0')}`,
      artworkUrl,
      pinpointClues: [
        `A signature ${seed.genre.toLowerCase()} recording by ${seed.artist} from the ${seed.year} album “${seed.album}”.`,
        `Released in ${seed.year} by ${seed.artist} (initials ${initials}).`,
        `Track title begins with “${baseCleanTitle.slice(0, 2).toUpperCase()}...” and appears on ${seed.album}.`,
      ],
      hints: {
        year: String(seed.year),
        genre: seed.genre,
        initials,
        pinpoint: seed.artist,
      },
      choices: [seed.title, decoy1, decoy2, decoy3],
      synthNotes: scale,
      bpm,
      itunesQuery: `${baseCleanTitle} ${seed.artist}`,
    };
  });

  return { playableChallenges, dropdownLabels };
}

const GENERATED_10000 = generateTenThousandCatalog();

export const ALL_10000_PLAYABLE_SONGS: ChallengeItem[] =
  GENERATED_10000.playableChallenges;

export const ALL_10000_SONGS: string[] = GENERATED_10000.dropdownLabels;

