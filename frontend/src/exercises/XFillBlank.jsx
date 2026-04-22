import { useState } from 'react';
import { LX } from '../tokens';
import XOption from './XOption';

export default function XFillBlank({ before, after, choices, correctIdx, onAnswer }) {
  const [picked, setPicked] = useState(null);

  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    setTimeout(() => onAnswer(i === correctIdx), 900);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ color: LX.textDim, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>Complète la phrase</div>
      <div style={{ background: LX.surfaceElev, borderRadius: 18, padding: '24px 20px', border: `1px solid ${LX.border}`, fontSize: 18, lineHeight: 1.7 }}>
        {before}
        <span style={{ display: 'inline-block', minWidth: 70, padding: '2px 14px', margin: '0 4px', borderBottom: `2px solid ${picked !== null ? (picked === correctIdx ? LX.lime : LX.coral) : LX.blue}`, color: picked !== null ? (picked === correctIdx ? LX.lime : LX.coral) : LX.blue, fontWeight: 700, textAlign: 'center', fontStyle: 'italic' }}>
          {picked !== null ? choices[picked] : '···'}
        </span>
        {after}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {choices.map((c, i) => {
          const state = picked === null ? 'idle' : i === correctIdx ? 'correct' : i === picked ? 'wrong' : 'disabled';
          return <XOption key={i} state={state} onClick={() => pick(i)}>{c}</XOption>;
        })}
      </div>
    </div>
  );
}
