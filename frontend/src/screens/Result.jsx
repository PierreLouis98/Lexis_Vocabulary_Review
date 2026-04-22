import { LX } from '../tokens';
import PillBtn from '../components/PillBtn';

export default function Result({ result, onHome }) {
  const { correct, total } = result || { correct: 4, total: 5 };
  const pct = Math.round((correct / total) * 100);
  const great = pct >= 80;
  const xpEarned = correct * 10;

  return (
    <div style={{ minHeight: '100vh', background: LX.bg, color: LX.text, display: 'flex', flexDirection: 'column', padding: '56px 28px 28px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(${great ? 'rgba(184,242,106,0.25)' : 'rgba(91,139,255,0.25)'}, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative' }}>
        <div style={{ fontSize: 64, marginBottom: 6 }}>{great ? '🎉' : '💪'}</div>
        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: -0.8, marginTop: 8 }}>{great ? 'Bravo !' : 'Presque !'}</div>
        <div style={{ fontSize: 15, color: LX.textDim, marginTop: 8, maxWidth: 280 }}>
          {great ? 'Ta série continue. Reviens demain pour ne pas la casser.' : 'Un peu de révision et tu y es.'}
        </div>

        <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, width: '100%' }}>
          {[
            { label: 'Score', value: `${correct}/${total}`, color: great ? LX.lime : LX.blue },
            { label: 'Précision', value: `${pct}%`, color: LX.amber },
            { label: 'XP', value: `+${xpEarned}`, color: LX.violet },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: LX.surface, borderRadius: 16, padding: '14px 10px', border: `1px solid ${LX.border}` }}>
              <div style={{ fontSize: 11, color: LX.textDim, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      <PillBtn onClick={onHome} variant="lime" style={{ width: '100%', padding: '18px' }}>
        Retour au tableau de bord
      </PillBtn>
    </div>
  );
}
