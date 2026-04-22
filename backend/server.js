const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const USE_MOCK = process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL;

let pool, mockData;

if (USE_MOCK) {
  console.log('🎭 Using mock data (no database)');
  mockData = require('./mock-data');
} else {
  pool = require('./db');
}

// Middleware: verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Auth: Signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { pseudo, prenom, password } = req.body;
    if (!pseudo || !prenom || !password) return res.status(400).json({ error: 'Missing fields' });

    if (USE_MOCK) {
      const hash = await bcryptjs.hash(password, 10);
      const id = mockData.nextUserId++;
      const user = { id, pseudo, prenom };
      mockData.users[id] = { ...user, password_hash: hash, streak: 0, level: 1, xp: 0, accuracy: 0 };
      const token = jwt.sign({ id, pseudo }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ user, token });
    }

    const hash = await bcryptjs.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (pseudo, prenom, password_hash) VALUES ($1, $2, $3) RETURNING id, pseudo, prenom',
      [pseudo, prenom, hash]
    );
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, pseudo: user.pseudo }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Auth: Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { pseudo, password } = req.body;

    if (USE_MOCK) {
      const user = Object.values(mockData.users).find(u => u.pseudo === pseudo);
      if (!user || !(await bcryptjs.compare(password, user.password_hash))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user.id, pseudo: user.pseudo }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ user: { id: user.id, pseudo: user.pseudo, prenom: user.prenom }, token });
    }

    const result = await pool.query('SELECT * FROM users WHERE pseudo = $1', [pseudo]);
    const user = result.rows[0];
    if (!user || !(await bcryptjs.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, pseudo: user.pseudo }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user.id, pseudo: user.pseudo, prenom: user.prenom }, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user profile
app.get('/api/user/profile', verifyToken, async (req, res) => {
  try {
    if (USE_MOCK) {
      const user = mockData.users[req.user.id];
      if (!user) return res.status(404).json({ error: 'User not found' });
      return res.json({ id: user.id, pseudo: user.pseudo, prenom: user.prenom, streak: user.streak, level: user.level, xp: user.xp, accuracy: user.accuracy });
    }

    const result = await pool.query('SELECT id, pseudo, prenom, streak, level, xp, accuracy FROM users WHERE id = $1', [req.user.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user's words (library)
app.get('/api/user/words', verifyToken, async (req, res) => {
  try {
    if (USE_MOCK) {
      const userWordIds = mockData.userLibrary[req.user.id] || [];
      const words = mockData.words.map(w => ({
        ...w,
        level: userWordIds.includes(w.id) ? w.level : 'suggested',
        streak: 0
      }));
      return res.json(words);
    }

    const result = await pool.query(`
      SELECT w.id, w.word, w.type, w.definition,
             COALESCE(up.level, 'new') as level, COALESCE(up.streak, 0) as streak
      FROM words w
      LEFT JOIN user_progress up ON w.id = up.word_id AND up.user_id = $1
      ORDER BY w.id
    `, [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add word to library
app.post('/api/user/words', verifyToken, async (req, res) => {
  try {
    const { word_id } = req.body;

    if (USE_MOCK) {
      if (!mockData.userLibrary[req.user.id]) mockData.userLibrary[req.user.id] = [];
      if (!mockData.userLibrary[req.user.id].includes(word_id)) {
        mockData.userLibrary[req.user.id].push(word_id);
      }
      return res.json({ ok: true });
    }

    await pool.query(
      'INSERT INTO user_progress (user_id, word_id, level) VALUES ($1, $2, $3) ON CONFLICT (user_id, word_id) DO NOTHING',
      [req.user.id, word_id, 'new']
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Submit exercise result
app.post('/api/exercise/submit', verifyToken, async (req, res) => {
  try {
    const { correct, total } = req.body;
    const accuracy = Math.round((correct / total) * 100);
    const xp = correct * 10;

    if (USE_MOCK) {
      const user = mockData.users[req.user.id];
      if (user) {
        user.xp += xp;
        user.accuracy = accuracy;
        user.streak = (user.streak || 0) + 1;
      }
      return res.json({ xp_earned: xp, ok: true });
    }

    await pool.query(
      'INSERT INTO exercise_results (user_id, correct, total, accuracy, xp_earned) VALUES ($1, $2, $3, $4, $5)',
      [req.user.id, correct, total, accuracy, xp]
    );
    await pool.query(
      'UPDATE users SET xp = xp + $1, accuracy = $2 WHERE id = $3',
      [xp, accuracy, req.user.id]
    );
    res.json({ xp_earned: xp, ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, mock: USE_MOCK });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
