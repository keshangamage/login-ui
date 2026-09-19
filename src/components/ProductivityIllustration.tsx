export function ProductivityIllustration() {
  return (
    <svg
      className="productivity-illustration"
      viewBox="0 0 680 540"
      role="img"
      aria-label="A person calmly organizing their work"
    >
      <path className="orbit-line" d="M204 172c-25-74 59-101 82-49 21-87 132-84 148 3 34-53 115-14 88 54 70-12 88 75 35 102" />
      <circle className="orbit-dot" cx="202" cy="173" r="7" />
      <circle className="orbit-dot" cx="557" cy="282" r="7" />

      <g className="floating-card card-left">
        <rect x="56" y="86" width="117" height="96" rx="30" />
        <circle cx="114" cy="126" r="22" />
        <path d="M88 164c14-21 42-21 55 0" />
        <path d="M102 123c8-10 18-9 24 0M106 138c6 5 12 5 18 0" />
      </g>

      <g className="floating-card card-right">
        <rect x="522" y="314" width="112" height="112" rx="32" />
        <path d="M550 348h56M550 369h42M550 390h51" />
        <circle className="status-dot" cx="609" cy="391" r="8" />
      </g>

      <g className="person">
        <path className="hair" d="M316 209c10-41 70-54 102-20 28 29 10 82-24 95l-73-10c-26-16-24-45-5-65Z" />
        <ellipse className="skin" cx="367" cy="237" rx="38" ry="48" />
        <path d="M347 236h1M385 236h1M355 257c8 7 16 7 24 0" />
        <path className="shirt" d="M293 292c33-31 118-31 151 0l26 115H267l26-115Z" />
        <path className="heart" d="M346 322c0-23 37-24 37 0 0-24 38-23 38 0 0 28-38 49-38 49s-37-21-37-49Z" />
        <path className="arm" d="M294 310c-41 15-55 51-77 76-16 18-40-6-27-27l50-77" />
        <path className="arm" d="M442 310c40 14 58 45 83 69 18 17 40-9 24-29l-55-69" />
        <path className="leg" d="M303 406c-31 31-64 51-104 62 53 27 117 10 169-31" />
        <path className="leg" d="M433 406c31 31 64 51 104 62-53 27-117 10-169-31" />
      </g>

      <g className="task-card">
        <rect x="95" y="353" width="201" height="143" rx="30" />
        <text x="122" y="393">Today</text>
        <text className="task-label" x="122" y="421">4 of 5 tasks</text>
        <rect className="progress-track" x="122" y="443" width="130" height="11" rx="6" />
        <rect className="progress-value" x="122" y="443" width="104" height="11" rx="6" />
        <circle className="progress-ring" cx="255" cy="393" r="23" />
        <text className="progress-number" x="244" y="399">80</text>
      </g>
    </svg>
  )
}
