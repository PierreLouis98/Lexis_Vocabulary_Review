import { useState } from 'react';
import { LX } from '../tokens';
import Logo from '../components/Logo';
import PillBtn from '../components/PillBtn';

export default function Login({ onLogin, onGoto, loading }) {
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const canSubmit = pseudo.trim().length >= 3 && password.length >= 6;

  return (
    <div style={{
      minHeight: '100vh', background: LX.bg, color: LX.text,
      display: 'flex', flexDirection: 'column', padding: '48px 28px 28px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: -100, left: -100, width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(${LX.blueGlow}, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, right: -80, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(rgba(184,242,106,0.18), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ marginTop: 60 }}>
        <Logo size={56} />
        <div style={{ marginTop: 28, fontSize: 38, fontWeight: 900, letterSpacing: -1.2, lineHeight: 1.05 }}>
          Bon retour<br/><span style={{ color: LX.blue }}>parmi les mots.</span>
        </div>
        <div style={{ marginTop: 12, fontSize: 15, color: LX.textDim, lineHeight: 1.5 }}>
          Ton vocabulaire t'attend. Continue la série.
        </div>
      </div>

      <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: LX.textDim }}>Pseudo</label>
          <div style={{ position: 'relative', borderRadius: 18, border: `2px solid ${pseudo ? LX.blue : LX.border}`, background: LX.surface, transition: 'border .15s' }}>
            <span style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: LX.textMuted, fontSize: 18, fontWeight: 500 }}>@</span>
            <input
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value.toLowerCase().replace(/\s/g, ''))}
              placeholder="ton_pseudo"
              style={{ width: '100%', padding: '20px 20px 20px 42px', border: 'none', background: 'transparent', color: LX.text, fontSize: 18, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: LX.textDim }}>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{
              padding: '20px', borderRadius: 18, border: `2px solid ${password ? LX.blue : LX.border}`,
              background: LX.surface, color: LX.text, fontSize: 18, fontWeight: 600,
              outline: 'none', transition: 'border .15s', boxSizing: 'border-box', width: '100%',
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <PillBtn disabled={!canSubmit || loading} onClick={() => onLogin(pseudo, password)} style={{ width: '100%', padding: '18px' }}>
          {loading ? 'Connexion…' : 'Se connecter'}
        </PillBtn>
        <div style={{ textAlign: 'center', fontSize: 14, color: LX.textDim }}>
          Pas encore de compte ?{' '}
          <span onClick={onGoto} style={{ color: LX.blue, fontWeight: 700, cursor: 'pointer' }}>S'inscrire</span>
        </div>
      </div>
    </div>
  );
}
