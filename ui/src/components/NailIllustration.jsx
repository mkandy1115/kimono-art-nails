// Renders an elegant illustrated set of five press-on nail chips using the
// product's theme colors. Used as a placeholder until real photography is
// added (set `product.image` to a URL to show a real photo instead).

function seededRandom(seed) {
  let s = 0;
  for (let i = 0; i < seed.length; i += 1) s = (s * 31 + seed.charCodeAt(i)) % 100000;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function NailIllustration({ theme = {}, seed = 'kimono', className }) {
  const from = theme.from || '#F7DDE6';
  const to = theme.to || '#E8A7B3';
  const accent = theme.accent || '#D8B57A';
  const id = seed.replace(/[^a-z0-9]/gi, '');
  const rand = seededRandom(seed);

  // Five nails, slightly varying heights like a hand.
  const nails = [
    { x: 30, h: 116, w: 40 },
    { x: 86, h: 138, w: 44 },
    { x: 146, h: 150, w: 46 },
    { x: 206, h: 134, w: 44 },
    { x: 262, h: 104, w: 38 },
  ];

  const flecks = Array.from({ length: 26 }, () => ({
    cx: 20 + rand() * 290,
    cy: 30 + rand() * 150,
    r: 0.8 + rand() * 2.4,
    o: 0.4 + rand() * 0.5,
  }));

  return (
    <svg
      className={className}
      viewBox="0 0 330 200"
      role="img"
      aria-label="Illustration of a nail chip set"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <linearGradient id={`nail-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.55" stopColor={from} stopOpacity="0.9" />
          <stop offset="1" stopColor={to} stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="50%" cy="20%" r="80%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft background */}
      <rect width="330" height="200" fill={`url(#bg-${id})`} />
      <rect width="330" height="200" fill={`url(#glow-${id})`} />

      {/* Gold flecks (kinpaku) */}
      {flecks.map((f, i) => (
        <circle key={i} cx={f.cx} cy={f.cy} r={f.r} fill={accent} opacity={f.o} />
      ))}

      {/* Nail chips, arranged like a fanned set */}
      <g transform="translate(0 18)">
        {nails.map((n, i) => {
          const top = 168 - n.h;
          return (
            <g key={i}>
              <path
                d={`
                  M ${n.x} ${168}
                  L ${n.x} ${top + n.w / 2}
                  Q ${n.x} ${top} ${n.x + n.w / 2} ${top}
                  Q ${n.x + n.w} ${top} ${n.x + n.w} ${top + n.w / 2}
                  L ${n.x + n.w} ${168}
                  Z
                `}
                fill={`url(#nail-${id})`}
                stroke="#ffffff"
                strokeOpacity="0.7"
                strokeWidth="1"
              />
              {/* accent nail gets a gold tip */}
              {i === 2 && (
                <path
                  d={`
                    M ${n.x} ${top + 26}
                    L ${n.x} ${top + n.w / 2}
                    Q ${n.x} ${top} ${n.x + n.w / 2} ${top}
                    Q ${n.x + n.w} ${top} ${n.x + n.w} ${top + n.w / 2}
                    L ${n.x + n.w} ${top + 26}
                    Z
                  `}
                  fill={accent}
                  opacity="0.85"
                />
              )}
              {/* shine highlight */}
              <ellipse
                cx={n.x + n.w * 0.36}
                cy={top + n.h * 0.34}
                rx={n.w * 0.12}
                ry={n.h * 0.22}
                fill="#ffffff"
                opacity="0.45"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
