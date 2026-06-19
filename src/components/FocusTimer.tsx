import { useState, useEffect } from "react";

export default function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"focus" | "break">("focus");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: "focus" | "break") => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === "focus" ? 25 * 60 : 5 * 60);
  };

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const secs = (timeLeft % 60).toString().padStart(2, "0");
  const totalTime = mode === "focus" ? 25 * 60 : 5 * 60;
  
  // Calculate SVG Circle Progress
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <section id="focus" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white shadow-lg shadow-violet-500/20">
            Deep Work
          </span>
          <h2 className="mt-4 text-4xl sm:text-6xl font-black tracking-tight">
            Focus <span className="grad-text">Timer</span>
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto text-lg">
            Immerse yourself. Build your habits through undistracted, deep focus sessions.
          </p>
        </div>

        <div className="glass glow-card rounded-[3rem] p-8 sm:p-14 reveal border border-white/10 flex flex-col items-center">
          
          {/* Mode Toggle */}
          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 mb-10 z-10">
            <button
              onClick={() => switchMode("focus")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                mode === "focus" 
                  ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30" 
                  : "text-white/50 hover:text-white"
              }`}
            >
              Focus (25m)
            </button>
            <button
              onClick={() => switchMode("break")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                mode === "break" 
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30" 
                  : "text-white/50 hover:text-white"
              }`}
            >
              Break (5m)
            </button>
          </div>

          {/* Interactive SVG Timer */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center mb-10">
            {/* Background glowing blur */}
            <div className={`absolute inset-0 rounded-full blur-[60px] opacity-20 transition-colors duration-1000 ${
              mode === "focus" ? "bg-violet-500" : "bg-cyan-500"
            }`} />

            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              {/* Track */}
              <circle
                cx="50%" cy="50%" r={radius}
                stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none"
              />
              {/* Progress */}
              <circle
                cx="50%" cy="50%" r={radius}
                stroke="currentColor" strokeWidth="8" fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className={`transition-all duration-1000 ease-linear ${
                  mode === "focus" ? "text-fuchsia-500 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]" : "text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                }`}
              />
            </svg>

            {/* Time Display */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="text-6xl sm:text-7xl font-black tracking-tighter tabular-nums drop-shadow-2xl">
                {mins}:{secs}
              </div>
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mt-2">
                {mode === "focus" ? (isActive ? "Focusing..." : "Ready") : (isActive ? "Relaxing..." : "Take a breath")}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 z-10">
            <button
              onClick={toggleTimer}
              className={`btn-shine w-40 py-4 rounded-2xl font-black text-lg transition-all duration-300 shadow-xl hover:scale-105 ${
                isActive 
                  ? "bg-white/10 text-white hover:bg-white/20 border border-white/20" 
                  : mode === "focus"
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-violet-600/40"
                    : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-cyan-600/40"
              }`}
            >
              {isActive ? "PAUSE" : "START"}
            </button>
            <button
              onClick={resetTimer}
              className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all hover:rotate-180 duration-500"
              aria-label="Reset Timer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
