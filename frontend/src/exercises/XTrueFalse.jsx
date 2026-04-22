import { useState } from 'react';
import { LX } from '../tokens';

export default function XTrueFalse({ word, def, isCorrect, onAnswer }) {
  const [picked, setPicked] = useState(null);
  const answered = picked !== null;

  const pick = (choice) => {
    if (answered) return;
    setPicked(choice);
    setTimeout(() => onAnswer(choice === isCorrect), 900);
  };

  const btnStyle = (val) => ({
    flex: 1, padding: '20px 0', borderRadius: 18, fontSize: 18, fontWeight: 700, cursor: answered ? 'default' : 'pointer', transition: 'all .15s',
    border: `2px solid ${picked === val ? (picked === isCorrect ? LX.lime : LX.coral) : LX.border}`,
    background: picked === val ? (picked === isCorrect ? 'rgba(184,242,106,0.12)' : 'rgba(255,107,107,0.12)') : LX.surfaceElev,
    color: picked === val ? (picked === isCorrect ? LX.lime : LX.coral) : LX.text,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: LX.textDim, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>Vrai ou faux ?</div>
        <div style={{ marginTop: 18, fontSize: 32, fontWeight: 800, letterSpacing: -0.8 }}>{word}</div>
      </div>
      <div style={{ background: LX.surfaceElev, borderRadius: 20, padding: '22px 20px', border: `1px solid ${LX.border}`, fontSize: 17, lineHeight: 1.5, textAlign: 'center' }}>
        « {def} »
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <button onClick={() => pick(false)} disabled={answered} style={btnStyle(false)}>Faux</button>
        <button onClick={() => pick(true)} disabled={answered} style={btnStyle(true)}>Vrai</button>
      </div>
    </div>
  );
}
