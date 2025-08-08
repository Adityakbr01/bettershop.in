import React from "react";

interface RadialGlowBackgroundProps {
  glowColor?: string; // e.g., 'rgba(255, 115, 0, 1)'
  opacity?: number;   // e.g., 0.4
  size?: string;      // e.g., '150%' for large coverage
  position?: string;  // e.g., 'top left', 'center', etc.
  zIndex?: number;    // e.g., -1 for background
  className?: string;
}

const RadialGlowBackground: React.FC<RadialGlowBackgroundProps> = ({
  glowColor = "rgba(255,255,255,0.8)",
  opacity = 0.2,
  size = "150%",
  position = "top right",
  zIndex = -1,
  className = "",
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className} `}
      style={{
        zIndex,
        background: `radial-gradient(circle at ${position}, ${glowColor}, transparent ${size})`,
        opacity,
      }}
    />
  );
};

export default RadialGlowBackground;
