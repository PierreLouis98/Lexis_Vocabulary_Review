import { LX } from '../tokens';
import { Icon } from '../components/Icons';

function KPICard({ icon, value, label, accent }) {
  return (
    <div style={{ background: LX.surface, border: `1px solid ${LX.border}`, borderRadius: 18, padding: '14px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: accent }}>
        {icon}
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: LX.textDim }}>{label}</span>
      </div>
      <div style={{ marginTop: 6, fontSize: 26, fontWeight: 900, color: LX.text, letterSpacing: -0.8, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    </div>
  );
}

export default function Home({ user, onGoto }) {
  if (!user) return null;

  const dailyDone = user.daily_done ?? 12;
  const dailyGoal = user.daily_goal ?? 20;
  const xpCurrent = user.xp_current ?? (user.xp % 500);
  const xpToNext = 500;
  const pct = Math.round((dailyDone / dailyGoal) * 100);
  const xpPct = Math.round((xpCurrent / xpToNext) * 100);

  return (
    <div style={{ background: LX.bg, color: LX.text, overflowY: 'auto', paddingBottom: 20 }}>
      {/* Header */}
      <div style={{ padding: '56px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13, color: LX.textDim, letterSpacing: 0.3 }}>Salut 👋</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: LX.text, letterSpacing: -0.8, marginTop: 2 }}>{user.prenom}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'rgba(255,181,71,0.12)', borderRadius: 999, border: `1px solid rgba(255,181,71,0.25)` }}>
          {Icon.flame(LX.amber, 18)}
          <span style={{ color: LX.amber, fontWeight: 800, fontSize: 17, fontVariantNumeric: 'tabular-nums' }}>{user.streak ?? 0}</span>
          <span style={{ color: LX.amber, fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', opacity: 0.8 }}>jours</span>
        </div>
      </div>

      {/* Daily CTA */}
      <div style={{ padding: '28px 20px 0' }}>
        <div style={{ background: `linear-gradient(135deg, ${LX.blue} 0%, ${LX.blueDeep} 100%)`, borderRadius: 24, padding: '22px 22px 20px', position: 'relative', overflow: 'hidden', boxShadow: `0 20px 40px -10px ${LX.blueGlow}` }}>
          <div style={{ position: 'absolute', top: -20, right: -30, fontSize: 160, fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.08)', fontWeight: 900, lineHeight: 1, pointerEvents: 'none' }}>Aa</div>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
              {Icon.sparkle('#fff', 14)} Exercice du jour
            </div>
            <div style={{ marginTop: 6, fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: -0.8, lineHeight: 1.1 }}>5 mots · 3 min</div>
            <div style={{ marginTop: 4, fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>Un mix de vrai/faux, QCM & phrases à trou.</div>
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600, marginBottom: 6 }}>
                <span>Objectif du jour</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{dailyDone}/{dailyGoal} XP</span>
              </div>
              <div style={{ height: 8, background: 'rgba(0,0,0,0.25)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: LX.lime, borderRadius: 999 }} />
              </div>
            </div>
            <button onClick={() => onGoto('exercise')} style={{ marginTop: 18, width: '100%', padding: '16px 0', background: '#0A1020', color: '#fff', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 0 rgba(0,0,0,0.4)', letterSpacing: 0.3 }}>
              Commencer →
            </button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ padding: '20px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <KPICard icon={Icon.trophy(LX.lime, 16)} label="Maîtrisés" value={user.mastered ?? 0} accent={LX.lime} />
        <KPICard icon={Icon.book(LX.blue, 16)} label="En cours" value={user.learning ?? 0} accent={LX.blue} />
        <KPICard icon={Icon.target(LX.amber, 16)} label="Précision" value={`${user.accuracy ?? 0}%`} accent={LX.amber} />
        <KPICard icon={Icon.clock(LX.violet, 16)} label="Niveau" value={`Niv. ${user.level ?? 1}`} accent={LX.violet} />
      </div>

      {/* XP Bar */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ background: LX.surface, border: `1px solid ${LX.border}`, borderRadius: 18, padding: '16px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg, ${LX.violet}, #9b5fd4)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 22, fontFamily: 'Georgia, serif' }}>{user.level ?? 1}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: LX.textDim, fontWeight: 600 }}>
              <span>Niveau {user.level ?? 1}</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>{xpCurrent}/{xpToNext} XP</span>
            </div>
            <div style={{ marginTop: 8, height: 6, background: LX.surfaceElev, borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: `${xpPct}%`, height: '100%', background: `linear-gradient(90deg, ${LX.violet}, ${LX.blue})`, borderRadius: 999 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
