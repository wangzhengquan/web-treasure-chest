import * as React from 'react';
/**
 * useMediaQuery("(min-width: 768px)")
 * @param query
 * @returns
 */
export default function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(window.matchMedia(query).matches);

  React.useEffect(() => {
    const media =  window.matchMedia(query);
    setMatches(media.matches);
    function listener(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
