// merge properties of object a to object b
// const merge = (a, b) => ({ ...a, ...b });

function Ball({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`animate-loading ${className}`}
      style={{
        ...style,
        width: '8px',
        height: '8px',
        borderRadius: '50%',
      }}
    />
  );
}

export default function Loading({ className = '', style }: { className?: string; style?: React.CSSProperties}) {
  return (
    <div className={`flex w-fit flex-row gap-2 ${className}`} style={style}>
      <Ball
        style={{ animationDelay: '0ms', backgroundColor: 'rgb(97, 102, 197)' }}
      />
      <Ball
        style={{
          animationDelay: '100ms',
          backgroundColor: 'rgb(83, 135, 185)',
        }}
      />
      <Ball
        style={{
          animationDelay: '200ms',
          backgroundColor: 'rgb(69, 161, 175)',
        }}
      />
      <Ball
        style={{
          animationDelay: '300ms',
          backgroundColor: 'rgb(50, 130, 132)',
        }}
      />
      <Ball
        style={{
          animationDelay: '400ms',
          backgroundColor: 'rgb(53, 198, 156)',
        }}
      />
    </div>
  );
}


// Loading animation
export const shimmer =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-card-body/60 before:to-transparent';

