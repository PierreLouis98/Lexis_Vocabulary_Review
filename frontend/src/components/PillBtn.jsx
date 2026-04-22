import { LX } from '../tokens';

export default function PillBtn({ children, onClick, variant = 'primary', disabled, style = {} }) {
  const variants = {
    primary: { bg: LX.blue, color: '#fff', shadow: `0 4px 0 ${LX.blueDeep}`, border: 'none' },
    ghost: { bg: 'transparent', color: LX.textDim, shadow: 'none', border: `1px solid ${LX.border}` },
    lime: { bg: LX.lime, color: '#0A1020', shadow: `0 4px 0 ${LX.limeDeep}`, border: 'none' },
  }[variant];

  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{
        padding: '16px 22px', borderRadius: 16, fontSize: 16, fontWeight: 700, letterSpacing: 0.3,
        background: variants.bg, color: variants.color, boxShadow: variants.shadow, border: variants.border,
        cursor: disabled ? 'default' : 'pointer', transition: 'transform .08s',
        opacity: disabled ? 0.45 : 1, ...style,
      }}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = 'translateY(2px)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = '')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
    >
      {children}
    </button>
  );
}
