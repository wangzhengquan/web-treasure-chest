'use client'
import Loading  from '@/app/dashboard/loading';
import useBreadcrumbs  from '@/app/hooks/useBreadcrumbs';

export default  function() {
   
  useBreadcrumbs([
    { label: 'Invoices', href: '/dashboard/invoices' },
    {
      label: 'Edit Invoice',
      active: true,
    },
  ])
  return <Loading/>
};