// Lexis — shared data & design tokens

// ─── Palette (Ludique/Duo-inspired mais original) ─────────────
const LX = {
  // Dark mode canvas
  bg: '#0F1115',
  surface: '#181B22',
  surfaceElev: '#1F232C',
  surfaceAlt: '#242935',
  border: 'rgba(255,255,255,0.07)',
  borderStrong: 'rgba(255,255,255,0.14)',

  // Text
  text: '#F4F5F8',
  textDim: '#9CA3B4',
  textMuted: '#5E6473',

  // Accents
  blue: '#5B8BFF',           // primary action
  blueDeep: '#3A6AE6',
  blueGlow: 'rgba(91,139,255,0.25)',

  lime: '#B8F26A',           // maîtrisé / correct
  limeDeep: '#86C73B',
  coral: '#FF6B6B',          // erreur
  amber: '#FFB547',          // streak / en cours
  violet: '#C88CFF',         // nouveau

  // Category colors (for tags)
  cat: {
    adjectif: '#FFB547',
    verbe: '#5B8BFF',
    nom: '#B8F26A',
    adverbe: '#C88CFF',
    expression: '#FF6B6B',
  },
};

// ─── Corpus: 20+ mots français ────────────────────────────────
const WORDS = [
  { id: 'w1', word: 'onomatopée', type: 'nom', def: "Mot dont le son imite la chose qu'il désigne.", example: 'Boum, crac, miaou sont des onomatopées.', level: 'mastered', streak: 12 },
  { id: 'w2', word: 'scintiller', type: 'verbe', def: "Briller d'un éclat vif et tremblant.", example: "Les étoiles scintillent dans le ciel d'hiver.", level: 'mastered', streak: 8 },
  { id: 'w3', word: 'badinage', type: 'nom', def: 'Échange de propos légers, plaisanterie douce.', example: 'Leur conversation n\'était qu\'un aimable badinage.', level: 'learning', streak: 3 },
  { id: 'w4', word: 'pérégrination', type: 'nom', def: 'Voyage long, à travers plusieurs endroits.', example: 'Ses pérégrinations l\'ont mené jusqu\'en Mongolie.', level: 'learning', streak: 2 },
  { id: 'w5', word: 'sagace', type: 'adjectif', def: 'Qui a une intelligence vive, perspicace.', example: 'Un observateur sagace remarquerait le détail.', level: 'learning', streak: 1 },
  { id: 'w6', word: 'chatoyant', type: 'adjectif', def: 'Qui change de couleur ou de reflet selon l\'éclairage.', example: 'Une soie chatoyante aux reflets dorés.', level: 'mastered', streak: 15 },
  { id: 'w7', word: 'ineffable', type: 'adjectif', def: 'Qui ne peut être exprimé par des mots.', example: 'Une joie ineffable l\'envahissait.', level: 'learning', streak: 4 },
  { id: 'w8', word: 'flâner', type: 'verbe', def: 'Se promener sans but, en prenant son temps.', example: 'J\'aime flâner sur les quais le dimanche.', level: 'mastered', streak: 20 },
  { id: 'w9', word: 'palimpseste', type: 'nom', def: 'Parchemin effacé pour être réutilisé ; strates successives.', example: 'La ville est un palimpseste d\'époques.', level: 'new', streak: 0 },
  { id: 'w10', word: 'sempiternel', type: 'adjectif', def: 'Qui dure ou semble durer sans fin.', example: 'Ses sempiternelles jérémiades.', level: 'learning', streak: 2 },
  { id: 'w11', word: 'ostensible', type: 'adjectif', def: 'Que l\'on fait sans se cacher, de façon visible.', example: 'Un désintérêt ostensible pour la réunion.', level: 'new', streak: 0 },
  { id: 'w12', word: 'apophtegme', type: 'nom', def: 'Parole mémorable, maxime d\'un personnage illustre.', example: 'Il citait des apophtegmes de Sénèque.', level: 'new', streak: 0 },
  { id: 'w13', word: 'susurrer', type: 'verbe', def: 'Murmurer doucement à l\'oreille.', example: 'Elle lui susurra un secret.', level: 'mastered', streak: 9 },
  { id: 'w14', word: 'nonobstant', type: 'adverbe', def: 'Malgré cela, en dépit de.', example: 'Nonobstant ses efforts, il échoua.', level: 'learning', streak: 3 },
  { id: 'w15', word: 'zénith', type: 'nom', def: 'Point le plus haut ; apogée.', example: 'Au zénith de sa carrière.', level: 'mastered', streak: 11 },
  // Suggestions (pas encore ajoutés à la bibliothèque)
  { id: 's1', word: 'velléité', type: 'nom', def: 'Intention faible, sans suite concrète.', example: 'Il eut la velléité de partir.', level: 'suggested' },
  { id: 's2', word: 'ubuesque', type: 'adjectif', def: 'Absurde et grotesque, à la manière du roi Ubu.', example: 'Une bureaucratie ubuesque.', level: 'suggested' },
  { id: 's3', word: 'pusillanime', type: 'adjectif', def: 'Qui manque de courage, timoré.', example: 'Une réaction pusillanime.', level: 'suggested' },
  { id: 's4', word: 'gabegie', type: 'nom', def: 'Gâchis, mauvaise gestion d\'un ensemble.', example: 'Une vraie gabegie administrative.', level: 'suggested' },
  { id: 's5', word: 'opiniâtre', type: 'adjectif', def: 'Tenace, qui ne renonce jamais.', example: 'Un effort opiniâtre paya enfin.', level: 'suggested' },
  { id: 's6', word: 'saugrenu', type: 'adjectif', def: 'Bizarre, inattendu, absurde.', example: 'Une question saugrenue.', level: 'suggested' },
];

// ─── User + session state ─────────────────────────────────────
const INITIAL_USER = {
  pseudo: 'alexlex',
  prenom: 'Alex',
  streak: 14,
  level: 7,
  xp: 2380,
  xpToNext: 500,
  xpCurrent: 320,
  dailyGoal: 20,
  dailyDone: 12,
  accuracy: 87,
  totalStudyMin: 342,
};

// ─── Icons (inline SVG, simple, monoline) ─────────────────────
const Icon = {
  flame: (c = LX.amber, s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M12 2c-1 3-4 5-4 9a4 4 0 008 0c0-2-1-3-1-5 2 1 3 3 3 6a6 6 0 11-12 0c0-4 3-6 6-10z"/>
    </svg>
  ),
  trophy: (c, s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4h12v4a6 6 0 01-12 0V4zM4 4h2v3a3 3 0 01-3-3h1zm15 0h1a3 3 0 01-3 3V4h2zM10 14h4v3h-4zM8 20h8"/>
    </svg>
  ),
  book: (c, s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5a2 2 0 012-2h13v17H6a2 2 0 00-2 2V5zM19 18H6a2 2 0 00-2 2"/>
    </svg>
  ),
  target: (c, s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
      <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill={c}/>
    </svg>
  ),
  clock: (c, s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
    </svg>
  ),
  check: (c = '#fff', s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5 9-11"/>
    </svg>
  ),
  x: (c = '#fff', s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18"/>
    </svg>
  ),
  plus: (c, s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  search: (c, s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/>
    </svg>
  ),
  home: (c, s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11L12 3l9 8v10a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V11z"/>
    </svg>
  ),
  library: (c, s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h4v16H4zM10 6h4v14h-4zM15.5 8l3.5-1 3 13-3.5 1z"/>
    </svg>
  ),
  user: (c, s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>
    </svg>
  ),
  chart: (c, s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>
    </svg>
  ),
  chevR: (c, s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6"/>
    </svg>
  ),
  chevL: (c, s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 6l-6 6 6 6"/>
    </svg>
  ),
  sparkle: (c, s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M12 2l1.8 5.8L19.5 9.5l-5.7 1.8L12 17l-1.8-5.8L4.5 9.5l5.8-1.7z"/>
    </svg>
  ),
  volume: (c, s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 8a5 5 0 010 8M19 5a9 9 0 010 14"/>
    </svg>
  ),
  bookmark: (c, s = 18, filled = false) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? c : 'none'} stroke={c} strokeWidth="2" strokeLinejoin="round">
      <path d="M6 3h12v18l-6-4-6 4z"/>
    </svg>
  ),
};

Object.assign(window, { LX, WORDS, INITIAL_USER, Icon });
