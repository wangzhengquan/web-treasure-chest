'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/components/button';
import { updateInvoice } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';
import ErrorAria from '@/app/ui/error-aria';
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const initialState = { message: null, errors: {} };
  const [state, action] = useFormState(updateInvoiceWithId, initialState);
  return (
  <Card className='p-6'>
    <form action={action}>
      {/* <input type="hidden" name="id" value={invoice.id} /> */}
      <CardContent className="p-4 md:p-6 space-y-4">
        {/* Customer Name */}
        <div>
          <label htmlFor="customerId" className="mb-2 block font-medium">
            Choose customer
          </label>
          <div className="relative">
            <Select name="customerId" defaultValue={invoice.customer_id}>
              <SelectTrigger aria-describedby="customer-error" className="relative pl-10">
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
          <ErrorAria id="customer-error" errors={state.errors?.customerId}/>
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
                className="pl-10 "
                aria-describedby="amount-error"
                defaultValue={invoice.amount}
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 " />
            </div>
          </div>
          <ErrorAria id="amount-error" errors={state.errors?.amount}/>
        </div>

        {/* Invoice Status */}
        <div>
          <label htmlFor="status" className="mb-2 block font-medium">
            Set the invoice status
          </label>
          <RadioGroup name="status" defaultValue={invoice.status} aria-describedby="status-error" className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="pending" value="pending" defaultChecked={invoice.status === 'paid'}/>
              <label htmlFor="pending"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
              >
                Pending <ClockIcon className="h-4 w-4" />
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="paid" value="paid" defaultChecked={invoice.status === 'paid'}/>
              <label htmlFor="paid"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
              >
                Paid <CheckIcon className="h-4 w-4" />
              </label>
            </div>
          </RadioGroup>
          <ErrorAria id="status-error" errors={state.errors?.status}/>
        </div>
            
        {/* <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={invoice.status === 'pending'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={invoice.status === 'paid'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <ErrorAria id="status-error" errors={state.errors?.status}/>
        </fieldset> */}
        <ErrorAria id="form-error" errors={state.message ? [state.message] : null}/>
      </CardContent>
      <CardFooter className="flex items-center pt-4 flex-col md:flex-row md:pt-8 md:justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex w-full md:w-fit h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <CommitButton />
      </CardFooter>
    </form>
  </Card>
  );
}


function CommitButton() {
  const { pending } = useFormStatus();
  return (
    <Button aria-disabled={pending} disabled={pending} className="w-full md:w-fit"> Save </Button>
  );
}