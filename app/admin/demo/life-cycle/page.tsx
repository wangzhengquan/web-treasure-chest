import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import { LifeCycleCmp } from './life-cycle-2';
import Main from '@/app/ui/main';
export default function Page() {
  return (
    <Main>
      <UpdateBreadcrumbs breadcrumbs={'Life Cycle'} />
      <LifeCycleCmp name="Parent" counter={0}></LifeCycleCmp>
    </Main>
  );
}
