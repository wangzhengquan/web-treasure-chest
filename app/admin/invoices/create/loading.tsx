'use client';
import Loading  from '@/app/admin/loading';
import useBreadcrumbs  from '@/app/hooks/useBreadcrumbs';

const Page = () => {
   
  useBreadcrumbs([
    { label: 'Invoices', href: '/admin/invoices' },
    {
      label: 'Create Invoice',
      href: '/admin/invoices/create',
      active: true,
    },
  ]);
  return <Loading/>
};

export default Page;
