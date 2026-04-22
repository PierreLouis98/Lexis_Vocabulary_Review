import { useState, useEffect } from 'react';
import { LX } from '../tokens';
import { Icon } from '../components/Icons';
import Tag from '../components/Tag';
import { api } from '../api';

export default function Library() {
  const [words, setWords] = useState([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/user/words').then(setWords).catch(console.error).finally(() => setLoading(false));
  }, []);

  const mine = words.filter((w) => w.level !== 'suggested');
  const suggestions = words.filter((w) => w.level === 'suggested');

  const filtered = mine.filter((w) => {
    if (filter !== 'all' && w.level !== filter) return false;
    if (query && !w.word.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: mine.length,
    mastered: mine.filter((w) => w.level === 'mastered').length,
    learning: mine.filter((w) => w.level === 'learning').length,
    new: mine.filter((w) => w.level === 'new').length,
  };

  const addWord = async (id) => {
    await api.post('/user/words', { word_id: id });
    const updated = await api.get('/user/words');
    setWords(updated);
  };

  if (loading) return <div style={{ background: LX.bg, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: LX.textMuted }}>Chargement…</div>;

  return (
    <div style={{ background: LX.bg, color: LX.text, overflowY: 'auto', paddingBottom: 20 }}>
      <div style={{ padding: '56px 24px 0' }}>
        <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.8 }}>Bibliothèque</div>
        <div style={{ fontSize: 13, color: LX.textDim, marginTop: 2 }}>{mine.length} mots · {counts.mastered} maîtrisés</div>
      </div>

      {/* Search */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: LX.surface, borderRadius: 14, border: `1px solid ${LX.border}` }}>
          {Icon.search(LX.textMuted, 16)}
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un mot…"
            style={{ flex: 1, border: 'none', background: 'transparent', color: LX.text, fontSize: 15, outline: 'none' }} />
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: '14px 20px 0', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {[{ id: 'all', label: 'Tous', c: LX.text }, { id: 'mastered', label: 'Maîtrisés', c: LX.lime }, { id: 'learning', label: 'En cours', c: LX.amber }, { id: 'new', label: 'Nouveaux', c: LX.violet }].map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', background: filter === f.id ? f.c : LX.surface, color: filter === f.id ? '#0A1020' : LX.textDim, border: `1px solid ${filter === f.id ? f.c : LX.border}`, cursor: 'pointer' }}>
            {f.label} <span style={{ opacity: 0.7 }}>{counts[f.id]}</span>
          </button>
        ))}
      </div>

      {/* Suggestions carousel */}
      {suggestions.length > 0 && (
        <div style={{ marginTop: 22 }}>
          <div style={{ padding: '0 20px 10px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>✨ Suggestions pour toi</div>
            <div style={{ fontSize: 11, color: LX.textDim, fontWeight: 600 }}>← glisse →</div>
          </div>
          <div style={{ display: 'flex', gap: 12, padding: '0 20px 4px', overflowX: 'auto', scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}>
            {suggestions.map((w) => {
              const c = LX.cat[w.type] || LX.textDim;
              return (
                <div key={w.id} style={{ flexShrink: 0, width: 210, scrollSnapAlign: 'start', background: LX.surface, borderRadius: 18, padding: '14px', border: `1px solid ${LX.border}`, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Tag type={w.type} />
                    <div style={{ fontSize: 10, color: LX.textMuted, fontWeight: 700, letterSpacing: 0.5 }}>NOUVEAU</div>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.4 }}>{w.word}</div>
                  <div style={{ fontSize: 12, color: LX.textDim, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{w.definition}</div>
                  <button onClick={() => addWord(w.id)} style={{ marginTop: 2, padding: '10px 0', borderRadius: 12, border: 'none', background: c + '20', color: c, fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    {Icon.plus(c, 16)} Ajouter
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Word list */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 12 }}>
          {filter === 'all' ? 'Mes mots' : filter === 'mastered' ? 'Maîtrisés' : filter === 'learning' ? 'En cours' : 'Nouveaux'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map((w) => {
            const lc = w.level === 'mastered' ? LX.lime : w.level === 'learning' ? LX.amber : LX.violet;
            return (
              <div key={w.id} style={{ background: LX.surface, border: `1px solid ${LX.border}`, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, background: lc + '20', color: lc, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>
                  {w.level === 'mastered' ? '★' : w.streak > 0 ? w.streak : '•'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.2 }}>{w.word}</div>
                    <Tag type={w.type} />
                  </div>
                  <div style={{ fontSize: 12, color: LX.textDim, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{w.definition}</div>
                </div>
                {Icon.chevR(LX.textMuted, 14)}
              </div>
            );
          })}
          {filtered.length === 0 && <div style={{ padding: '32px 0', textAlign: 'center', color: LX.textMuted, fontSize: 13 }}>Aucun mot dans cette catégorie.</div>}
        </div>
      </div>
    </div>
  );
}
