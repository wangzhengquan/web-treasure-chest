'use client';
import { useRef, useEffect, useState } from 'react';

function useIntersectionObserver(ref: any) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    const box = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 1.0,
      },
    );
    observer.observe(box);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}

function Box({ pageRef }: { pageRef: any }) {
  const boxRef = useRef(null);
  const isIntersecting = useIntersectionObserver(boxRef);

  useEffect(() => {
    if (!pageRef) return;
    if (isIntersecting) {
      pageRef.current.style.backgroundColor = 'black';
      pageRef.current.style.color = 'white';
    } else {
      pageRef.current.style.backgroundColor = 'white';
      pageRef.current.style.color = 'black';
    }
  }, [isIntersecting, pageRef]);

  return (
    <div
      ref={boxRef}
      style={{
        margin: 20,
        height: 100,
        width: 100,
        border: '2px solid black',
        backgroundColor: 'blue',
      }}
    />
  );
}

function LongSection() {
  const items = [];
  for (let i = 0; i < 50; i++) {
    items.push(<li key={i}>Item #{i} (keep scrolling)</li>);
  }
  return <ul>{items}</ul>;
}

export default function Page() {
  const pageRef = useRef(null);
  return (
    <div ref={pageRef}>
      <LongSection />
      <Box pageRef={pageRef} />
      <LongSection />
      <Box pageRef={pageRef} />
      <LongSection />
    </div>
  );
}
