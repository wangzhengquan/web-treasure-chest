'use client';
import { CustomerField } from '@app/types/db';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@app/components/button2';
import { createInvoice, State } from '@/app/actions/invoices';
import { useActionState } from '@app/hooks/use-action-state';
import ErrorAria from '@/app/ui/error-aria';
import { Card, CardContent, CardFooter } from '@app/components/card';

import { Input } from '@app/components/input';
import { RadioGroup, RadioGroupItem } from '@app/components/radio-group';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@app/components/select';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, action, pending] = useActionState(createInvoice, initialState);
  console.log('state', state);
  return (
    <Card className="p-6">
      <form action={action}>
        <CardContent className="space-y-4 p-4 md:p-6">
          {/* Customer Name */}
          <div>
            <label htmlFor="customerId" className="mb-2 block font-medium">
              Choose customer
            </label>
            <div className="relative">
              <Select name="customerId" aria-describedby="customer-error">
                <SelectTrigger
                  aria-describedby="customer-error"
                  className="relative pl-10"
                >
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 " />
            </div>
            <ErrorAria id="customer-error" errors={state.errors?.customerId} />
          </div>

          {/* Invoice Amount */}
          <div>
            <label htmlFor="amount" className="mb-2 block  font-medium">
              Choose an amount
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="Enter USD amount"
                  className="pl-10 outline-2 "
                  aria-describedby="amount-error"
                  // required
                />
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 " />
              </div>
            </div>
            <ErrorAria id="amount-error" errors={state.errors?.amount} />
          </div>

          {/* Invoice Status */}
          <div>
            <label htmlFor="status" className="mb-2 block font-medium">
              Set the invoice status
            </label>
            <RadioGroup
              name="status"
              aria-describedby="status-error"
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="pending" value="pending" />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="paid" value="paid" />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </RadioGroup>
            <ErrorAria id="status-error" errors={state.errors?.status} />
          </div>
          <ErrorAria
            id="form-error"
            errors={state.message ? [state.message] : null}
          />
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-4 pt-4 md:flex-row md:justify-end md:pt-8">
          <Link
            href="/dashboard/invoices"
            className="flex h-10 w-full items-center rounded-lg bg-gray-100 px-4 font-medium text-gray-600 transition-colors hover:bg-gray-200 md:w-fit"
          >
            Cancel
          </Link>
          <Button
            aria-disabled={pending}
            disabled={pending}
            className="w-full md:w-fit"
          >
            {pending ? 'Creating...' : 'Create'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
 
