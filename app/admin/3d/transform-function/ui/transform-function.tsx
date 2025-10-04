'use client';
import { useRef } from 'react';
import styles from './transform-function.module.css';

export default function TransformFunction() {
  const exampleElementRef = useRef<HTMLDivElement>(null);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!exampleElementRef.current) {
      return;
    }
    const exampleElement = exampleElementRef.current;
    const selectElem = event.target;

    if (selectElem.value === 'Choose a function') {
      return;
    } else {
      exampleElement.style.transform = `rotate3d(1, 1, 1, 30deg) ${selectElem.value}`;
      setTimeout(() => {
        exampleElement.style.transform = 'rotate3d(1, 1, 1, 30deg)';
      }, 2000);
    }
  };
  return (
    <div>
      <div className={styles.main}>
        <section ref={exampleElementRef} className={styles['example-element']}>
          <div className={`${styles['face']} ${styles['front']}`}>1</div>
          <div className={`${styles['face']} ${styles['back']}`}>2</div>
          <div className={`${styles['face']} ${styles['right']}`}>3</div>
          <div className={`${styles['face']} ${styles['left']}`}>4</div>
          <div className={`${styles['face']} ${styles['top']}`}>5</div>
          <div className={`${styles['face']} ${styles['bottom']}`}>6</div>
        </section>
      </div>
      <div className={styles['select-form']}>
        <label htmlFor="transfunction">Select a transform function: </label>
        <select
          id="transfunction"
          defaultValue="Choose a function"
          onChange={handleSelectChange}
        >
          <option>Choose a function</option>
          <option>rotate(360deg)</option>
          <option>rotateX(360deg)</option>
          <option>rotateY(360deg)</option>
          <option>rotateZ(360deg)</option>
          <option>rotate3d(1, 1, 1, 90deg)</option>
          <option>scale(1.5)</option>
          <option>scaleX(1.5)</option>
          <option>scaleY(1.5)</option>
          <option>scaleZ(1.5)</option>
          <option>scale3d(1, 1.5, 1.5)</option>
          <option>skew(17deg, 13deg)</option>
          <option>skewX(17deg)</option>
          <option>skewY(17deg)</option>
          <option>translate(100px, 100px)</option>
          <option>translateX(100px)</option>
          <option>translateY(100px)</option>
          <option>translateZ(100px)</option>
          <option>translate3d(50px, 50px, 50px)</option>
          <option>perspective(200px)</option>
          <option>matrix(1, 2, -1, 1, 80, 80)</option>
          <option>matrix3d(1,0,0,0,0,1,3,0,0,0,1,0,50,100,0,1.1)</option>
        </select>
      </div>
    </div>
  );
}
