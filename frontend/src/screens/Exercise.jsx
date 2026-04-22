import { useState } from 'react';
import { LX, DAILY_SEQUENCE } from '../tokens';
import { Icon } from '../components/Icons';
import { api } from '../api';
import XTrueFalse from '../exercises/XTrueFalse';
import XMultiple from '../exercises/XMultiple';
import XMatch from '../exercises/XMatch';
import XInput from '../exercises/XInput';
import XFillBlank from '../exercises/XFillBlank';

export default function Exercise({ onDone, onExit }) {
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const total = DAILY_SEQUENCE.length;
  const step = DAILY_SEQUENCE[idx];
  const pct = (idx / total) * 100;

  const next = async (wasCorrect) => {
    const newCorrect = correct + (wasCorrect ? 1 : 0);
    if (idx + 1 >= total) {
      try { await api.post('/exercise/submit', { correct: newCorrect, total }); } catch {}
      onDone({ correct: newCorrect, total });
    } else {
      if (wasCorrect) setCorrect(newCorrect);
      setTimeout(() => setIdx((i) => i + 1), 300);
    }
  };

  const components = { truefalse: XTrueFalse, multiple: XMultiple, match: XMatch, input: XInput, fillblank: XFillBlank };
  const ExComponent = components[step.type];

  return (
    <div style={{ minHeight: '100vh', background: LX.bg, color: LX.text, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '56px 20px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onExit} style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: LX.surface, color: LX.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Icon.x(LX.textDim, 16)}
        </button>
        <div style={{ flex: 1, height: 10, background: LX.surface, borderRadius: 999, overflow: 'hidden' }}>
          <div key={idx} style={{ width: `${pct}%`, height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${LX.blue}, ${LX.lime})`, transition: 'width .4s cubic-bezier(.2,.7,.3,1)' }} />
        </div>
        <div style={{ fontSize: 12, fontWeight: 800, color: LX.textDim, fontVariantNumeric: 'tabular-nums' }}>{idx + 1}/{total}</div>
      </div>
      <div key={idx} style={{ flex: 1, padding: '12px 24px 28px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <ExComponent {...step} onAnswer={next} />
      </div>
    </div>
  );
}
