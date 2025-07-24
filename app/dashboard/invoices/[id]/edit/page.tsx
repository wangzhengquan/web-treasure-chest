import Form from '../../ui/edit-form';
import { fetchInvoiceById } from '@/app/actions/invoices';
import { fetchCustomers } from '@/app/actions/customers';
import { notFound } from 'next/navigation';
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
       
      <Main>
        <Form invoice={invoice} customers={customers} />
      </Main>
    </>
  );
}
