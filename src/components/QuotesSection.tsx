import { useState } from "react";
import { quotes } from "../data";

export default function QuotesSection() {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % quotes.length);
  const prev = () => setI((p) => (p - 1 + quotes.length) % quotes.length);

  return (
    <section id="quotes" className="relative py-24 px-6 overflow-hidden">
      {/* Marquee strip */}
      <div className="mb-16 -mx-6 overflow-hidden mask-edges">
        <div className="marquee-track flex gap-12 whitespace-nowrap text-4xl sm:text-6xl font-black text-white/5">
          {[...quotes, ...quotes].map((q, idx) => (
            <span key={idx} className="flex items-center gap-12">
              {q.split("—")[0]}
              <span className="text-violet-500/30">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg">
            Daily Wisdom
          </span>
          <h2 className="mt-4 text-4xl sm:text-6xl font-black tracking-tight">
            Fuel Your <span className="grad-text">Mindset</span>
          </h2>
        </div>

        <div className="glass rounded-3xl p-8 sm:p-14 relative reveal border border-white/10 overflow-hidden">
          <div className="absolute -top-10 -left-10 text-[12rem] font-black text-violet-500/10 select-none">"</div>
          <div className="relative z-10 min-h-[140px] grid place-items-center">
            <p key={i} className="bounce-in text-xl sm:text-3xl font-medium text-center text-white/95 leading-relaxed">
              {quotes[i]}
            </p>
          </div>

          <div className="flex items-center justify-between mt-8 relative z-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full glass hover:bg-white/10 grid place-items-center transition hover:-translate-x-1"
              aria-label="Previous"
            >
              ←
            </button>

            <div className="flex gap-2">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-2 rounded-full transition-all ${
                    i === idx ? "w-8 bg-gradient-to-r from-violet-400 to-cyan-400" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Quote ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full glass hover:bg-white/10 grid place-items-center transition hover:translate-x-1"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
