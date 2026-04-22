// Mock data for development without PostgreSQL

const users = {};
let nextUserId = 1;

const words = [
  { id: 'w1', word: 'onomatopée', type: 'nom', definition: "Mot dont le son imite la chose qu'il désigne.", level: 'new' },
  { id: 'w2', word: 'scintiller', type: 'verbe', definition: "Briller d'un éclat vif et tremblant.", level: 'new' },
  { id: 'w3', word: 'badinage', type: 'nom', definition: 'Échange de propos légers, plaisanterie douce.', level: 'new' },
  { id: 'w4', word: 'pérégrination', type: 'nom', definition: 'Voyage long, à travers plusieurs endroits.', level: 'new' },
  { id: 'w5', word: 'sagace', type: 'adjectif', definition: 'Qui a une intelligence vive, perspicace.', level: 'new' },
  { id: 'w6', word: 'chatoyant', type: 'adjectif', definition: "Qui change de couleur ou de reflet selon l'éclairage.", level: 'new' },
  { id: 'w7', word: 'ineffable', type: 'adjectif', definition: 'Qui ne peut être exprimé par des mots.', level: 'new' },
  { id: 'w8', word: 'flâner', type: 'verbe', definition: 'Se promener sans but, en prenant son temps.', level: 'new' },
  { id: 'w9', word: 'palimpseste', type: 'nom', definition: "Parchemin effacé pour être réutilisé ; strates successives.", level: 'new' },
  { id: 'w10', word: 'sempiternel', type: 'adjectif', definition: 'Qui dure ou semble durer sans fin.', level: 'new' },
  { id: 'w11', word: 'ostensible', type: 'adjectif', definition: "Que l'on fait sans se cacher, de façon visible.", level: 'new' },
  { id: 'w12', word: 'apophtegme', type: 'nom', definition: "Parole mémorable, maxime d'un personnage illustre.", level: 'new' },
  { id: 'w13', word: 'susurrer', type: 'verbe', definition: "Murmurer doucement à l'oreille.", level: 'new' },
  { id: 'w14', word: 'nonobstant', type: 'adverbe', definition: 'Malgré cela, en dépit de.', level: 'new' },
  { id: 'w15', word: 'zénith', type: 'nom', definition: 'Point le plus haut ; apogée.', level: 'new' },
  { id: 's1', word: 'velléité', type: 'nom', definition: 'Intention faible, sans suite concrète.', level: 'suggested' },
  { id: 's2', word: 'ubuesque', type: 'adjectif', definition: 'Absurde et grotesque, à la manière du roi Ubu.', level: 'suggested' },
  { id: 's3', word: 'pusillanime', type: 'adjectif', definition: 'Qui manque de courage, timoré.', level: 'suggested' },
  { id: 's4', word: 'gabegie', type: 'nom', definition: "Gâchis, mauvaise gestion d'un ensemble.", level: 'suggested' },
  { id: 's5', word: 'opiniâtre', type: 'adjectif', definition: 'Tenace, qui ne renonce jamais.', level: 'suggested' },
  { id: 's6', word: 'saugrenu', type: 'adjectif', definition: 'Bizarre, inattendu, absurde.', level: 'suggested' },
];

const userLibrary = {}; // userId -> [word ids]

module.exports = { users, words, userLibrary, nextUserId };
