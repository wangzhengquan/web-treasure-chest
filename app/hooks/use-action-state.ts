import { useFormState, useFormStatus } from 'react-dom';

// export function useActionState<State>(
//   action: (state: Awaited<State>) => State | Promise<State>,
//   initialState: Awaited<State>,
//   permalink?: string,
// ): [state: Awaited<State>, dispatch: () => void, isPending: boolean]{
//   const [ formState, dispatch ] = useFormState<State>(action, initialState, permalink);
//   const { pending } = useFormStatus();

//   return [formState, dispatch, pending];
// }

export function useActionState<State, Payload>(
  action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
  initialState: Awaited<State>,
  permalink?: string,
): [state: Awaited<State>, dispatch: (payload: Payload) => void, isPending: boolean]{
  const [ formState, dispatch ] = useFormState<State, Payload>(action, initialState, permalink);
  const { pending } = useFormStatus();

  return [formState, dispatch, pending];
}

