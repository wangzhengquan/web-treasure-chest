import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/actions';
// className="flex h-10 items-center rounded-lg bg-[linear-gradient(94.26deg,rgb(32,121,222)_6.45%,rgb(28,93,192)_100%)] hover:bg-[linear-gradient(94.26deg,rgb(63,140,227)_6.45%,rgb(32,108,223)_100%)] text-[rgb(235_235_240)] border-[0.5px_solid_rgba(255_255_255_0.12)] shadow  px-4 text-sm font-medium  transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-accent-200 "
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    // <form action={deleteInvoiceWithId}>
    <form> 
      <button type="submit" className="rounded-md border p-2 hover:bg-accent-200">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
