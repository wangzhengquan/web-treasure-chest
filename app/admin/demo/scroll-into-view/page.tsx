'use client';
import { useState, useRef } from 'react';

export default function Page() {
  const listRef = useRef<any>(null);

  function scrollToIndex(index: number) {
    const listNode = listRef.current;
    // This line assumes a particular DOM structure:
    if (!listNode) return;
    const imgNode = listNode.querySelectorAll('li')[index];
    imgNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }

  return (
    <div className="">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-xl`}>Scroll into view</h1>
      </div>
      <div className="absolute left-6 top-24 flex  gap-3">
        <button
          className="rounded-lg bg-sky-200 px-5 py-3"
          onClick={() => scrollToIndex(0)}
        >
          Tab 1
        </button>
        <button
          className="rounded-lg bg-sky-200 px-5 py-3"
          onClick={() => scrollToIndex(1)}
        >
          Tab 2
        </button>
        <button
          className="rounded-lg bg-sky-200 px-5 py-3"
          onClick={() => scrollToIndex(2)}
        >
          Tab 3
        </button>
      </div>
      <div ref={listRef}>
        <ul>
          <li className="flex h-screen place-items-center justify-center text-9xl font-bold">
            1
          </li>
          <li className="flex h-screen place-items-center justify-center text-9xl font-bold">
            2
          </li>
          <li className="flex h-screen place-items-center justify-center text-9xl font-bold">
            3
          </li>
        </ul>
      </div>
    </div>
  );
}
