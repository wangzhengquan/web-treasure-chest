import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from './buttons';
import InvoiceStatus from './status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/actions/invoices';
import {shimmer} from '@app/components/loading';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-card p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-card-body p-4"
              >
                <div className="flex items-center justify-between border-b border-foreground/20 pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-foreground/60">
                      {invoice.email}
                    </p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="ufo-table hidden md:table">
            <thead>
              <tr>
                <th scope="col" className="sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="">
                  Email
                </th>
                <th scope="col" className="">
                  Amount
                </th>
                <th scope="col" className="">
                  Date
                </th>
                <th scope="col" className="">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-card-body">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className=""
                >
                  <td className="pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                  </td>
                  <td className="">
                    {invoice.email}
                  </td>
                  <td className="">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                  <td className="pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}




export function TableRowSkeleton() {
  return (
    <tr className="">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden box-border pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-card-200"></div>
          <div className="h-6 w-24 rounded bg-card-200"></div>
        </div>
      </td>
      {/* Email */}
      <td className="">
        <div className="h-6 w-32 rounded bg-card-200"></div>
      </td>
      {/* Amount */}
      <td className="">
        <div className="h-6 w-16 rounded bg-card-200"></div>
      </td>
      {/* Date */}
      <td className="">
        <div className="h-6 w-16 rounded bg-card-200"></div>
      </td>
      {/* Status */}
      <td className="">
        <div className="h-6 w-16 rounded bg-card-200"></div>
      </td>
      {/* Actions */}
      <td className="box-border whitespace-nowrap pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[33.5px] w-[33.5px] rounded bg-card-200"></div>
          <div className="h-[33.5px] w-[33.5px] rounded bg-card-200"></div>
        </div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-card-body p-4">
      <div className="flex items-center justify-between border-b border-card pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-card-200"></div>
          <div className="h-6 w-16 rounded bg-card-200"></div>
        </div>
        <div className="h-6 w-16 rounded bg-card-200"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-card-200"></div>
          <div className="mt-2 h-6 w-24 rounded bg-card-200"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-card-200"></div>
          <div className="h-10 w-10 rounded bg-card-200"></div>
        </div>
      </div>
    </div>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-card p-2 md:pt-0">
          <div className="md:hidden">
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
          </div>
          <table className="ufo-table hidden md:table">
            <thead className="rounded-lg text-left font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="">
                  Email
                </th>
                <th scope="col" className="">
                  Amount
                </th>
                <th scope="col" className="">
                  Date
                </th>
                <th scope="col" className="">
                  Status
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className={`${shimmer} bg-card-body`}>
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

