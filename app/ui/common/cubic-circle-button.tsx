import { useState } from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export default function CubicCircleButton({
  className,
  onPointerDown,
  onPointerUp,
  children,
  ...rest
}: ButtonProps) {
  const [scale, setScale] = useState(1);
  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    setScale(0.9);
    onPointerDown?.(event);
  };
  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    setScale(1);
    onPointerUp?.(event);
  };
  return (
    <button
      className={`cubic-filter w-18 h-18 block cursor-pointer rounded-full bg-[#D90000] ${className}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      {...rest}
      style={{
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </button>
  );
}
