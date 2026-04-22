const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

let token = null;

export const api = {
  setToken: (t) => (token = t),

  get: async (endpoint) => {
    const res = await fetch(`${API_URL}/api${endpoint}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error('API Error');
    return res.json();
  },

  post: async (endpoint, body) => {
    const res = await fetch(`${API_URL}/api${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('API Error');
    return res.json();
  },
};
