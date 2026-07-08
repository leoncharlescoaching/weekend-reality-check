export default function Logo({ size = "md", className = "" }) {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl",
  };
  return (
    <div className={`font-display ${sizes[size]} leading-none ${className}`}>
      REALITY <span className="text-orange">CHECK</span>
      <sup className="text-[0.4em] align-super">™</sup>
    </div>
  );
}
