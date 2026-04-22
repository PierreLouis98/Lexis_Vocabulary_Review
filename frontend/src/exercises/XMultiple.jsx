import { useState } from 'react';
import { LX } from '../tokens';
import XOption from './XOption';

export default function XMultiple({ word, choices, correctIdx, onAnswer }) {
  const [picked, setPicked] = useState(null);

  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    setTimeout(() => onAnswer(i === correctIdx), 900);
  };

  const state = (i) => {
    if (picked === null) return 'idle';
    if (i === correctIdx) return 'correct';
    if (i === picked) return 'wrong';
    return 'disabled';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <div style={{ color: LX.textDim, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>Quelle est la définition de</div>
        <div style={{ marginTop: 10, fontSize: 34, fontWeight: 800, letterSpacing: -0.8 }}>{word}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {choices.map((c, i) => (
          <XOption key={i} state={state(i)} onClick={() => pick(i)} letter={['A','B','C','D'][i]}>{c}</XOption>
        ))}
      </div>
    </div>
  );
}
