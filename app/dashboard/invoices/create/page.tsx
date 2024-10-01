import Form from '@/app/ui/invoices/create-form';
import { fetchCustomers } from '@/app/actions/customers';
import Main from '@/app/ui/main';
export default async function Page() {
  const customers = await fetchCustomers();

  return (
      <Main>
        <Form customers={customers} />
      </Main>
  );
}
