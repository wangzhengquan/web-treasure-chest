import Flow from './ui';
import Main from '@/app/ui/main';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
export default function Page() {
  return (
    <Main className="relative h-full w-full">
      <UpdateBreadcrumbs breadcrumbs={'Turbo flow'} />
      <Flow />
    </Main>
  );
}
