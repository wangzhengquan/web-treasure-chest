import Main from '@/app/ui/main';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import Cannon from '@/app/ui/animations/cannon';
export default function Page() {
  return (
    <Main className="h-full w-full">
      <UpdateBreadcrumbs breadcrumbs={'Cannon'} />
      <Cannon />
    </Main>
  );
}
