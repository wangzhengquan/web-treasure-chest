// src/hooks/useScrollRestoration.js
import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';


export function useWindowScrollRestoration(...dependencies: any[]) {
  const SCROLL_POSITION_KEY = 'windowScrollPosition';
  const handleScroll = useDebouncedCallback(() => {
    sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
  }, 200);

  useEffect(() => {
    // 禁用浏览器自身的滚动恢复行为
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const restoreScrollPosition = () => {
      const position = sessionStorage.getItem(SCROLL_POSITION_KEY);
      if (position) {
        window.scrollTo(0, parseInt(position, 10));
        sessionStorage.removeItem(SCROLL_POSITION_KEY);
      }
    };

    // 页面加载时尝试恢复
    // 注意：如果内容是异步加载的，这里可能会有问题，下面会讨论
    restoreScrollPosition();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [...dependencies]);
}

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
      element.scrollTop = parseInt(position, 10);
      sessionStorage.removeItem(scrollKey);
    }
    element.addEventListener('scroll', handleScroll);

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef, scrollKey, ...dependencies]);
}
 