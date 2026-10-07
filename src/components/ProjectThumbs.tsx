// ProjectThumbs.tsx
//
// Three pictures for your project cards. They have no fixed colors:
// every shape uses a color class from project-thumbs.css, so the
// pictures follow whichever theme is active (Electric, Crimson, ...).
//
// HOW TO USE (example inside a project card):
//
//   import { MediCareThumb } from "@/components/ProjectThumbs";
//
//   <div className="h-48 w-full overflow-hidden rounded-t-2xl">
//     <MediCareThumb />
//   </div>
//
// The picture stretches to fill its parent, so size the parent
// (the div above), not the picture.

import "./project-thumbs.css";

// Settings shared by all three pictures.
// "slice" means: fill the whole card area and crop a little if needed.
const svgProps = {
  className: "thumb",
  viewBox: "0 0 680 411",
  width: "100%",
  height: "100%",
  preserveAspectRatio: "xMidYMid slice",
} as const;

/* ------------------------------------------------------------------
   1) MediCare: a hospital building next to a patient queue panel
------------------------------------------------------------------- */
export function MediCareThumb() {
  return (
    <svg {...svgProps} role="img" aria-label="Hospital building with a patient queue panel">
      {/* background */}
      <rect className="fill-bg" width="680" height="411" />

      {/* hospital building */}
      <rect className="fill-surface stroke-line" x="90" y="140" width="160" height="200" rx="6" strokeWidth="1" />
      <rect className="fill-line" x="75" y="320" width="190" height="20" rx="4" />

      {/* medical cross on top */}
      <circle className="fill-secondary" cx="170" cy="100" r="30" />
      <rect fill="#ffffff" x="164" y="82" width="12" height="36" rx="2" />
      <rect fill="#ffffff" x="152" y="94" width="36" height="12" rx="2" />

      {/* windows (two colors, like some lights are on) */}
      <rect className="fill-primary" x="108" y="162" width="30" height="26" rx="3" />
      <rect className="fill-secondary" x="148" y="162" width="30" height="26" rx="3" />
      <rect className="fill-primary" x="188" y="162" width="30" height="26" rx="3" />
      <rect className="fill-secondary" x="108" y="204" width="30" height="26" rx="3" />
      <rect className="fill-primary" x="148" y="204" width="30" height="26" rx="3" />
      <rect className="fill-secondary" x="188" y="204" width="30" height="26" rx="3" />

      {/* door */}
      <rect className="fill-bg" x="148" y="270" width="44" height="50" rx="4" />

      {/* queue panel */}
      <rect className="fill-surface stroke-line" x="320" y="60" width="300" height="270" rx="12" strokeWidth="1" />
      <rect className="fill-soft" x="344" y="92" width="70" height="6" rx="3" />

      {/* "now serving" token box */}
      <rect className="fill-bg stroke-secondary" x="344" y="104" width="252" height="56" rx="8" strokeWidth="1" />
      <rect className="fill-secondary" x="400" y="124" width="140" height="16" rx="4" />

      {/* three waiting rows */}
      <rect className="fill-line dim" x="344" y="176" width="252" height="40" rx="6" />
      <rect className="fill-line dim" x="344" y="226" width="252" height="40" rx="6" />
      <rect className="fill-line dim" x="344" y="276" width="252" height="40" rx="6" />
      <rect className="fill-soft" x="360" y="192" width="48" height="8" rx="3" />
      <rect className="fill-soft" x="360" y="242" width="48" height="8" rx="3" />
      <rect className="fill-soft" x="360" y="292" width="48" height="8" rx="3" />

      {/* doctor availability dots */}
      <circle className="fill-secondary" cx="500" cy="196" r="6" />
      <circle className="fill-accent" cx="500" cy="246" r="6" />
      <circle className="fill-secondary" cx="500" cy="296" r="6" />

      {/* heartbeat line */}
      <path
        className="stroke-secondary"
        d="M40 380 H300 L316 358 L334 400 L350 380 H640"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------
   2) DevOverflow: a question, an answer with code, votes and a bookmark
------------------------------------------------------------------- */
export function DevOverflowThumb() {
  return (
    <svg {...svgProps} role="img" aria-label="Question and answer cards with votes and a bookmark">
      <rect className="fill-bg" width="680" height="411" />

      {/* question card */}
      <rect className="fill-surface stroke-line" x="50" y="60" width="400" height="140" rx="12" strokeWidth="1" />
      <circle className="fill-accent" cx="98" cy="110" r="26" />
      {/* simple question mark made of two shapes */}
      <rect fill="#ffffff" x="93" y="98" width="10" height="16" rx="3" />
      <rect fill="#ffffff" x="93" y="118" width="10" height="9" rx="3" />
      {/* text lines */}
      <rect className="fill-line" x="144" y="92" width="270" height="10" rx="3" />
      <rect className="fill-line" x="144" y="112" width="220" height="10" rx="3" style={{ opacity: 0.6 }} />
      <rect className="fill-line" x="144" y="132" width="160" height="10" rx="3" style={{ opacity: 0.6 }} />
      {/* tags */}
      <rect className="fill-line" x="144" y="160" width="58" height="22" rx="4" style={{ opacity: 0.6 }} />
      <rect className="fill-line" x="210" y="160" width="62" height="22" rx="4" style={{ opacity: 0.6 }} />

      {/* accepted answer card */}
      <rect className="fill-surface stroke-secondary" x="110" y="225" width="400" height="140" rx="12" strokeWidth="1" />
      <circle className="fill-secondary" cx="154" cy="262" r="20" />
      <path
        className="stroke-bg"
        d="M145 262 L152 270 L164 255"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* code block */}
      <rect className="fill-bg" x="190" y="245" width="296" height="100" rx="6" />
      <rect className="fill-accent" x="206" y="259" width="80" height="8" rx="2" />
      <rect className="fill-soft" x="296" y="259" width="110" height="8" rx="2" />
      <rect className="fill-secondary" x="224" y="279" width="130" height="8" rx="2" />
      <rect className="fill-soft" x="224" y="299" width="84" height="8" rx="2" />
      <rect className="fill-accent" x="206" y="319" width="44" height="8" rx="2" />

      {/* vote column */}
      <rect className="fill-surface stroke-line" x="520" y="60" width="110" height="190" rx="12" strokeWidth="1" />
      <path className="fill-accent" d="M575 82 L597 114 H553 Z" />
      <rect fill="#ffffff" x="548" y="140" width="54" height="8" rx="3" />
      <rect fill="#ffffff" x="556" y="154" width="38" height="8" rx="3" style={{ opacity: 0.6 }} />
      <path className="fill-line" d="M553 190 H597 L575 222 Z" />

      {/* bookmark */}
      <path className="fill-soft" d="M555 275 H595 V338 L575 322 L555 338 Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   3) Lumins Shop: product cards with hearts, above a shopping cart
------------------------------------------------------------------- */
export function LuminsShopThumb() {
  return (
    <svg {...svgProps} role="img" aria-label="Product cards above a shopping cart">
      <rect className="fill-bg" width="680" height="411" />

      {/* product card 1 */}
      <rect className="fill-surface stroke-line" x="50" y="40" width="170" height="190" rx="12" strokeWidth="1" />
      <circle className="fill-primary" cx="135" cy="110" r="42" />
      <circle className="fill-soft" cx="135" cy="110" r="22" />
      <rect className="fill-line" x="70" y="170" width="100" height="8" rx="3" />
      <rect className="fill-secondary" x="70" y="192" width="64" height="24" rx="12" />
      <path className="fill-accent" d="M200 80 C186 68 192 58 200 66 C208 58 214 68 200 80 Z" />

      {/* product card 2 (highlighted border) */}
      <rect className="fill-surface stroke-secondary" x="255" y="40" width="170" height="190" rx="12" strokeWidth="1" />
      <rect className="fill-secondary" x="300" y="76" width="80" height="70" rx="10" />
      <rect className="fill-bg" x="318" y="94" width="44" height="34" rx="6" />
      <rect className="fill-line" x="275" y="170" width="100" height="8" rx="3" />
      <rect className="fill-secondary" x="275" y="192" width="64" height="24" rx="12" />
      <path className="fill-accent" d="M405 80 C391 68 397 58 405 66 C413 58 419 68 405 80 Z" />

      {/* product card 3 */}
      <rect className="fill-surface stroke-line" x="460" y="40" width="170" height="190" rx="12" strokeWidth="1" />
      <path className="fill-accent" d="M545 70 L585 110 L545 150 L505 110 Z" />
      <path className="fill-soft" d="M545 90 L565 110 L545 130 L525 110 Z" />
      <rect className="fill-line" x="480" y="170" width="100" height="8" rx="3" />
      <rect className="fill-secondary" x="480" y="192" width="64" height="24" rx="12" />
      <path className="fill-accent" d="M610 80 C596 68 602 58 610 66 C618 58 624 68 610 80 Z" />

      {/* shopping cart */}
      <path
        className="stroke-soft"
        d="M232 262 H258 L282 330"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path className="fill-primary" d="M262 280 H440 L420 336 H284 Z" />
      <circle className="fill-secondary" cx="304" cy="360" r="11" />
      <circle className="fill-secondary" cx="400" cy="360" r="11" />

      {/* item count badge */}
      <circle className="fill-accent" cx="436" cy="274" r="17" />
      <rect className="fill-bg" x="431" y="266" width="10" height="16" rx="3" />
    </svg>
  );
}
