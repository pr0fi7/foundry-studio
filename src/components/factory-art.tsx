import { useId } from "react";

/** Where the product sits at each station: inspect, engineer, verify, launch. */
const stops = [
  { x: -92, y: 53, s: 1 },
  { x: -10, y: 6, s: 1 },
  { x: 92, y: -53, s: 1 },
  { x: 252, y: 48, s: 0.8 },
];
/** Position along the line, 0 (inspect) to 3 (launch); fractions move between. */
function productTransform(travel: number) {
  const t = Math.min(3, Math.max(0, travel));
  const i = Math.min(2, Math.floor(t));
  const f = t - i;
  const a = stops[i];
  const b = stops[i + 1];
  // The last leg lifts the product off the belt and onto the shipping tile.
  const lift = i === 2 ? Math.sin(f * Math.PI) * 46 : 0;
  const x = a.x + (b.x - a.x) * f;
  const y = a.y + (b.y - a.y) * f - lift;
  const s = a.s + (b.s - a.s) * f;
  return `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${s.toFixed(3)})`;
}

const bugs = [
  { x: 318, y: 276, r: -28 },
  { x: 386, y: 312, r: 20 },
  { x: 344, y: 334, r: -60 },
];

/** Original vector artwork. No models, textures, external requests, or WebGL. */
export function FactoryArt({
  stage = 3,
  mode = "build",
  intro = false,
  productKey = 0,
}: {
  stage?: number;
  mode?: "build" | "fix";
  /** Plays the one-off assembly entrance. */
  intro?: boolean;
  /** Changing the key drops a fresh product onto the start of the line. */
  productKey?: number;
}) {
  const id = useId().replace(/:/g, "");
  const broken = mode === "fix" && stage < 2;
  return (
    <svg
      viewBox="0 0 760 610"
      fill="none"
      aria-hidden="true"
      className={`factory-art mode-${mode} stage-${stage} ${intro ? "intro" : ""}`}
    >
      <defs>
        <linearGradient
          id={`${id}-floor`}
          x1="180"
          y1="200"
          x2="600"
          y2="550"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF" />
          <stop offset="1" stopColor="#E1E4E8" />
        </linearGradient>
        <linearGradient
          id={`${id}-metal`}
          x1="150"
          y1="250"
          x2="400"
          y2="450"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F7F5F0" />
          <stop offset="1" stopColor="#ADB8C9" />
        </linearGradient>
        <linearGradient
          id={`${id}-blue`}
          x1="400"
          y1="170"
          x2="510"
          y2="350"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4C63F2" />
          <stop offset="1" stopColor="#3649B8" />
        </linearGradient>
        <filter
          id={`${id}-shadow`}
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <pattern
          id={`${id}-grid`}
          width="38"
          height="38"
          patternUnits="userSpaceOnUse"
          patternTransform="matrix(1 .577 -1 .577 380 160)"
        >
          <path d="M38 0H0V38" stroke="#ADB8C9" strokeOpacity=".2" />
        </pattern>
      </defs>
      <g className="fa-floor">
        <ellipse
          cx="390"
          cy="493"
          rx="252"
          ry="54"
          fill="#1C2533"
          opacity=".12"
          filter={`url(#${id}-shadow)`}
        />
        <path d="M40 347 383 148 724 345 381 545Z" fill={`url(#${id}-floor)`} />
        <path d="M40 347 381 545V564L40 367Z" fill="#E1E4E8" />
        <path d="m381 545 343-200v20L381 564Z" fill="#ADB8C9" />
        <path d="M40 347 383 148 724 345 381 545Z" fill={`url(#${id}-grid)`} />
        <path
          d="m83 352 72 42m475-65 52 30M366 173l-48 28"
          stroke="#ADB8C9"
          strokeWidth="2"
        />
      </g>
      <g className="fa-belt">
        <path
          d="m129 413 20 12v42l-20-12Zm158 91 20 12v39l-20-12Zm265-307 20 12v45l-20-12Z"
          fill="#ADB8C9"
        />
        <path
          d="m149 425 12-7v42l-12 7Zm158 91 13-8v39l-13 8Z"
          fill="#606B7A"
        />
        <path d="m107 369 358-207 166 96-358 207Z" fill="#1C2533" />
        <path d="m107 369 166 96v32l-166-96Z" fill={`url(#${id}-metal)`} />
        <path d="m273 465 358-207v32L273 497Z" fill="#ADB8C9" />
        {Array.from({ length: 17 }, (_, i) => (
          <g key={i}>
            <path
              d={`m${119 + i * 21} ${369 - i * 12.12} 150 86.6`}
              stroke="#606B7A"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d={`m${119 + i * 21} ${366 - i * 12.12} 150 86.6`}
              stroke="#ADB8C9"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        ))}
        {/* Moving marks along the rollers. */}
        <path
          className="belt-flow"
          d="m168 380 360-208m-290 248 360-208"
          stroke="#F7F5F0"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 22"
          opacity=".55"
        />
        <path d="m103 359 168 97 366-211v13L271 470l-168-97Z" fill="#E1E4E8" />
        <path
          d="m106 359 361-209 170 95-366 211Z"
          stroke="#FFF"
          strokeWidth="5"
        />
        <path
          className="belt-led"
          d="m290 473 34-20v8l-34 20Z"
          fill={broken ? "#C84B4B" : "#4C63F2"}
        />
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            className="belt-dot"
            cx={343 + i * 17}
            cy={445 - i * 10}
            r="3"
            fill="#F7F5F0"
          />
        ))}
      </g>
      {/* Testing arch, extruded cobalt housing. */}
      <g className="fa-arch">
        <path
          d="m453 197-1-122 35-20 160 92v134l-35 21V167l-125-72v122Z"
          fill={`url(#${id}-blue)`}
        />
        <path d="m452 75 160 92 35-20-160-92Z" fill="#4C63F2" />
        <path
          d="m452 75 160 92v135l-23-14V181L475 115v95l-23-13Z"
          fill="#3649B8"
        />
        <path d="m475 116 114 66v106l-114-66Z" fill="#BDECDD" opacity=".12" />
        <path
          className="scan-beam"
          d="m479 157 105 61v10l-105-61Z"
          fill="#BDECDD"
          opacity=".8"
        />
        <path d="m500 107 39 23v8l-39-23Z" fill="#F7F5F0" opacity=".8" />
        <path
          className={`arch-light ${broken ? "alarm" : ""}`}
          d="m553 138 14 8v8l-14-8Z"
          fill={stage >= 2 ? "#BDECDD" : broken ? "#C84B4B" : "#FFAD58"}
        />
      </g>
      {/* Robot stand and segmented arm. */}
      <g className="fa-arm">
        <ellipse
          cx="226"
          cy="294"
          rx="62"
          ry="26"
          fill="#1C2533"
          opacity=".12"
        />
        <path d="m174 265 51-30 53 30v24l-52 31-52-30Z" fill="#ADB8C9" />
        <path d="m174 265 51-30 53 30-52 31Z" fill="#F7F5F0" />
        <path d="m226 296 52-31v24l-52 31Z" fill="#606B7A" />
        <path
          d="M201 255v-28c0-17 51-17 51 0v28c0 18-51 18-51 0"
          fill="#4C63F2"
        />
        <ellipse cx="226.5" cy="226" rx="25.5" ry="13" fill="#4C63F2" />
        <g className="robot-arm">
          <path
            d="m226 226-42-88"
            stroke="#606B7A"
            strokeWidth="29"
            strokeLinecap="round"
          />
          <path
            d="m219 221-42-88"
            stroke="#FFAD58"
            strokeWidth="25"
            strokeLinecap="round"
          />
          <path
            d="m184 138 80-47"
            stroke="#606B7A"
            strokeWidth="29"
            strokeLinecap="round"
          />
          <path
            d="m177 133 80-47"
            stroke="#FFAD58"
            strokeWidth="25"
            strokeLinecap="round"
          />
          <circle cx="177" cy="133" r="20" fill="#F7F5F0" />
          <circle cx="177" cy="133" r="10" fill="#ADB8C9" />
          <circle cx="177" cy="133" r="5" fill="#1C2533" />
          <circle cx="257" cy="86" r="18" fill="#F7F5F0" />
          <circle cx="257" cy="86" r="9" fill="#1C2533" />
          <path
            d="m264 92 37 31v28"
            stroke="#E1E4E8"
            strokeWidth="21"
            strokeLinecap="round"
          />
          <path
            d="m288 151-9 12 10 14m25-26 8 12-10 14"
            stroke="#1C2533"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M296 147h12v13h-12Z" fill="#4C63F2" />
          <g className="sparks">
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i / 8) * Math.PI * 2;
              return (
                <path
                  key={i}
                  d={`M${302 + Math.cos(a) * 9} ${178 + Math.sin(a) * 9}L${302 + Math.cos(a) * 22} ${178 + Math.sin(a) * 22}`}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              );
            })}
            <circle cx="302" cy="178" r="6" />
          </g>
        </g>
      </g>
      {/* Shipping tile sits under the product when it lands. */}
      <g className="fa-tile">
        <path d="m527 386 73-42 69 40v14l-73 42-69-40Z" fill="#ADB8C9" />
        <path
          className="tile-top"
          d="m527 386 73-42 69 40-73 42Z"
          fill="#BDECDD"
        />
        <path
          d="m580 382 12 13 27-26"
          stroke="#1C2533"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      {/* A single travelling product, always present in the static fallback. */}
      <g
        className="factory-product"
        style={{ transform: productTransform(stage) }}
      >
        <g
          className={`product-body ${productKey ? "respawn" : ""} ${productKey === 1 ? "first" : ""}`}
          key={productKey}
        >
          <g className="inspect-ring">
            <ellipse
              cx="340"
              cy="345"
              rx="128"
              ry="66"
              stroke="#4C63F2"
              strokeWidth="2.5"
              strokeDasharray="8 9"
            />
            <g className="magnifier">
              <circle cx="246" cy="214" r="15" fill="#F7F5F0" />
              <circle
                cx="246"
                cy="214"
                r="15"
                stroke="#1C2533"
                strokeWidth="5"
              />
              <path
                d="m257 225 12 12"
                stroke="#1C2533"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </g>
          </g>
          <path d="m269 331 97-56 109 63-97 56Z" fill="#1C2533" opacity=".15" />
          <path d="m291 253 134 77v40l-134-77Z" fill="#ADB8C9" />
          <path d="m279 214 144 83v80l-144-83Z" fill="#1C2533" />
          <path d="m279 214 13-8 144 83-13 8Z" fill="#606B7A" />
          <path d="m423 297 13-8v80l-13 8Z" fill="#606B7A" />
          <path
            className="screen"
            d="m289 231 124 72v56l-124-72Z"
            fill="#F7F5F0"
          />
          <g className="wireframe">
            <path
              d="m289 223 124 72v11l-124-72Zm10 19 27 16v34l-27-16Zm35 22 68 39v10l-68-39Zm0 17 29 17v19l-29-17Zm35 20 33 19v19l-33-19Z"
              stroke="#4C63F2"
              strokeWidth="1.6"
              strokeDasharray="4 3"
            />
          </g>
          <g className="screen-ui">
            <path d="m289 223 124 72v11l-124-72Z" fill="#4C63F2" />
            <path d="m299 242 27 16v34l-27-16Z" fill="#E1E4E8" />
            <path d="m334 264 68 39v10l-68-39Z" fill="#BDECDD" />
            <path d="m334 281 29 17v19l-29-17Z" fill="#4C63F2" />
            <path d="m369 301 33 19v19l-33-19Z" fill="#E1E4E8" />
          </g>
          <g className="fault">
            <path
              d="m289 231 124 72v56l-124-72Z"
              fill="#C84B4B"
              opacity=".16"
            />
            <path
              className="glitch"
              d="m289 252 124 72v5l-124-72Zm0 22 124 72v3l-124-72Z"
              fill="#C84B4B"
              opacity=".55"
            />
            <path
              d="m352 262-9 18 11 4-8 20"
              stroke="#1C2533"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <path
            className="scan-wash"
            d="m289 231 124 72v56l-124-72Z"
            fill="#BDECDD"
          />
          <path
            className="scan-line"
            d="m283 219 146 84"
            stroke="#BDECDD"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <g className="issue-spot" opacity={broken ? 1 : 0}>
            <circle cx="388" cy="326" r="9" fill="#C84B4B" />
            <path d="M388 321v5m0 4v1" stroke="white" strokeWidth="2" />
          </g>
          <path d="m279 294 144 83-24 14-145-84Z" fill="#E1E4E8" />
          <path d="m254 307 145 84v6l-145-84Z" fill="#ADB8C9" />
          <path d="m312 321 61 35-12 7-61-35Z" fill="#ADB8C9" />
          {bugs.map((b, i) => (
            <g
              key={i}
              className="bug"
              transform={`translate(${b.x} ${b.y}) rotate(${b.r})`}
            >
              <g className="bug-body">
                <path
                  d="M-5-4-10-8M-6 0h-6M-5 4l-5 4M5-4l5-4M6 0h6M5 4l5 4"
                  stroke="#1C2533"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <ellipse rx="6" ry="8" fill="#C84B4B" />
                <path d="M0-7v14" stroke="#1C2533" strokeWidth="1.2" />
                <circle cy="-9" r="3.6" fill="#1C2533" />
              </g>
            </g>
          ))}
          <g className="smoke">
            <circle cx="330" cy="196" r="9" fill="#ADB8C9" />
            <circle cx="356" cy="204" r="12" fill="#ADB8C9" />
            <circle cx="384" cy="214" r="8" fill="#ADB8C9" />
          </g>
        </g>
      </g>
      <g className="ship-badge">
        <circle className="ship-ring" cx="694" cy="296" r="22" />
        <circle cx="694" cy="296" r="19" fill="#BDECDD" />
        <path
          d="m685 296 6 6 12-12"
          stroke="#1C2533"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      {/* A little workshop companion. */}
      <g transform="translate(90 318)">
        <g className="fa-buddy">
          <ellipse cx="0" cy="51" rx="24" ry="9" fill="#1C2533" opacity=".1" />
          <g className="buddy">
            <path
              d="M-16 20v21m30-21v21"
              stroke="#606B7A"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <rect
              x="-22"
              y="-8"
              width="44"
              height="38"
              rx="13"
              fill="#F7F5F0"
              stroke="#ADB8C9"
              strokeWidth="2"
            />
            <rect x="-15" y="0" width="30" height="15" rx="6" fill="#1C2533" />
            <path
              className="buddy-eyes"
              d="M-7 6v3M7 6v3"
              stroke={broken ? "#FFAD58" : "#BDECDD"}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path d="M0-8v-10" stroke="#606B7A" strokeWidth="3" />
            <circle
              className="buddy-bulb"
              cy="-20"
              r="5"
              fill={broken ? "#C84B4B" : "#FFAD58"}
            />
          </g>
        </g>
      </g>
      <g className="fa-paper">
        <path d="m411 486 61-35 37 21-61 35Z" fill="#F7F5F0" stroke="#ADB8C9" />
        <path
          d="m430 483 30-17m-20 23 30-17"
          stroke="#ADB8C9"
          strokeWidth="3"
        />
      </g>
    </svg>
  );
}
