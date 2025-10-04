import styles from './svg-with-css-demo.module.css';

interface MySVGProps extends React.SVGAttributes<SVGElement> {}
function Segment({ className = '', ...rest }: MySVGProps) {
  return (
    <g className={`${styles.segment} ${className}`} {...rest}>
      <path
        className={styles.segment_fill}
        d="M0,0 v-200 a40,40 0 0,0 -62,10 z"
      />
      <path className={styles.segment_edge} d="M0,-200 a40,40 0 0,0 -62,10" />
    </g>
  );
}

function Quadrant({ className = '', ...rest }: MySVGProps) {
  return (
    <g className={`${styles.quadrant} ${className}`} {...rest}>
      <Segment transform="rotate(0)" />
      <Segment transform="rotate(18)" />
      <Segment transform="rotate(36)" />
      <Segment transform="rotate(54)" />
      <Segment transform="rotate(72)" />
    </g>
  );
}

function Petals({ ...props }: MySVGProps) {
  return (
    <g {...props}>
      <Quadrant transform="rotate(0)" />
      <Quadrant transform="rotate(90)" />
      <Quadrant transform="rotate(180)" />
      <Quadrant transform="rotate(270)" />
    </g>
  );
}

export default function SvgWithCssDemo() {
  return (
    <svg
      width="600px"
      height="600px"
      viewBox="-300 -300 600 600"
      className={styles.flower_container}
    >
      <title>SVG demonstration</title>
      <desc>Mozilla CSS Getting Started - SVG demonstration</desc>

      <defs>
        <radialGradient
          id="fade"
          cx="0"
          cy="0"
          r="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop className={styles.fade_stop_1} offset="33%" />
          <stop className={styles.fade_stop_2} offset="95%" />
        </radialGradient>
      </defs>

      <text className={styles.heading} x="-280" y="-270">
        SVG demonstration
      </text>
      <text className={styles.caption} x="-280" y="-250">
        Move your mouse pointer over the flower.
      </text>

      <g className={styles.flower}>
        <circle
          id="overlay"
          cx="0"
          cy="0"
          r="200"
          stroke="none"
          fill="url(#fade)"
        />
        <Petals className={styles.outer_petals} />
        <Petals
          className={styles.inner_petals}
          transform="rotate(9) scale(0.33)"
        />
      </g>
    </svg>
  );
}
