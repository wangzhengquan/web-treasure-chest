import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { LatestInvoice } from '@/app/lib/definitions';
import { fetchLatestInvoices } from '@/app/actions/invoices';
import {shimmer} from '@/app/ui/common/skeletons';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();
  return (
    <div className="bg-card p-4  flex w-full flex-col rounded-xl md:col-span-4">
      <h2 className={`mb-4`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between ">
        <div className="bg-card-body px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-foreground/60 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={` truncate text-sm font-medium md:text-base`}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6 text-foreground/60">
          <ArrowPathIcon className="h-5 w-5 " />
          <h3 className="ml-2 text-sm ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}



export function InvoiceSkeleton() {
  return (
    <div
      className={`${shimmer} flex flex-row items-center justify-between border-b border-card py-4`}
    >
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-card-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-card-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-card-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-card-200" />
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div
      className={`relative flex w-full flex-col overflow-hidden md:col-span-4  bg-card rounded-xl p-4`}
    >
      <div className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-card-200`} />
      <div className="flex grow flex-col justify-between">
        <div className="bg-card-body px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-card" />
            <div className="ml-2 h-4 w-20 rounded-md bg-card" />
          </div>
        </div>
      </div>
    </div>
  );
}
