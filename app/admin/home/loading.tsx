'use client'
import DashboardSkeleton from './ui/skeleton';
import Main from '@/app/ui/main';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import useBreadcrumbs  from '@/app/hooks/useBreadcrumbs';
export default function Loading() {
  useBreadcrumbs('Home');
  
  return (
    <Main>
      <UpdateBreadcrumbs breadcrumbs={'Home'} />
      <DashboardSkeleton />
    </Main>
  );
}
