// src/hooks/useScrollRestoration.js
import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export function useScrollRestoration(elementRef: React.RefObject<HTMLElement>, ...dependencies: any[]) {
  const scrollKey = `elementScrollPos_${elementRef.current?.id || 'default'}`;
  // 存储位置
  const handleScroll = useDebouncedCallback(() => {
    sessionStorage.setItem(scrollKey, elementRef.current?.scrollTop.toString()  || '0');
  }, 200);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // 恢复位置
    const position = sessionStorage.getItem(scrollKey);
    if (position) {
      console.log('Restoring scroll position:', position);
      element.scrollTop = parseInt(position, 10);
      sessionStorage.removeItem(scrollKey);
    }
    element.addEventListener('scroll', handleScroll);

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef, scrollKey, ...dependencies]);
}
 