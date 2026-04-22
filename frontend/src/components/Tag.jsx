import { LX } from '../tokens';

export default function Tag({ type }) {
  const color = LX.cat[type] || LX.textDim;
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 6,
      background: `${color}22`, color, fontSize: 10, fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: 0.8,
    }}>{type}</span>
  );
}
