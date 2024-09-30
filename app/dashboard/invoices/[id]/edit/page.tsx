import Form from '@/app/ui/invoices/edit-form';
import { fetchInvoiceById } from '@/app/actions/invoices';
import { fetchCustomers } from '@/app/actions/customers';
import { notFound } from 'next/navigation';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import Main from '@/app/ui/main';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);
  if (!invoice) {
    notFound();
  }
  return (
    <>
      <UpdateBreadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Main>
        <Form invoice={invoice} customers={customers} />
      </Main>
    </>
  );
}
