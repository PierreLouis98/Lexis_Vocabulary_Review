import { LX } from '../tokens';
import { Icon } from './Icons';

export default function TabBar({ tab, onTab }) {
  const Btn = ({ id, icon, label }) => {
    const active = tab === id;
    return (
      <button onClick={() => onTab(id)} style={{
        flex: 1, padding: '8px 0 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        background: 'none', border: 'none', cursor: 'pointer', color: active ? LX.blue : LX.textMuted,
      }}>
        {icon(active ? LX.blue : LX.textMuted, 22)}
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3 }}>{label}</span>
      </button>
    );
  };

  return (
    <div style={{
      position: 'sticky', bottom: 0, left: 0, right: 0, zIndex: 30,
      background: 'rgba(15,17,21,0.92)', backdropFilter: 'blur(20px)',
      borderTop: `1px solid ${LX.border}`,
      display: 'flex', padding: '6px 0 14px',
    }}>
      <Btn id="home" icon={Icon.home} label="Accueil" />
      <Btn id="library" icon={Icon.library} label="Mots" />
    </div>
  );
}
