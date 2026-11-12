export default function Background({ mode }) {
  if (mode === "plain") return <div className="bg" />;
  const staff = [0, 1, 2, 3, 4];
  return (
    <svg className="bg" width="100%" height="100%" aria-hidden="true">
      <defs>
        <pattern id="st" width="400" height="190" patternUnits="userSpaceOnUse">
          {staff.map((i) => <line key={i} x1="0" x2="400" y1={50 + i * 12} y2={50 + i * 12} stroke="currentColor" strokeWidth="1.2" />)}
          {mode !== "staff" && <>
            <text x="40" y="82" fontSize="46" fill="currentColor">♪</text>
            <text x="150" y="62" fontSize="52" fill="currentColor">♫</text>
            <text x="270" y="92" fontSize="46" fill="currentColor">♩</text>
            <text x="340" y="70" fontSize="40" fill="currentColor">♬</text>
          </>}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#st)" />
    </svg>
  );
}