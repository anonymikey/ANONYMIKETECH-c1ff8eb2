import type { SVGProps } from "react";

type LogoProps = SVGProps<SVGSVGElement> & {
  variant?: "full" | "mark";
  animated?: boolean;
};

const logoLabel = "ANONYMIKETECH — Engineering Intelligent Digital Experiences";

export function Logo({
  variant = "full",
  animated = false,
  className = "",
  ...props
}: LogoProps) {
  const isMark = variant === "mark";

  return (
    <svg
      {...props}
      className={`brand-logo ${animated ? "brand-logo--reveal" : ""} ${className}`}
      viewBox={isMark ? "0 0 220 220" : "0 0 900 220"}
      role="img"
      aria-label={isMark ? "ANONYMIKETECH brand mark" : logoLabel}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="brand-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dffbff" />
          <stop offset="0.38" stopColor="#8fe9ff" />
          <stop offset="0.72" stopColor="#2abce8" />
          <stop offset="1" stopColor="#0876bd" />
        </linearGradient>
        <linearGradient id="brand-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe8a4" />
          <stop offset="0.42" stopColor="#d4a22f" />
          <stop offset="1" stopColor="#87601a" />
        </linearGradient>
        <linearGradient id="brand-wordmark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f7fbff" />
          <stop offset="0.48" stopColor="#b9d6e2" />
          <stop offset="1" stopColor="#6d8d9d" />
        </linearGradient>
        <radialGradient id="brand-core" cx="0.38" cy="0.28" r="0.78">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.25" stopColor="#9ff2ff" />
          <stop offset="0.63" stopColor="#1b9ee0" />
          <stop offset="1" stopColor="#075a9d" />
        </radialGradient>
        <filter id="brand-glow-blue" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.08 0 0 0 0 0.69 0 0 0 0 0.95 0 0 0 0.75 0"
          />
        </filter>
        <filter id="brand-glow-gold" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.83 0 0 0 0 0.63 0 0 0 0 0.18 0 0 0 0.7 0"
          />
        </filter>
        <filter id="brand-text-shadow" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feOffset dy="1" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.65" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="brand-logo__mark" transform={isMark ? "translate(0 0)" : "translate(8 0)"}>
        <path
          d="M110 14 20 196h180L110 14Z"
          fill="none"
          stroke="url(#brand-glow-blue)"
          strokeWidth="16"
          opacity="0.42"
          filter="url(#brand-glow-blue)"
        />
        <path
          d="M110 14 20 196h180L110 14Z"
          fill="rgba(9,35,55,0.28)"
          stroke="url(#brand-blue)"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path
          d="m110 42-58 127h116L110 42Z"
          fill="none"
          stroke="#81dcf3"
          strokeWidth="3"
          strokeLinejoin="round"
          opacity="0.95"
        />
        <path
          d="M110 42v154M52 169l58-45 58 45M110 124l-25 45M110 124l25 45"
          fill="none"
          stroke="url(#brand-blue)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m74 82-34-34M146 82l34-34"
          fill="none"
          stroke="url(#brand-glow-gold)"
          strokeWidth="8"
          opacity="0.55"
          filter="url(#brand-glow-gold)"
        />
        <path
          d="m74 82-34-34M146 82l34-34"
          fill="none"
          stroke="url(#brand-gold)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <circle cx="40" cy="48" r="5.5" fill="#e8bf61" stroke="#fff0b9" strokeWidth="1.5" />
        <circle cx="180" cy="48" r="5.5" fill="#e8bf61" stroke="#fff0b9" strokeWidth="1.5" />
        <circle
          cx="110"
          cy="117"
          r="29"
          fill="none"
          stroke="#1caee3"
          strokeWidth="12"
          opacity="0.62"
          filter="url(#brand-glow-blue)"
        />
        <circle cx="110" cy="117" r="25" fill="#062f59" stroke="#54d8f5" strokeWidth="3" />
        <circle cx="110" cy="117" r="19" fill="url(#brand-core)" />
        <circle cx="103" cy="110" r="6" fill="#ffffff" opacity="0.75" />
      </g>

      {!isMark && (
        <g className="brand-logo__wordmark" filter="url(#brand-text-shadow)">
          <text
            x="250"
            y="111"
            fill="url(#brand-wordmark)"
            fontFamily="Geist, Arial, sans-serif"
            fontSize="58"
            fontWeight="800"
            letterSpacing="1.5"
          >
            ANONYMIKETECH
          </text>
          <path d="M252 124h544" stroke="url(#brand-gold)" strokeWidth="1.5" opacity="0.8" />
          <text
            x="254"
            y="151"
            fill="#c9a44c"
            fontFamily="Geist Mono, monospace"
            fontSize="15"
            fontWeight="600"
            letterSpacing="3.2"
          >
            ENGINEERING INTELLIGENT DIGITAL EXPERIENCES
          </text>
        </g>
      )}
    </svg>
  );
}

export function BrandMark(props: Omit<LogoProps, "variant">) {
  return <Logo {...props} variant="mark" />;
}