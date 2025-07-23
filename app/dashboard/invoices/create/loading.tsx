'use client';
import Loading  from '@/app/dashboard/loading';
import useBreadcrumbs  from '@/app/hooks/useBreadcrumbs';

const Page = () => {
   
  useBreadcrumbs([
    { label: 'Invoices', href: '/dashboard/invoices' },
    {
      label: 'Create Invoice',
      href: '/dashboard/invoices/create',
      active: true,
    },
  ]);
  return <Loading/>
};

export default Page;
