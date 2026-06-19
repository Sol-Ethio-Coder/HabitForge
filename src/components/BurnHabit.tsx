import { useState, useRef } from "react";

export default function BurnHabit() {
  const [habit, setHabit] = useState("");
  const [burning, setBurning] = useState(false);
  const [destroyed, setDestroyed] = useState(false);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [embers, setEmbers] = useState<{ id: number; tx: string; ty: string; left: string; top: string }[]>([]);

  const handleBurn = () => {
    if (!habit.trim() || burning) return;
    setBurning(true);

    // Generate embers for particle effect
    const newEmbers = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + i,
      tx: `${(Math.random() - 0.5) * 200}px`,
      ty: `${-50 - Math.random() * 150}px`,
      left: `${40 + Math.random() * 20}%`,
      top: `50%`,
    }));
    setEmbers(newEmbers);

    setTimeout(() => {
      setBurning(false);
      setDestroyed(true);
      setHabit("");
      
      setTimeout(() => {
        setDestroyed(false);
        setEmbers([]);
      }, 4000);
    }, 2000); // 2 seconds for burn animation
  };

  return (
    <section id="burn" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-red-500/20">
            Psychological Release
          </span>
          <h2 className="mt-4 text-4xl sm:text-6xl font-black tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600">
              Burn
            </span> a Bad Habit
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto text-lg">
            Writing down what holds you back and visually destroying it provides psychological closure. Try it.
          </p>
        </div>

        <div className="glass glow-card rounded-[3rem] p-10 sm:p-20 border border-white/10 reveal relative min-h-[350px] flex flex-col items-center justify-center">
          
          {!destroyed && (
            <div className={`transition-all duration-500 w-full max-w-lg ${burning ? "opacity-0 pointer-events-none scale-110" : "opacity-100 scale-100"}`}>
              <input
                type="text"
                value={habit}
                onChange={(e) => setHabit(e.target.value)}
                placeholder="What do you want to let go of?"
                maxLength={40}
                onKeyDown={(e) => e.key === 'Enter' && handleBurn()}
                className="w-full text-center text-2xl sm:text-3xl font-black bg-transparent border-b-2 border-white/20 pb-4 focus:border-orange-500 outline-none text-white placeholder-white/20 transition-colors"
              />
              <button
                onClick={handleBurn}
                disabled={!habit.trim()}
                className="mt-10 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 font-black tracking-widest uppercase text-white shadow-xl shadow-red-500/20 hover:shadow-red-500/50 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300"
              >
                Incinerate It
              </button>
            </div>
          )}

          {/* Burning Text Overlay */}
          {burning && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h3 
                ref={textRef}
                className="text-4xl sm:text-5xl font-black burn-anim"
              >
                {habit}
              </h3>
              {/* Embers */}
              {embers.map((ember) => (
                <div
                  key={ember.id}
                  className="ember w-2 h-2"
                  style={{
                    left: ember.left,
                    top: ember.top,
                    '--tx': ember.tx,
                    '--ty': ember.ty,
                  } as any}
                />
              ))}
            </div>
          )}

          {/* Success State */}
          {destroyed && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bounce-in">
              <div className="text-6xl mb-4">💨</div>
              <h3 className="text-2xl font-black text-white/90">It's gone.</h3>
              <p className="text-white/50 mt-2">A new beginning starts now.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
