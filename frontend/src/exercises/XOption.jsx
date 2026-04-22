import { LX } from '../tokens';
import { Icon } from '../components/Icons';

const base = {
  width: '100%', padding: '16px 18px', borderRadius: 16, border: `2px solid ${LX.border}`,
  background: LX.surfaceElev, color: LX.text, fontSize: 16, fontWeight: 500,
  textAlign: 'left', cursor: 'pointer', transition: 'all .15s', boxShadow: `0 2px 0 ${LX.border}`,
};

export default function XOption({ children, state = 'idle', onClick, letter }) {
  const styles = {
    idle: { borderColor: LX.border, background: LX.surfaceElev, color: LX.text },
    selected: { borderColor: LX.blue, background: 'rgba(91,139,255,0.10)', color: LX.text },
    correct: { borderColor: LX.lime, background: 'rgba(184,242,106,0.12)', color: LX.lime },
    wrong: { borderColor: LX.coral, background: 'rgba(255,107,107,0.10)', color: LX.coral },
    disabled: { borderColor: LX.border, background: LX.surface, color: LX.textMuted, opacity: 0.55 },
  }[state];

  return (
    <button onClick={onClick} style={{ ...base, ...styles, display: 'flex', alignItems: 'center', gap: 14 }}>
      {letter && (
        <span style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: state === 'idle' ? LX.surface : 'rgba(255,255,255,0.08)', color: styles.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{letter}</span>
      )}
      <span style={{ flex: 1 }}>{children}</span>
      {state === 'correct' && Icon.check(LX.lime, 18)}
      {state === 'wrong' && Icon.x(LX.coral, 18)}
    </button>
  );
}
