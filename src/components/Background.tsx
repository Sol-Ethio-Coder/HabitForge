export default function Background() {
  const particles = Array.from({ length: 40 });
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030014]">
      {/* Noise overlay for premium texture */}
      <div className="noise-overlay" />
      
      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 bg-mesh mix-blend-screen opacity-70" />
      
      {/* Ambient Grid Background (Fades at edges) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)]" />

      {/* Deep Glowing Orbs */}
      <div className="blob bg-violet-600/40 w-[600px] h-[600px] top-[-150px] left-[-150px]" />
      <div className="blob bg-cyan-600/30 w-[500px] h-[500px] top-[30%] right-[-100px]" style={{ animationDelay: "2s", animationDuration: "22s" }} />
      <div className="blob bg-fuchsia-600/30 w-[700px] h-[700px] bottom-[-250px] left-[15%]" style={{ animationDelay: "5s", animationDuration: "25s" }} />
      <div className="blob bg-blue-600/20 w-[400px] h-[400px] bottom-[20%] right-[20%]" style={{ animationDelay: "8s", animationDuration: "20s" }} />

      {/* Floating Star Particles */}
      {particles.map((_, i) => {
        const size = Math.random() * 3 + 1; // 1px to 4px
        return (
          <span
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `-${Math.random() * 20}s`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        );
      })}
    </div>
  );
}
