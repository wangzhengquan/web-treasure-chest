'use client';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@app/components/button2';
import { authenticate } from '@/app/actions/users';
import { Input } from '@app/components/input';
import { useActionState } from '@app/hooks/use-action-state';
import { useSearchParams, usePathname } from 'next/navigation';

export default function LoginForm() {
  // const searchParams = useSearchParams();
  const pathname = usePathname();
  // const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  // console.log('callbackUrl', callbackUrl);
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg  px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label className="mb-3 mt-5 block  font-medium " htmlFor="email">
              Email
            </label>
            <div className="relative">
              <Input
                className="pl-10 "
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                defaultValue="user@nextmail.com"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-foreground/50" />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-3 mt-5 block  font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Input
                className="pl-10 "
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                defaultValue="123456"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-foreground/50" />
            </div>
          </div>
        </div>
        {/* <input type="hidden" name="redirectTo" value={callbackUrl} /> */}
        <Button className="mt-4 w-full" aria-disabled={isPending} disabled={isPending}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 " />
        </Button>

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

 
