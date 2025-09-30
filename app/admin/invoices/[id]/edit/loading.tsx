'use client'
import Loading  from '@/app/admin/loading';
import useBreadcrumbs  from '@/app/hooks/useBreadcrumbs';

export default function Page() {
   
  useBreadcrumbs([
    { label: 'Invoices', href: '/dashboard/invoices' },
    {
      label: 'Edit Invoice',
      active: true,
    },
  ])
  return <Loading/>
};
