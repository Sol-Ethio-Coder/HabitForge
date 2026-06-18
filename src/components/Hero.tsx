export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 bounce-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-ring" />
          <span className="text-sm text-white/80">Transform your life one habit at a time</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight">
          <span className="block">Forge</span>
          <span className="block grad-text">Better Habits</span>
          <span className="block text-white/90">Break Bad Ones</span>
        </h1>

        <p className="mt-8 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          A beautiful, science‑backed companion to help you build the habits you want and quit the ones holding you back. Works completely offline.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#tracker"
            className="btn-shine group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold text-white shadow-2xl shadow-violet-600/40 hover:shadow-violet-600/70 hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Tracking
              <svg className="w-5 h-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>
          <a
            href="#build"
            className="px-8 py-4 rounded-2xl glass font-bold text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 border border-white/10"
          >
            Explore Tips
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { num: "66", label: "Avg days to form a habit", icon: "⏳" },
            { num: "21", label: "Days to break a pattern", icon: "🔄" },
            { num: "4", label: "Laws of behavior change", icon: "⚖️" },
            { num: "∞", label: "Possibilities ahead", icon: "🚀" },
          ].map((s, i) => (
            <div
              key={i}
              className="glow-card glass rounded-2xl p-5 group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-500 inline-block">
                {s.icon}
              </div>
              <div className="text-3xl font-black grad-text">{s.num}</div>
              <div className="text-xs text-white/60 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 grid place-items-start p-1">
          <div className="w-1 h-2 rounded-full bg-white/70 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
