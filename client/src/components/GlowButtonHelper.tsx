import React from 'react';
import clsx from 'clsx'; // Optional: for easier className merging

interface GlowButtonHelperProps {
  glowColor?: string;           // Default: white
  shadowSize?: string;          // Default: '0_0_100px_0px'
  position?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  className?: string;           // For any additional styling
}

const GlowButtonHelper: React.FC<GlowButtonHelperProps> = ({
  glowColor = 'rgba(255,255,255,1)',
  shadowSize = '0_0_100px_0px',
  position = { top: '-60%', right: '-3.5rem' }, // right: -14 in Tailwind = -3.5rem
  className = '',
}) => {
  const style: React.CSSProperties = {
    top: position.top,
    right: position.right,
    bottom: position.bottom,
    left: position.left,
  };

  const shadowClass = `shadow-[${shadowSize}_${glowColor}]`;

  return (
    <div
      className={clsx(
        'transition-shadow h-4 w-full absolute',
        shadowClass,
        className
      )}
      style={style}
    />
  );
};

export default GlowButtonHelper;
