// import * as React from 'react';

// function useEvent<T extends ((...args: any[]) => any) | undefined>(
//   callback: T,
// ): undefined extends T
//   ? (
//       ...args: Parameters<NonNullable<T>>
//     ) => ReturnType<NonNullable<T>> | undefined
//   : T {
//   const fnRef = React.useRef<T | undefined>(callback);
//   fnRef.current = callback;

//   const memoFn = React.useCallback(
//     (...args: any[]) => fnRef.current?.(...args),
//     []
//   );

//   return memoFn;
// }

// export default useEvent;

import { useCallback, useRef, useMemo } from 'react';

// 1. Define the generic type T for the function being passed in.
//    T extends (...args: any[]) => any ensures T is a function type.
// 2. We use 'NonNullable<T>' to handle cases where T might be T | undefined.
type Callback<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>;

// Overload the function signature to correctly type the return value.
// It returns 'T' directly.
function useEvent<T extends (...args: any[]) => any>(
  callback: T | undefined
): T;

function useEvent<T extends (...args: any[]) => any>(
  callback: T
): T {
  // Use a useRef to store the latest callback function.
  const fnRef = useRef<T>(callback);

  // Update the ref whenever the callback changes.
  // This is crucial for accessing the latest version in the stable function.
  fnRef.current = callback;

  // Use useCallback to create a *stable* function reference (memoFn).
  // The dependency array is empty, ensuring the function reference never changes.
  const memoFn = useCallback((...args: Parameters<T>): ReturnType<T> => {
    // Call the function stored in the ref.
    // We assert the type to ensure it is treated as the expected function T.
    // 'as T' and the preceding check for 'T' in the signature helps here.
    return (fnRef.current as Callback<T>)(...args);
  }, []); // The dependency array is empty, making this function stable

  // The returned value is the stable function reference, which is typed as T.
  return memoFn as T;
}

export default useEvent;