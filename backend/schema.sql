-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  pseudo VARCHAR(50) UNIQUE NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  streak INT DEFAULT 0,
  level INT DEFAULT 1,
  xp INT DEFAULT 0,
  accuracy INT DEFAULT 0
);

-- Words library (corpus)
CREATE TABLE IF NOT EXISTS words (
  id VARCHAR(50) PRIMARY KEY,
  word VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL,
  definition TEXT NOT NULL,
  example TEXT,
  level VARCHAR(20) DEFAULT 'new'
);

-- User's word progress
CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  word_id VARCHAR(50) REFERENCES words(id),
  level VARCHAR(20) DEFAULT 'new',
  streak INT DEFAULT 0,
  last_practiced TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, word_id)
);

-- Exercise results
CREATE TABLE IF NOT EXISTS exercise_results (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  correct INT,
  total INT,
  accuracy INT,
  xp_earned INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert French vocabulary corpus
INSERT INTO words (id, word, type, definition, example, level) VALUES
  ('w1', 'onomatopée', 'nom', "Mot dont le son imite la chose qu'il désigne.", 'Boum, crac, miaou sont des onomatopées.', 'new'),
  ('w2', 'scintiller', 'verbe', "Briller d'un éclat vif et tremblant.", "Les étoiles scintillent dans le ciel d'hiver.", 'new'),
  ('w3', 'badinage', 'nom', 'Échange de propos légers, plaisanterie douce.', "Leur conversation n'était qu'un aimable badinage.", 'new'),
  ('w4', 'pérégrination', 'nom', 'Voyage long, à travers plusieurs endroits.', 'Ses pérégrinations l''ont mené jusqu''en Mongolie.', 'new'),
  ('w5', 'sagace', 'adjectif', 'Qui a une intelligence vive, perspicace.', 'Un observateur sagace remarquerait le détail.', 'new'),
  ('w6', 'chatoyant', 'adjectif', 'Qui change de couleur ou de reflet selon l''éclairage.', 'Une soie chatoyante aux reflets dorés.', 'new'),
  ('w7', 'ineffable', 'adjectif', 'Qui ne peut être exprimé par des mots.', 'Une joie ineffable l''envahissait.', 'new'),
  ('w8', 'flâner', 'verbe', 'Se promener sans but, en prenant son temps.', "J'aime flâner sur les quais le dimanche.", 'new'),
  ('w9', 'palimpseste', 'nom', 'Parchemin effacé pour être réutilisé ; strates successives.', 'La ville est un palimpseste d''époques.', 'new'),
  ('w10', 'sempiternel', 'adjectif', 'Qui dure ou semble durer sans fin.', 'Ses sempiternelles jérémiades.', 'new'),
  ('w11', 'ostensible', 'adjectif', 'Que l''on fait sans se cacher, de façon visible.', 'Un désintérêt ostensible pour la réunion.', 'new'),
  ('w12', 'apophtegme', 'nom', 'Parole mémorable, maxime d''un personnage illustre.', 'Il citait des apophtegmes de Sénèque.', 'new'),
  ('w13', 'susurrer', 'verbe', 'Murmurer doucement à l''oreille.', 'Elle lui susurra un secret.', 'new'),
  ('w14', 'nonobstant', 'adverbe', 'Malgré cela, en dépit de.', 'Nonobstant ses efforts, il échoua.', 'new'),
  ('w15', 'zénith', 'nom', 'Point le plus haut ; apogée.', 'Au zénith de sa carrière.', 'new'),
  ('s1', 'velléité', 'nom', 'Intention faible, sans suite concrète.', 'Il eut la velléité de partir.', 'new'),
  ('s2', 'ubuesque', 'adjectif', 'Absurde et grotesque, à la manière du roi Ubu.', 'Une bureaucratie ubuesque.', 'new'),
  ('s3', 'pusillanime', 'adjectif', 'Qui manque de courage, timoré.', 'Une réaction pusillanime.', 'new'),
  ('s4', 'gabegie', 'nom', 'Gâchis, mauvaise gestion d''un ensemble.', 'Une vraie gabegie administrative.', 'new'),
  ('s5', 'opiniâtre', 'adjectif', 'Tenace, qui ne renonce jamais.', 'Un effort opiniâtre paya enfin.', 'new'),
  ('s6', 'saugrenu', 'adjectif', 'Bizarre, inattendu, absurde.', 'Une question saugrenue.', 'new')
ON CONFLICT (id) DO NOTHING;
