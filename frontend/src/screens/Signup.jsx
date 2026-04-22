import { useState } from 'react';
import { LX } from '../tokens';
import Logo from '../components/Logo';
import PillBtn from '../components/PillBtn';
import { Icon } from '../components/Icons';

export default function Signup({ onSignup, onGoto, loading }) {
  const [prenom, setPrenom] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const canSubmit = prenom.trim().length >= 2 && pseudo.trim().length >= 3 && password.length >= 6;

  return (
    <div style={{
      minHeight: '100vh', background: LX.bg, color: LX.text,
      display: 'flex', flexDirection: 'column', padding: '48px 28px 28px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: -120, right: -120, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(rgba(200,140,255,0.18), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onGoto} style={{ width: 40, height: 40, borderRadius: 12, border: `1px solid ${LX.border}`, background: LX.surface, color: LX.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Icon.chevL(LX.text, 18)}
        </button>
        <Logo size={36} />
      </div>

      <div style={{ marginTop: 32 }}>
        <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: -1, lineHeight: 1.1 }}>
          Crée ton<br/><span style={{ color: LX.violet }}>lexique.</span>
        </div>
        <div style={{ marginTop: 10, fontSize: 15, color: LX.textDim }}>Deux infos et c'est parti. Pas de mail, pas de spam.</div>
      </div>

      <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {[
          { label: 'Prénom', value: prenom, onChange: setPrenom, placeholder: "Comment on t'appelle ?", prefix: null },
          { label: 'Pseudo', value: pseudo, onChange: (v) => setPseudo(v.toLowerCase().replace(/\s/g, '')), placeholder: 'ton_pseudo', prefix: '@' },
          { label: 'Mot de passe', value: password, onChange: setPassword, placeholder: '••••••••', type: 'password', prefix: null },
        ].map(({ label, value, onChange, placeholder, prefix, type }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: LX.textDim }}>{label}</label>
            <div style={{ position: 'relative', borderRadius: 18, border: `2px solid ${value ? LX.violet : LX.border}`, background: LX.surface, transition: 'border .15s' }}>
              {prefix && <span style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: LX.textMuted, fontSize: 17 }}>{prefix}</span>}
              <input
                type={type || 'text'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                style={{ width: '100%', padding: `18px 20px 18px ${prefix ? '40px' : '20px'}`, border: 'none', background: 'transparent', color: LX.text, fontSize: 17, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <PillBtn disabled={!canSubmit || loading} onClick={() => onSignup(prenom, pseudo, password)}
          style={{ width: '100%', padding: '18px', background: canSubmit ? LX.violet : LX.surfaceElev, boxShadow: canSubmit ? '0 4px 0 #9b5fd4' : 'none' }}>
          {loading ? 'Création…' : 'Créer mon compte'}
        </PillBtn>
        <div style={{ textAlign: 'center', fontSize: 12, color: LX.textMuted, lineHeight: 1.5 }}>
          En continuant, tu acceptes les conditions<br/>et de t'amuser avec les mots.
        </div>
      </div>
    </div>
  );
}
