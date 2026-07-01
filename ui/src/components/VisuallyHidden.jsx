// Screen-reader-only text; does not affect layout.
export default function VisuallyHidden({ children, as: Tag = 'span' }) {
  return <Tag className="visually-hidden">{children}</Tag>;
}
