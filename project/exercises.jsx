// Lexis — Exercise types (5 types, playable)
// Each exercise: { type, word, ... type-specific props }, onAnswer(correct)

// Shared building blocks
const xBtn = {
  width: '100%',
  padding: '16px 18px',
  borderRadius: 16,
  border: `2px solid ${LX.border}`,
  background: LX.surfaceElev,
  color: LX.text,
  fontSize: 16,
  fontWeight: 500,
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'all .15s',
  fontFamily: 'inherit',
  boxShadow: `0 2px 0 ${LX.border}`,
};

function XOption({ children, state = 'idle', onClick, letter }) {
  // state: idle | selected | correct | wrong | disabled
  const styles = {
    idle: { borderColor: LX.border, background: LX.surfaceElev, color: LX.text },
    selected: { borderColor: LX.blue, background: 'rgba(91,139,255,0.10)', color: LX.text },
    correct: { borderColor: LX.lime, background: 'rgba(184,242,106,0.12)', color: LX.lime },
    wrong: { borderColor: LX.coral, background: 'rgba(255,107,107,0.10)', color: LX.coral },
    disabled: { borderColor: LX.border, background: LX.surface, color: LX.textMuted, opacity: 0.55 },
  }[state];
  return (
    <button onClick={onClick} style={{ ...xBtn, ...styles, display: 'flex', alignItems: 'center', gap: 14 }}>
      {letter && (
        <span style={{
          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
          background: state === 'idle' ? LX.surface : 'rgba(255,255,255,0.08)',
          color: styles.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, letterSpacing: 0.5,
        }}>{letter}</span>
      )}
      <span style={{ flex: 1 }}>{children}</span>
      {state === 'correct' && Icon.check(LX.lime, 18)}
      {state === 'wrong' && Icon.x(LX.coral, 18)}
    </button>
  );
}

// ─── 1. Vrai / Faux ───────────────────────────────────────────
function XTrueFalse({ word, def, isCorrect, onAnswer }) {
  const [picked, setPicked] = React.useState(null);
  const answered = picked !== null;
  const got = picked === isCorrect;

  const pick = (choice) => {
    if (answered) return;
    setPicked(choice);
    setTimeout(() => onAnswer(choice === isCorrect), 900);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: LX.textDim, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>Vrai ou faux ?</div>
        <div style={{ marginTop: 18, fontSize: 32, fontWeight: 800, color: LX.text, letterSpacing: -0.8 }}>{word}</div>
        <div style={{ marginTop: 6, fontSize: 13, color: LX.textMuted, fontStyle: 'italic' }}>nom · féminin</div>
      </div>
      <div style={{
        background: LX.surfaceElev, borderRadius: 20, padding: '22px 20px',
        border: `1px solid ${LX.border}`, fontSize: 17, lineHeight: 1.5, color: LX.text, textAlign: 'center',
      }}>
        « {def} »
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <button onClick={() => pick(false)} disabled={answered}
          style={{
            flex: 1, padding: '20px 0', borderRadius: 18, border: `2px solid ${picked === false ? (got ? LX.lime : LX.coral) : LX.border}`,
            background: picked === false ? (got ? 'rgba(184,242,106,0.12)' : 'rgba(255,107,107,0.12)') : LX.surfaceElev,
            color: picked === false ? (got ? LX.lime : LX.coral) : LX.text, fontSize: 18, fontWeight: 700, cursor: answered ? 'default' : 'pointer',
            fontFamily: 'inherit', transition: 'all .15s',
          }}>
          Faux
        </button>
        <button onClick={() => pick(true)} disabled={answered}
          style={{
            flex: 1, padding: '20px 0', borderRadius: 18, border: `2px solid ${picked === true ? (got ? LX.lime : LX.coral) : LX.border}`,
            background: picked === true ? (got ? 'rgba(184,242,106,0.12)' : 'rgba(255,107,107,0.12)') : LX.surfaceElev,
            color: picked === true ? (got ? LX.lime : LX.coral) : LX.text, fontSize: 18, fontWeight: 700, cursor: answered ? 'default' : 'pointer',
            fontFamily: 'inherit', transition: 'all .15s',
          }}>
          Vrai
        </button>
      </div>
    </div>
  );
}

// ─── 2. QCM ───────────────────────────────────────────────────
function XMultiple({ word, choices, correctIdx, onAnswer }) {
  const [picked, setPicked] = React.useState(null);
  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    setTimeout(() => onAnswer(i === correctIdx), 900);
  };
  const state = (i) => {
    if (picked === null) return 'idle';
    if (i === correctIdx) return 'correct';
    if (i === picked) return 'wrong';
    return 'disabled';
  };
  const letters = ['A', 'B', 'C', 'D'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <div style={{ color: LX.textDim, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>Quelle est la définition de</div>
        <div style={{ marginTop: 10, fontSize: 34, fontWeight: 800, color: LX.text, letterSpacing: -0.8 }}>{word}</div>
        <div style={{ fontSize: 13, color: LX.textMuted, fontStyle: 'italic', marginTop: 2 }}>?</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {choices.map((c, i) => (
          <XOption key={i} state={state(i)} onClick={() => pick(i)} letter={letters[i]}>{c}</XOption>
        ))}
      </div>
    </div>
  );
}

// ─── 3. Association (mot ↔ définition) ────────────────────────
function XMatch({ pairs, onAnswer }) {
  // pairs: [{ word, def }, ...]
  const [selWord, setSelWord] = React.useState(null);
  const [selDef, setSelDef] = React.useState(null);
  const [matches, setMatches] = React.useState({}); // wordIdx -> defIdx
  const [wrong, setWrong] = React.useState(null);

  const defs = React.useMemo(() => {
    // shuffled but stable
    const arr = pairs.map((p, i) => ({ def: p.def, origIdx: i }));
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (i * 7 + 3) % (i + 1); [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [pairs]);

  React.useEffect(() => {
    if (selWord !== null && selDef !== null) {
      const origDef = defs[selDef].origIdx;
      if (origDef === selWord) {
        setMatches((m) => ({ ...m, [selWord]: selDef }));
        setSelWord(null); setSelDef(null);
        // check done
        setTimeout(() => {
          const next = { ...matches, [selWord]: selDef };
          if (Object.keys(next).length === pairs.length) onAnswer(true);
        }, 300);
      } else {
        setWrong({ w: selWord, d: selDef });
        setTimeout(() => { setWrong(null); setSelWord(null); setSelDef(null); }, 550);
      }
    }
  }, [selWord, selDef]);

  const tileStyle = (isSel, isMatched, isWrong) => ({
    padding: '14px 12px', borderRadius: 14, border: `2px solid ${isMatched ? LX.lime : isWrong ? LX.coral : isSel ? LX.blue : LX.border}`,
    background: isMatched ? 'rgba(184,242,106,0.10)' : isWrong ? 'rgba(255,107,107,0.10)' : isSel ? 'rgba(91,139,255,0.10)' : LX.surfaceElev,
    color: isMatched ? LX.lime : isWrong ? LX.coral : LX.text,
    fontSize: 14, cursor: isMatched ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left',
    lineHeight: 1.35, transition: 'all .12s', minHeight: 62, display: 'flex', alignItems: 'center',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ color: LX.textDim, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>Associe</div>
        <div style={{ marginTop: 6, fontSize: 22, fontWeight: 700, color: LX.text, letterSpacing: -0.4 }}>Chaque mot à sa définition</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pairs.map((p, i) => {
            const isMatched = i in matches;
            const isSel = selWord === i;
            const isWr = wrong && wrong.w === i;
            return (
              <button key={i} disabled={isMatched}
                onClick={() => !isMatched && setSelWord(i)}
                style={{ ...tileStyle(isSel, isMatched, isWr), fontWeight: 700, fontSize: 15 }}>
                {p.word}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {defs.map((d, i) => {
            const isMatched = Object.values(matches).includes(i);
            const isSel = selDef === i;
            const isWr = wrong && wrong.d === i;
            return (
              <button key={i} disabled={isMatched}
                onClick={() => !isMatched && setSelDef(i)}
                style={tileStyle(isSel, isMatched, isWr)}>
                {d.def}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── 4. Saisie libre ──────────────────────────────────────────
function XInput({ def, answer, onAnswer }) {
  const [val, setVal] = React.useState('');
  const [checked, setChecked] = React.useState(null);
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
        <div style={{ marginTop: 6, fontSize: 20, fontWeight: 700, color: LX.text, letterSpacing: -0.3, lineHeight: 1.3 }}>qui correspond à cette définition</div>
      </div>
      <div style={{
        background: LX.surfaceElev, borderRadius: 18, padding: '20px 18px',
        border: `1px solid ${LX.border}`, fontSize: 16, lineHeight: 1.55, color: LX.text,
      }}>
        « {def} »
      </div>
      <div>
        <input
          value={val}
          autoFocus
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="ta réponse…"
          disabled={checked !== null}
          style={{
            width: '100%', padding: '18px 20px', borderRadius: 16,
            border: `2px solid ${borderColor}`, background: LX.surface,
            color: LX.text, fontSize: 20, fontWeight: 600, fontFamily: 'inherit',
            outline: 'none', boxSizing: 'border-box', letterSpacing: -0.2,
            transition: 'all .15s',
          }}
        />
        {checked === false && (
          <div style={{ marginTop: 10, fontSize: 13, color: LX.coral, display: 'flex', alignItems: 'center', gap: 6 }}>
            {Icon.x(LX.coral, 14)} La bonne réponse : <b style={{ color: LX.text }}>{answer}</b>
          </div>
        )}
        {checked === true && (
          <div style={{ marginTop: 10, fontSize: 13, color: LX.lime, display: 'flex', alignItems: 'center', gap: 6 }}>
            {Icon.check(LX.lime, 14)} Parfait !
          </div>
        )}
      </div>
      <button onClick={submit} disabled={!val.trim() || checked !== null}
        style={{
          marginTop: 'auto', padding: '16px 0', borderRadius: 16, border: 'none',
          background: val.trim() && checked === null ? LX.blue : LX.surfaceElev,
          color: val.trim() && checked === null ? '#fff' : LX.textMuted,
          fontSize: 16, fontWeight: 700, cursor: val.trim() && checked === null ? 'pointer' : 'default',
          fontFamily: 'inherit', letterSpacing: 0.3,
        }}>
        Valider
      </button>
    </div>
  );
}

// ─── 5. Phrase à trou ─────────────────────────────────────────
function XFillBlank({ before, after, choices, correctIdx, onAnswer }) {
  const [picked, setPicked] = React.useState(null);
  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    setTimeout(() => onAnswer(i === correctIdx), 900);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ color: LX.textDim, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>Complète la phrase</div>
      </div>
      <div style={{
        background: LX.surfaceElev, borderRadius: 18, padding: '24px 20px',
        border: `1px solid ${LX.border}`, fontSize: 18, lineHeight: 1.7, color: LX.text,
      }}>
        {before}
        <span style={{
          display: 'inline-block', minWidth: 70, padding: '2px 14px', margin: '0 4px',
          borderBottom: `2px solid ${picked !== null ? (picked === correctIdx ? LX.lime : LX.coral) : LX.blue}`,
          color: picked !== null ? (picked === correctIdx ? LX.lime : LX.coral) : LX.blue,
          fontWeight: 700, textAlign: 'center', fontStyle: 'italic',
        }}>
          {picked !== null ? choices[picked] : '···'}
        </span>
        {after}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {choices.map((c, i) => {
          const state = picked === null ? 'idle' :
            i === correctIdx ? 'correct' :
            i === picked ? 'wrong' : 'disabled';
          return (
            <XOption key={i} state={state} onClick={() => pick(i)}>{c}</XOption>
          );
        })}
      </div>
    </div>
  );
}

// ─── Exercise queue (sequence used in Daily) ──────────────────
const DAILY_SEQUENCE = [
  { type: 'truefalse', word: 'scintiller', def: "Briller d'un éclat vif et tremblant.", isCorrect: true },
  { type: 'multiple', word: 'sagace', correctIdx: 2, choices: [
    "Qui parle beaucoup et sans retenue.",
    "Qui agit sans réfléchir, impulsif.",
    "Qui a une intelligence vive, perspicace.",
    "Qui est très en colère.",
  ]},
  { type: 'fillblank',
    before: 'Un observateur ',
    after: ' aurait remarqué ce détail dans la foule.',
    choices: ['sagace', 'sempiternel', 'opiniâtre', 'ubuesque'],
    correctIdx: 0,
  },
  { type: 'match', pairs: [
    { word: 'flâner', def: 'Se promener sans but, en prenant son temps.' },
    { word: 'susurrer', def: 'Murmurer doucement à l\'oreille.' },
    { word: 'scintiller', def: "Briller d'un éclat vif et tremblant." },
    { word: 'badinage', def: 'Échange de propos légers, plaisanterie douce.' },
  ]},
  { type: 'input', def: 'Qui ne peut être exprimé par des mots ; indicible.', answer: 'ineffable' },
];

Object.assign(window, { XTrueFalse, XMultiple, XMatch, XInput, XFillBlank, DAILY_SEQUENCE, XOption });
