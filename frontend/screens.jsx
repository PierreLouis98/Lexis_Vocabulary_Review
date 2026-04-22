// Lexis — Screens (Login, Signup, Home, Library, Exercise, Result)

// ─── Shared atoms ─────────────────────────────────────────────
function Logo({ size = 36, color = LX.blue }) {
  // A bold "L" mark with a serif nudge + accent dot
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: size, height: size, borderRadius: size * 0.28,
        background: `linear-gradient(135deg, ${color} 0%, ${LX.blueDeep} 100%)`,
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

function PillBtn({ children, onClick, variant = 'primary', disabled, style = {} }) {
  const variants = {
    primary: { bg: LX.blue, color: '#fff', shadow: `0 4px 0 ${LX.blueDeep}`, border: 'none' },
    ghost: { bg: 'transparent', color: LX.textDim, shadow: 'none', border: `1px solid ${LX.border}` },
    lime: { bg: LX.lime, color: '#0A1020', shadow: `0 4px 0 ${LX.limeDeep}`, border: 'none' },
  }[variant];
  const d = disabled ? { opacity: 0.45 } : {};
  return (
    <button onClick={disabled ? undefined : onClick}
      style={{
        padding: '16px 22px', borderRadius: 16, fontSize: 16, fontWeight: 700, letterSpacing: 0.3,
        background: variants.bg, color: variants.color, boxShadow: variants.shadow, border: variants.border,
        cursor: disabled ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'transform .08s',
        ...d, ...style,
      }}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = 'translateY(2px)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = '')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = '')}>
      {children}
    </button>
  );
}

function Tag({ type }) {
  const color = LX.cat[type] || LX.textDim;
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 6,
      background: `${color}22`, color, fontSize: 10, fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: 0.8,
    }}>{type}</span>
  );
}

// ═════ 1. LOGIN ═══════════════════════════════════════════════
function ScreenLogin({ onGoto }) {
  const [pseudo, setPseudo] = React.useState('');
  const canSubmit = pseudo.trim().length >= 3;

  return (
    <div style={{
      height: '100%', background: LX.bg, color: LX.text,
      display: 'flex', flexDirection: 'column', padding: '48px 28px 28px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* decorative glow */}
      <div style={{
        position: 'absolute', top: -100, left: -100, width: 300, height: 300,
        borderRadius: '50%', background: `radial-gradient(${LX.blueGlow}, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, right: -80, width: 260, height: 260,
        borderRadius: '50%', background: 'radial-gradient(rgba(184,242,106,0.18), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ marginTop: 60 }}>
        <Logo size={56} />
        <div style={{ marginTop: 28, fontSize: 38, fontWeight: 900, letterSpacing: -1.2, lineHeight: 1.05 }}>
          Bon retour<br/>
          <span style={{ color: LX.blue }}>parmi les mots.</span>
        </div>
        <div style={{ marginTop: 12, fontSize: 15, color: LX.textDim, lineHeight: 1.5 }}>
          Ton vocabulaire t'attend. 14 jours de suite, continue la série.
        </div>
      </div>

      <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: LX.textDim }}>Pseudo</label>
        <div style={{
          position: 'relative', borderRadius: 18,
          border: `2px solid ${pseudo ? LX.blue : LX.border}`,
          background: LX.surface, transition: 'border .15s',
        }}>
          <span style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: LX.textMuted, fontSize: 18, fontWeight: 500 }}>@</span>
          <input
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value.toLowerCase().replace(/\s/g, ''))}
            placeholder="ton_pseudo"
            style={{
              width: '100%', padding: '20px 20px 20px 42px', border: 'none', background: 'transparent',
              color: LX.text, fontSize: 18, fontWeight: 600, fontFamily: 'inherit',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <PillBtn disabled={!canSubmit} onClick={() => onGoto('home')} style={{ width: '100%', padding: '18px' }}>
          Se connecter
        </PillBtn>
        <div style={{ textAlign: 'center', fontSize: 14, color: LX.textDim }}>
          Pas encore de compte ?{' '}
          <span onClick={() => onGoto('signup')} style={{ color: LX.blue, fontWeight: 700, cursor: 'pointer' }}>
            S'inscrire
          </span>
        </div>
      </div>
    </div>
  );
}

// ═════ 2. SIGNUP ══════════════════════════════════════════════
function ScreenSignup({ onGoto }) {
  const [prenom, setPrenom] = React.useState('');
  const [pseudo, setPseudo] = React.useState('');
  const canSubmit = prenom.trim().length >= 2 && pseudo.trim().length >= 3;

  return (
    <div style={{
      height: '100%', background: LX.bg, color: LX.text,
      display: 'flex', flexDirection: 'column', padding: '48px 28px 28px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -120, right: -120, width: 320, height: 320,
        borderRadius: '50%', background: 'radial-gradient(rgba(200,140,255,0.18), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => onGoto('login')} style={{
          width: 40, height: 40, borderRadius: 12, border: `1px solid ${LX.border}`,
          background: LX.surface, color: LX.text, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{Icon.chevL(LX.text, 18)}</button>
        <Logo size={36} />
      </div>

      <div style={{ marginTop: 32 }}>
        <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: -1, lineHeight: 1.1 }}>
          Crée ton<br/>
          <span style={{ color: LX.violet }}>lexique.</span>
        </div>
        <div style={{ marginTop: 10, fontSize: 15, color: LX.textDim, lineHeight: 1.5 }}>
          Deux infos et c'est parti. Pas de mail, pas de spam.
        </div>
      </div>

      <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: LX.textDim }}>Prénom</label>
          <input
            value={prenom} onChange={(e) => setPrenom(e.target.value)}
            placeholder="Comment on t'appelle ?"
            style={{
              padding: '18px 20px', borderRadius: 18, border: `2px solid ${prenom ? LX.violet : LX.border}`,
              background: LX.surface, color: LX.text, fontSize: 17, fontWeight: 600,
              fontFamily: 'inherit', outline: 'none', transition: 'border .15s',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: LX.textDim }}>Pseudo</label>
          <div style={{
            position: 'relative', borderRadius: 18,
            border: `2px solid ${pseudo ? LX.violet : LX.border}`,
            background: LX.surface, transition: 'border .15s',
          }}>
            <span style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: LX.textMuted, fontSize: 17 }}>@</span>
            <input
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value.toLowerCase().replace(/\s/g, ''))}
              placeholder="ton_pseudo"
              style={{
                width: '100%', padding: '18px 20px 18px 40px', border: 'none', background: 'transparent',
                color: LX.text, fontSize: 17, fontWeight: 600, fontFamily: 'inherit',
                outline: 'none', boxSizing: 'border-box',
              }}
            />
            {pseudo && (
              <span style={{
                position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
                fontSize: 11, fontWeight: 700, color: LX.lime, textTransform: 'uppercase', letterSpacing: 0.8,
              }}>
                Dispo ✓
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: LX.textMuted, paddingLeft: 4 }}>
            Visible par les autres apprenants.
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <PillBtn disabled={!canSubmit} onClick={() => onGoto('home')}
          style={{ width: '100%', padding: '18px', background: canSubmit ? LX.violet : LX.surfaceElev, boxShadow: canSubmit ? '0 4px 0 #9b5fd4' : 'none' }}>
          Créer mon compte
        </PillBtn>
        <div style={{ textAlign: 'center', fontSize: 12, color: LX.textMuted, lineHeight: 1.5 }}>
          En continuant, tu acceptes les conditions<br/>et de t'amuser avec les mots.
        </div>
      </div>
    </div>
  );
}

// ═════ 3. HOME / DASHBOARD ════════════════════════════════════
function KPICard({ icon, value, label, accent, style = {} }) {
  return (
    <div style={{
      background: LX.surface, border: `1px solid ${LX.border}`,
      borderRadius: 18, padding: '14px 14px', position: 'relative', overflow: 'hidden',
      ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: accent }}>{icon}
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: LX.textDim }}>{label}</span>
      </div>
      <div style={{ marginTop: 6, fontSize: 26, fontWeight: 900, color: LX.text, letterSpacing: -0.8, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    </div>
  );
}

function ScreenHome({ user, onGoto }) {
  const pct = Math.round((user.dailyDone / user.dailyGoal) * 100);
  const xpPct = Math.round((user.xpCurrent / user.xpToNext) * 100);

  return (
    <div style={{
      height: '100%', background: LX.bg, color: LX.text,
      overflow: 'auto', paddingBottom: 90,
    }}>
      {/* header */}
      <div style={{ padding: '56px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13, color: LX.textDim, letterSpacing: 0.3 }}>Salut 👋</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: LX.text, letterSpacing: -0.8, marginTop: 2 }}>{user.prenom}</div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
          background: 'rgba(255,181,71,0.12)', borderRadius: 999,
          border: `1px solid rgba(255,181,71,0.25)`,
        }}>
          {Icon.flame(LX.amber, 18)}
          <span style={{ color: LX.amber, fontWeight: 800, fontSize: 17, fontVariantNumeric: 'tabular-nums' }}>{user.streak}</span>
          <span style={{ color: LX.amber, fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', opacity: 0.8 }}>jours</span>
        </div>
      </div>

      {/* Daily CTA big card */}
      <div style={{ padding: '28px 20px 0' }}>
        <div style={{
          background: `linear-gradient(135deg, ${LX.blue} 0%, ${LX.blueDeep} 100%)`,
          borderRadius: 24, padding: '22px 22px 20px',
          position: 'relative', overflow: 'hidden',
          boxShadow: `0 20px 40px -10px ${LX.blueGlow}`,
        }}>
          {/* bg pattern */}
          <div style={{
            position: 'absolute', top: -20, right: -30,
            fontSize: 160, fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.08)',
            fontWeight: 900, letterSpacing: -8, lineHeight: 1, pointerEvents: 'none',
          }}>Aa</div>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
              {Icon.sparkle('#fff', 14)} Exercice du jour
            </div>
            <div style={{ marginTop: 6, fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: -0.8, lineHeight: 1.1 }}>
              5 mots · 3 min
            </div>
            <div style={{ marginTop: 4, fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>
              Un mix de vrai/faux, QCM & phrases à trou.
            </div>

            {/* daily progress */}
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600, marginBottom: 6 }}>
                <span>Objectif du jour</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{user.dailyDone}/{user.dailyGoal} XP</span>
              </div>
              <div style={{ height: 8, background: 'rgba(0,0,0,0.25)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: LX.lime, borderRadius: 999 }} />
              </div>
            </div>

            <button onClick={() => onGoto('exercise')} style={{
              marginTop: 18, width: '100%', padding: '16px 0',
              background: '#0A1020', color: '#fff', border: 'none', borderRadius: 14,
              fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 4px 0 rgba(0,0,0,0.4)', letterSpacing: 0.3,
            }}>
              Commencer →
            </button>
          </div>
        </div>
      </div>

      {/* KPIs grid */}
      <div style={{
        padding: '20px 20px 0',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
      }}>
        <KPICard icon={Icon.trophy(LX.lime, 16)} label="Maîtrisés" value="127" accent={LX.lime} />
        <KPICard icon={Icon.book(LX.blue, 16)} label="En cours" value="34" accent={LX.blue} />
        <KPICard icon={Icon.target(LX.amber, 16)} label="Précision" value={`${user.accuracy}%`} accent={LX.amber} />
        <KPICard icon={Icon.clock(LX.violet, 16)} label="Total" value={`${Math.floor(user.totalStudyMin / 60)}h${user.totalStudyMin % 60}`} accent={LX.violet} />
      </div>

      {/* Level / XP */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{
          background: LX.surface, border: `1px solid ${LX.border}`, borderRadius: 18, padding: '16px',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: `linear-gradient(135deg, ${LX.violet}, #9b5fd4)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 900, fontSize: 22, fontFamily: 'Georgia, serif',
          }}>{user.level}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: LX.textDim, fontWeight: 600 }}>
              <span>Niveau {user.level}</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>{user.xpCurrent}/{user.xpToNext} XP</span>
            </div>
            <div style={{ marginTop: 8, height: 6, background: LX.surfaceElev, borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: `${xpPct}%`, height: '100%', background: `linear-gradient(90deg, ${LX.violet}, ${LX.blue})`, borderRadius: 999 }} />
            </div>
          </div>
        </div>
      </div>

      {/* 7-day activity strip */}
      <div style={{ padding: '22px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: LX.text, letterSpacing: -0.2 }}>Cette semaine</div>
          <div style={{ fontSize: 11, color: LX.textDim, fontWeight: 600 }}>6/7 jours</div>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 60 }}>
          {[22, 18, 30, 25, 0, 28, 12].map((v, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: '100%', height: v ? `${Math.max(20, v * 1.4)}%` : 4,
                background: v ? (i === 6 ? LX.blue : LX.surfaceAlt) : LX.surface,
                borderRadius: 6,
                border: i === 6 ? `1px solid ${LX.blue}` : 'none',
              }} />
              <div style={{ fontSize: 10, color: i === 6 ? LX.blue : LX.textMuted, fontWeight: 700, letterSpacing: 0.5 }}>
                {['L','M','M','J','V','S','D'][i]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═════ Tab bar (shared bottom nav) ════════════════════════════
function TabBar({ tab, onTab }) {
  const Btn = ({ id, icon, label }) => {
    const active = tab === id;
    return (
      <button onClick={() => onTab(id)} style={{
        flex: 1, padding: '8px 0 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        background: 'none', border: 'none', cursor: 'pointer', color: active ? LX.blue : LX.textMuted, fontFamily: 'inherit',
      }}>
        {icon(active ? LX.blue : LX.textMuted, 22)}
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.3 }}>{label}</span>
      </button>
    );
  };
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30,
      background: 'rgba(15,17,21,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderTop: `1px solid ${LX.border}`,
      display: 'flex', padding: '6px 0 14px',
    }}>
      <Btn id="home" icon={Icon.home} label="Accueil" />
      <Btn id="library" icon={Icon.library} label="Mots" />
    </div>
  );
}

// ═════ 4. LIBRARY ════════════════════════════════════════════
function ScreenLibrary({ library, onAdd, bookmarked }) {
  const [filter, setFilter] = React.useState('all'); // all | mastered | learning | new
  const [query, setQuery] = React.useState('');

  const mine = WORDS.filter((w) => library.includes(w.id));
  const suggestions = WORDS.filter((w) => w.level === 'suggested' && !library.includes(w.id));

  const filtered = mine.filter((w) => {
    if (filter !== 'all' && w.level !== filter) return false;
    if (query && !w.word.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: mine.length,
    mastered: mine.filter((w) => w.level === 'mastered').length,
    learning: mine.filter((w) => w.level === 'learning').length,
    new: mine.filter((w) => w.level === 'new').length,
  };

  return (
    <div style={{
      height: '100%', background: LX.bg, color: LX.text,
      overflow: 'auto', paddingBottom: 90,
    }}>
      <div style={{ padding: '56px 24px 0' }}>
        <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.8 }}>Bibliothèque</div>
        <div style={{ fontSize: 13, color: LX.textDim, marginTop: 2 }}>
          {mine.length} mots · {counts.mastered} maîtrisés
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
          background: LX.surface, borderRadius: 14, border: `1px solid ${LX.border}`,
        }}>
          {Icon.search(LX.textMuted, 16)}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un mot…"
            style={{
              flex: 1, border: 'none', background: 'transparent', color: LX.text,
              fontSize: 15, fontFamily: 'inherit', outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: '14px 20px 0', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {[
          { id: 'all', label: 'Tous', c: LX.text },
          { id: 'mastered', label: 'Maîtrisés', c: LX.lime },
          { id: 'learning', label: 'En cours', c: LX.amber },
          { id: 'new', label: 'Nouveaux', c: LX.violet },
        ].map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            style={{
              padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap',
              background: filter === f.id ? f.c : LX.surface,
              color: filter === f.id ? '#0A1020' : LX.textDim,
              border: `1px solid ${filter === f.id ? f.c : LX.border}`,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
            {f.label} <span style={{ opacity: 0.7, fontVariantNumeric: 'tabular-nums' }}>{counts[f.id]}</span>
          </button>
        ))}
      </div>

      {/* Suggestions carousel */}
      <div style={{ marginTop: 22 }}>
        <div style={{ padding: '0 20px 10px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: -0.2 }}>✨ Suggestions pour toi</div>
          <div style={{ fontSize: 11, color: LX.textDim, fontWeight: 600 }}>← glisse →</div>
        </div>
        <div style={{
          display: 'flex', gap: 12, padding: '0 20px 4px',
          overflowX: 'auto', scrollbarWidth: 'none', scrollSnapType: 'x mandatory',
        }}>
          {suggestions.map((w) => {
            const c = LX.cat[w.type];
            return (
              <div key={w.id} style={{
                flexShrink: 0, width: 210, scrollSnapAlign: 'start',
                background: LX.surface, borderRadius: 18, padding: '14px',
                border: `1px solid ${LX.border}`, position: 'relative',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Tag type={w.type} />
                  <div style={{ fontSize: 10, color: LX.textMuted, fontWeight: 700, letterSpacing: 0.5 }}>NOUVEAU</div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: LX.text, letterSpacing: -0.4 }}>{w.word}</div>
                <div style={{ fontSize: 12, color: LX.textDim, lineHeight: 1.4, minHeight: 50,
                  display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {w.def}
                </div>
                <button onClick={() => onAdd(w.id)}
                  style={{
                    marginTop: 2, padding: '10px 0', borderRadius: 12, border: 'none',
                    background: c + '20', color: c, fontSize: 13, fontWeight: 800,
                    cursor: 'pointer', fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}>
                  {Icon.plus(c, 16)} Ajouter
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Word list */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: -0.2, marginBottom: 12 }}>
          {filter === 'all' ? 'Mes mots' : filter === 'mastered' ? 'Maîtrisés' : filter === 'learning' ? 'En cours' : 'Nouveaux'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map((w) => {
            const lc = w.level === 'mastered' ? LX.lime : w.level === 'learning' ? LX.amber : LX.violet;
            return (
              <div key={w.id} style={{
                background: LX.surface, border: `1px solid ${LX.border}`, borderRadius: 14,
                padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
              }}>
                {/* level indicator */}
                <div style={{
                  width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                  background: lc + '20', color: lc,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, letterSpacing: 0.2,
                }}>
                  {w.level === 'mastered' ? '★' : w.level === 'learning' ? w.streak : '•'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: LX.text, letterSpacing: -0.2 }}>{w.word}</div>
                    <Tag type={w.type} />
                  </div>
                  <div style={{
                    fontSize: 12, color: LX.textDim, marginTop: 2,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>{w.def}</div>
                </div>
                {Icon.chevR(LX.textMuted, 14)}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ padding: '32px 0', textAlign: 'center', color: LX.textMuted, fontSize: 13 }}>
              Aucun mot dans cette catégorie.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═════ 5. EXERCISE HOST ══════════════════════════════════════
function ScreenExercise({ onDone, onExit }) {
  const [idx, setIdx] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const step = DAILY_SEQUENCE[idx];
  const total = DAILY_SEQUENCE.length;
  const pct = (idx / total) * 100;

  const next = (wasCorrect) => {
    if (wasCorrect) setCorrect((c) => c + 1);
    setTimeout(() => {
      if (idx + 1 >= total) onDone({ correct: correct + (wasCorrect ? 1 : 0), total });
      else setIdx((i) => i + 1);
    }, 300);
  };

  const ExComponent = {
    truefalse: () => <XTrueFalse {...step} onAnswer={next} />,
    multiple: () => <XMultiple {...step} onAnswer={next} />,
    match: () => <XMatch {...step} onAnswer={next} />,
    input: () => <XInput {...step} onAnswer={next} />,
    fillblank: () => <XFillBlank {...step} onAnswer={next} />,
  }[step.type];

  return (
    <div style={{
      height: '100%', background: LX.bg, color: LX.text,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* progress + close */}
      <div style={{ padding: '56px 20px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onExit} style={{
          width: 36, height: 36, borderRadius: 10, border: 'none',
          background: LX.surface, color: LX.text, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit',
        }}>{Icon.x(LX.textDim, 16)}</button>
        <div style={{ flex: 1, height: 10, background: LX.surface, borderRadius: 999, overflow: 'hidden' }}>
          <div key={idx} style={{
            width: `${pct}%`, height: '100%', borderRadius: 999,
            background: `linear-gradient(90deg, ${LX.blue}, ${LX.lime})`,
            transition: 'width .4s cubic-bezier(.2,.7,.3,1)',
          }} />
        </div>
        <div style={{ fontSize: 12, fontWeight: 800, color: LX.textDim, fontVariantNumeric: 'tabular-nums', letterSpacing: 0.3 }}>
          {idx + 1}/{total}
        </div>
      </div>

      <div key={idx} style={{ flex: 1, padding: '12px 24px 28px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <ExComponent />
      </div>
    </div>
  );
}

// ═════ 6. RESULT ═════════════════════════════════════════════
function ScreenResult({ result, onHome }) {
  const { correct, total } = result;
  const pct = Math.round((correct / total) * 100);
  const great = pct >= 80;
  const xpEarned = correct * 10;

  return (
    <div style={{
      height: '100%', background: LX.bg, color: LX.text,
      display: 'flex', flexDirection: 'column', padding: '56px 28px 28px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
        width: 380, height: 380, borderRadius: '50%',
        background: `radial-gradient(${great ? 'rgba(184,242,106,0.25)' : 'rgba(91,139,255,0.25)'}, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 6 }}>{great ? '🎉' : '💪'}</div>
        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: -0.8, marginTop: 8 }}>
          {great ? 'Bravo !' : 'Presque !'}
        </div>
        <div style={{ fontSize: 15, color: LX.textDim, marginTop: 8, maxWidth: 280 }}>
          {great ? 'Ta série continue. Reviens demain pour ne pas la casser.' : 'Un peu de révision et tu y es.'}
        </div>

        <div style={{
          marginTop: 36, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, width: '100%',
        }}>
          <div style={{ background: LX.surface, borderRadius: 16, padding: '14px 10px', border: `1px solid ${LX.border}` }}>
            <div style={{ fontSize: 11, color: LX.textDim, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Score</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: great ? LX.lime : LX.blue, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{correct}/{total}</div>
          </div>
          <div style={{ background: LX.surface, borderRadius: 16, padding: '14px 10px', border: `1px solid ${LX.border}` }}>
            <div style={{ fontSize: 11, color: LX.textDim, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Précision</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: LX.amber, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{pct}%</div>
          </div>
          <div style={{ background: LX.surface, borderRadius: 16, padding: '14px 10px', border: `1px solid ${LX.border}` }}>
            <div style={{ fontSize: 11, color: LX.textDim, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>XP</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: LX.violet, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>+{xpEarned}</div>
          </div>
        </div>
      </div>

      <PillBtn onClick={onHome} variant="lime" style={{ width: '100%', padding: '18px' }}>
        Retour au tableau de bord
      </PillBtn>
    </div>
  );
}

Object.assign(window, {
  ScreenLogin, ScreenSignup, ScreenHome, ScreenLibrary, ScreenExercise, ScreenResult,
  TabBar, Logo, PillBtn, Tag,
});
