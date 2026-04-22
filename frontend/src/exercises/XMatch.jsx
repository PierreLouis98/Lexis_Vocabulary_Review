import { useState, useEffect, useMemo } from 'react';
import { LX } from '../tokens';

export default function XMatch({ pairs, onAnswer }) {
  const [selWord, setSelWord] = useState(null);
  const [selDef, setSelDef] = useState(null);
  const [matches, setMatches] = useState({});
  const [wrong, setWrong] = useState(null);

  const defs = useMemo(() => {
    const arr = pairs.map((p, i) => ({ def: p.def, origIdx: i }));
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (i * 7 + 3) % (i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  useEffect(() => {
    if (selWord !== null && selDef !== null) {
      if (defs[selDef].origIdx === selWord) {
        const next = { ...matches, [selWord]: selDef };
        setMatches(next);
        setSelWord(null); setSelDef(null);
        if (Object.keys(next).length === pairs.length) setTimeout(() => onAnswer(true), 300);
      } else {
        setWrong({ w: selWord, d: selDef });
        setTimeout(() => { setWrong(null); setSelWord(null); setSelDef(null); }, 550);
      }
    }
  }, [selWord, selDef]);

  const tile = (isSel, isMatched, isWrong) => ({
    padding: '14px 12px', borderRadius: 14, fontSize: 14, cursor: isMatched ? 'default' : 'pointer', lineHeight: 1.35, transition: 'all .12s', minHeight: 62, display: 'flex', alignItems: 'center',
    border: `2px solid ${isMatched ? LX.lime : isWrong ? LX.coral : isSel ? LX.blue : LX.border}`,
    background: isMatched ? 'rgba(184,242,106,0.10)' : isWrong ? 'rgba(255,107,107,0.10)' : isSel ? 'rgba(91,139,255,0.10)' : LX.surfaceElev,
    color: isMatched ? LX.lime : isWrong ? LX.coral : LX.text,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ color: LX.textDim, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>Associe</div>
        <div style={{ marginTop: 6, fontSize: 22, fontWeight: 700 }}>Chaque mot à sa définition</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pairs.map((p, i) => (
            <button key={i} disabled={i in matches} onClick={() => !(i in matches) && setSelWord(i)} style={{ ...tile(selWord === i, i in matches, wrong?.w === i), fontWeight: 700, fontSize: 15 }}>
              {p.word}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {defs.map((d, i) => (
            <button key={i} disabled={Object.values(matches).includes(i)} onClick={() => !Object.values(matches).includes(i) && setSelDef(i)} style={tile(selDef === i, Object.values(matches).includes(i), wrong?.d === i)}>
              {d.def}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
