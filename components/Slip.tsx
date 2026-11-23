const bars = [2,1,3,1,1,2,4,1,2,1,3,2,1,1,4,2,1,3,1,2,2,1,1,3,2,4,1,1,2,3,1,2,1,4,1,2];

export default function Slip() {
  return (
    <div className="motion-safe:animate-print mx-auto w-full max-w-sm -rotate-2 bg-white px-7 pb-8 pt-7 shadow-[0_18px_40px_-18px_rgba(10,37,64,.45)]"
      style={{ clipPath: "polygon(0 0,100% 0,100% 97%,96% 100%,92% 97%,88% 100%,84% 97%,80% 100%,76% 97%,72% 100%,68% 97%,64% 100%,60% 97%,56% 100%,52% 97%,48% 100%,44% 97%,40% 100%,36% 97%,32% 100%,28% 97%,24% 100%,20% 97%,16% 100%,12% 97%,8% 100%,4% 97%,0 100%)" }}>
      <p className="text-sm text-royal">Payment slip</p>
      <p className="mt-1 font-display text-5xl font-bold">$25.00</p>
      <p className="mt-1 text-sm">Utility bill payment</p>
      <div className="mt-6 flex h-20 items-stretch gap-[2px]" aria-hidden>
        {bars.map((w, i) => (
          <span key={i} className="bg-ink" style={{ width: w * 2 }} />
        ))}
      </div>
      <p className="mt-2 font-mono text-xs tracking-widest">4821 9937 0612</p>
      <dl className="mt-6 grid grid-cols-2 gap-y-1 border-t border-dashed border-line pt-4 text-sm">
        <dt className="text-royal">Pay at</dt><dd className="text-right">Any agent</dd>
        <dt className="text-royal">Valid for</dt><dd className="text-right">48 hours</dd>
      </dl>
    </div>
  );
}
