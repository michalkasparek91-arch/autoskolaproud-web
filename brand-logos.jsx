/* Reusable logo components for autoškola proud */

/**
 * ProudWordmark
 * Solid wordmark "proud" in Bricolage Grotesque, with the green "current"
 * laid OVER the type as a single freehand stroke — drawn on in one
 * continuous gesture on load (and replayed on hover), like signing the
 * word with an electric pen. The stroke ends on a glowing node (the ".").
 *
 * The stroke path has pathLength="100", so the draw-on dash math is
 * size-independent. The node is an SVG circle at the path's end point so
 * it stays perfectly registered to the stroke regardless of font size.
 */
const ProudWordmark = ({
  size = 80,
  color = "var(--paper)",
  accent = "var(--volt)",
  showAutoskola = true,
  autoskolaPos = "left",
}) => {
  // viewBox 1000 × 280, stretched (preserveAspectRatio none) over the word box.
  // Baseline ≈ y200, x-height top ≈ y120, ascender top ≈ y60.
  // One loose, hand-written gesture that sweeps over p-r-o-u-d and flicks
  // down to the period node at the end.
  const stroke =
    "M 30 158 " +
    "C 64 96 150 84 204 138 " +     // tight rising loop over the 'p'
    "C 250 184 330 188 400 140 " +  // flowing dip across 'r' 'o'
    "C 468 96 566 108 642 150 " +   // rise over 'u'
    "C 712 188 802 190 882 152 " +  // wave down through 'd'
    "C 916 134 940 178 962 202";    // flick down to the period node

  return (
    <span className="proud-mark" style={{ fontSize: `${size}px`, color, "--pm-accent": accent }}>
      {showAutoskola && autoskolaPos === "left" && (
        <span className="pm-pre">autoškola</span>
      )}
      <span className="pm-word">
        <span className="pm-text">proud</span>
        <svg
          className="pm-current"
          viewBox="0 0 1000 280"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="pm-wire"  d={stroke} pathLength="100" />
          <path className="pm-spark" d={stroke} pathLength="100" />
          <circle className="pm-node" cx="962" cy="202" r="7" />
        </svg>
      </span>
      {showAutoskola && autoskolaPos === "right" && (
        <span className="pm-pre" style={{ marginLeft: "0.62em", marginRight: 0 }}>autoškola</span>
      )}
    </span>
  );
};

// Sine-wave mark — current ripple as the 'proud' signature glyph
const CurrentMark = ({ size = 120, color = "var(--volt)", stroke = 2.4 }) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 120 60" fill="none" style={{ display: "block" }}>
    <path
      d="M 4 30 Q 18 6, 32 30 T 60 30 T 88 30 T 116 30"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="4" cy="30" r="3.2" fill={color} />
    <circle cx="116" cy="30" r="3.2" fill={color} />
  </svg>
);

// Lightning bolt mark — geometric, original
const BoltMark = ({ size = 80, color = "var(--volt)" }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ display: "block" }}>
    <path
      d="M 46 6 L 18 44 L 36 44 L 30 74 L 62 32 L 44 32 L 50 6 Z"
      fill={color}
    />
  </svg>
);

// Circular mark — "P" formed from a current loop with a node
const LoopMark = ({ size = 120, color = "var(--volt)", bg = "transparent", stroke = 6 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" style={{ display: "block" }}>
    <circle cx="60" cy="60" r="54" fill={bg} stroke={color} strokeWidth={stroke} />
    <path d="M 46 36 L 46 90" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
    <path d="M 46 36 L 70 36 Q 86 36 86 52 Q 86 68 70 68 L 46 68" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="86" cy="52" r="6" fill={color} />
  </svg>
);

Object.assign(window, { ProudWordmark, CurrentMark, BoltMark, LoopMark });
