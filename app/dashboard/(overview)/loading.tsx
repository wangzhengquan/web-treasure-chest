import DashboardSkeleton from '@/app/ui/dashboard/skeleton';
import Main from '@/app/ui/main';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
export default function Loading() {
  return (
    <Main>
      <UpdateBreadcrumbs breadcrumbs={'Dashboard'} />
      <DashboardSkeleton />
    </Main>
  );
}
