import Form from '@/app/ui/invoices/create-form';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import { fetchCustomers } from '@/app/actions/customers';
import Main from '@/app/ui/main';
export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <>
      <UpdateBreadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Main>
        <Form customers={customers} />
      </Main>
    </>
  );
}
