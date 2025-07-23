'use client'
import Pagination from '@/app/components/pagination';
import Search from '@appcomponents/search';
import  {InvoicesTableSkeleton} from './ui/table';
import { CreateInvoice } from './ui/buttons';
import Main from '@/app/ui/main';
import { Metadata } from 'next';
import useBreadcrumbs  from '@/app/hooks/useBreadcrumbs';



export const metadata: Metadata = {
  title: 'Invoices | Acme Dashboard',
};

export default function Page() {
  useBreadcrumbs('Invoices');
  return (
      <Main>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-6 ">
          <Search placeholder="Search invoices..." />
          <CreateInvoice />
        </div>

        <div className="mt-4 md:mt-12">
          <InvoicesTableSkeleton />
        </div>
        <div className="mt-4 flex w-full justify-center">
          <Pagination totalPages={10} />
        </div>
      </Main>
  );
}
