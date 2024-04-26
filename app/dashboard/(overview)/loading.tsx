import DashboardSkeleton from '@/app/ui/skeletons';
import Main from '@/app/ui/main';
import Indicator from '@/app/ui/indicator';

export default function Loading() {
  return (
    <>
      <Indicator> Dashboard </Indicator>
      <Main>
        <DashboardSkeleton />
      </Main>
    </>
  );
}
