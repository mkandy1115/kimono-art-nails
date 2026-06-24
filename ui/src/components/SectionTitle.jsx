export default function SectionTitle({ eyebrow, title, sub, align = 'center' }) {
  return (
    <div className="section-title" style={align === 'left' ? { textAlign: 'left' } : undefined}>
      {eyebrow && <span className="section-title__eyebrow">{eyebrow}</span>}
      <h2 className="section-title__heading">{title}</h2>
      <div className="ornament" style={align === 'left' ? { marginInline: 0 } : undefined}>
        <span />
      </div>
      {sub && <p className="section-title__sub">{sub}</p>}
    </div>
  );
}
