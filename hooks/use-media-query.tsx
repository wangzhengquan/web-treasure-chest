import * as React from 'react';
/**
 * useMediaQuery("(min-width: 600px)")
 * @param query
 * @returns
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(matchMedia(query).matches);

  React.useEffect(() => {
    const media = matchMedia(query);
    setMatches(media.matches);
    function listener(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
