import { useState } from 'react';
import { LX } from '../tokens';
import { Icon } from '../components/Icons';

export default function XInput({ def, answer, onAnswer }) {
  const [val, setVal] = useState('');
  const [checked, setChecked] = useState(null);

  const norm = (s) => s.toLowerCase().trim().replace(/[éèê]/g, 'e').replace(/[àâ]/g, 'a').replace(/[îï]/g, 'i').replace(/[ôö]/g, 'o').replace(/[ûüù]/g, 'u').replace(/ç/g, 'c');

  const submit = () => {
    if (!val.trim() || checked !== null) return;
    const ok = norm(val) === norm(answer);
    setChecked(ok);
    setTimeout(() => onAnswer(ok), 1100);
  };

  const borderColor = checked === true ? LX.lime : checked === false ? LX.coral : val ? LX.blue : LX.border;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <div style={{ color: LX.textDim, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>Écris le mot</div>
        <div style={{ marginTop: 6, fontSize: 20, fontWeight: 700, lineHeight: 1.3 }}>qui correspond à cette définition</div>
      </div>
      <div style={{ background: LX.surfaceElev, borderRadius: 18, padding: '20px 18px', border: `1px solid ${LX.border}`, fontSize: 16, lineHeight: 1.55 }}>
        « {def} »
      </div>
      <div>
        <input
          value={val} autoFocus onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="ta réponse…" disabled={checked !== null}
          style={{ width: '100%', padding: '18px 20px', borderRadius: 16, border: `2px solid ${borderColor}`, background: LX.surface, color: LX.text, fontSize: 20, fontWeight: 600, outline: 'none', boxSizing: 'border-box', transition: 'all .15s' }}
        />
        {checked === false && <div style={{ marginTop: 10, fontSize: 13, color: LX.coral, display: 'flex', alignItems: 'center', gap: 6 }}>{Icon.x(LX.coral, 14)} La bonne réponse : <b style={{ color: LX.text }}>{answer}</b></div>}
        {checked === true && <div style={{ marginTop: 10, fontSize: 13, color: LX.lime, display: 'flex', alignItems: 'center', gap: 6 }}>{Icon.check(LX.lime, 14)} Parfait !</div>}
      </div>
      <button onClick={submit} disabled={!val.trim() || checked !== null} style={{ marginTop: 'auto', padding: '16px 0', borderRadius: 16, border: 'none', background: val.trim() && checked === null ? LX.blue : LX.surfaceElev, color: val.trim() && checked === null ? '#fff' : LX.textMuted, fontSize: 16, fontWeight: 700, cursor: val.trim() && checked === null ? 'pointer' : 'default' }}>
        Valider
      </button>
    </div>
  );
}
