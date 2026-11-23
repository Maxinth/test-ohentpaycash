const pins = [["22%", "30%"], ["58%", "22%"], ["70%", "62%"], ["35%", "70%"]];

export default function MiniMap({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`relative overflow-hidden bg-sky ${className}`}
      style={{ backgroundImage: "linear-gradient(#cfe0f5 1px,transparent 1px),linear-gradient(90deg,#cfe0f5 1px,transparent 1px)", backgroundSize: "36px 36px" }}>
      <span className="absolute -left-4 top-1/3 h-3 w-[120%] -rotate-12 bg-white/80" />
      <span className="absolute left-1/2 top-0 h-[120%] w-3 rotate-12 bg-white/80" />
      {pins.map(([left, top], i) => (
        <span key={i} className="absolute" style={{ left, top }}>
          <span className="absolute inline-flex h-4 w-4 rounded-full bg-saffron/60 motion-safe:animate-ping" style={{ animationDelay: `${i * 0.4}s` }} />
          <span className="relative block h-4 w-4 rounded-full border-2 border-white bg-ink" />
        </span>
      ))}
    </div>
  );
}
