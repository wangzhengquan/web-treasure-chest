import {ButtonWithTooltip} from "@/app/ui/demo/tooltip";
import {UpdateBreadcrumbs} from '@/app/ui/indicator/breadcrumbs';
import {LifeCycleCmp} from '@/app/ui/demo/life-cycle-2';
import Main from '@/app/ui/main';
export default function Page() {
  return (
    <Main>
      <UpdateBreadcrumbs breadcrumbs={'Life Cycle'}/> 
      <LifeCycleCmp name="Parent" counter={0}>
      </LifeCycleCmp>
    </Main>
  );
}
