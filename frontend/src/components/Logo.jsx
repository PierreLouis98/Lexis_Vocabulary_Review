import { LX } from '../tokens';

export default function Logo({ size = 36 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: size, height: size, borderRadius: size * 0.28,
        background: `linear-gradient(135deg, ${LX.blue} 0%, ${LX.blueDeep} 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: 900, fontSize: size * 0.58,
        fontFamily: 'Georgia, serif', letterSpacing: -1,
        boxShadow: `0 8px 22px ${LX.blueGlow}`,
        position: 'relative',
      }}>
        L
        <span style={{
          position: 'absolute', right: size * 0.18, bottom: size * 0.22,
          width: size * 0.14, height: size * 0.14, borderRadius: '50%', background: LX.lime,
        }} />
      </div>
    </div>
  );
}
