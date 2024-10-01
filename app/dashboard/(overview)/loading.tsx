'use client'
import DashboardSkeleton from '@/app/ui/dashboard/skeleton';
import Main from '@/app/ui/main';
import useBreadcrumbs  from '@/app/hooks/useBreadcrumbs';
export default function Loading() {
  useBreadcrumbs('Dashboard');
  
  return (
    <Main>
      <DashboardSkeleton />
    </Main>
  );
}
