export default function Background() {
  const particles = Array.from({ length: 25 });
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden aurora">
      <div className="blob bg-violet-600 w-[500px] h-[500px] top-[-100px] left-[-100px]" />
      <div className="blob bg-cyan-500 w-[400px] h-[400px] top-[40%] right-[-80px]" style={{ animationDelay: "3s" }} />
      <div className="blob bg-pink-500 w-[450px] h-[450px] bottom-[-100px] left-[30%]" style={{ animationDelay: "6s" }} />
      {particles.map((_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${15 + Math.random() * 20}s`,
            animationDelay: `${Math.random() * 15}s`,
            width: `${4 + Math.random() * 6}px`,
            height: `${4 + Math.random() * 6}px`,
          }}
        />
      ))}
    </div>
  );
}
