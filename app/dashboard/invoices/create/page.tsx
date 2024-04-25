import Form from '@/app/ui/invoices/create-form';
import Indicator, {Breadcrumbs} from '@/app/ui/indicator';
import { fetchCustomers } from '@/app/lib/data';
import Main from '@/app/ui/main';
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <>
      <Indicator>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Invoices', href: '/dashboard/invoices' },
            { label: 'Create Invoice', href: '/dashboard/invoices/create', active: true },
          ]}
        />
      </Indicator>
      <Main>  
        <Form customers={customers} />
      </Main>
    </>
  );
}