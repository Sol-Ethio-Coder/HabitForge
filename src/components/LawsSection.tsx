import { laws } from "../data";

export default function LawsSection() {
  return (
    <section id="laws" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg">
            Atomic Habits Framework
          </span>
          <h2 className="mt-4 text-4xl sm:text-6xl font-black tracking-tight">
            The <span className="grad-text">4 Laws</span> of Behavior Change
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto text-lg">
            Flip these laws to build habits — invert them to break habits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {laws.map((law, i) => (
            <div
              key={law.num}
              className="tilt glow-card glass rounded-3xl p-8 reveal group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="text-6xl font-black text-white/10 group-hover:text-white/30 transition">
                  {law.num}
                </div>
                <div className="text-5xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
                  {law.icon}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl p-4 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-400/20 hover:border-emerald-400/60 transition group/box">
                  <div className="text-xs uppercase tracking-wider text-emerald-300 mb-1 font-bold">To Build</div>
                  <div className="font-bold text-white group-hover/box:text-emerald-300 transition">{law.build}</div>
                </div>
                <div className="rounded-2xl p-4 bg-gradient-to-br from-rose-500/20 to-red-500/10 border border-rose-400/20 hover:border-rose-400/60 transition group/box">
                  <div className="text-xs uppercase tracking-wider text-rose-300 mb-1 font-bold">To Break</div>
                  <div className="font-bold text-white group-hover/box:text-rose-300 transition">{law.break}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
