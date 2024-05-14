import Flow from '@/app/ui/workflow/turbo-flow';
import Main from '@/app/ui/main';
import {UpdateBreadcrumbs} from '@/app/ui/indicator/breadcrumbs';
export default function Page() {
  return (
    <Main className="relative w-full h-full p-0">
      <UpdateBreadcrumbs breadcrumbs={'Turbo flow'}/>
      <Flow />
    </Main>
  )
}