import Main from '@/app/ui/main';
import MagicCurtain from '@/app/ui/animations/magic-curtain';
import {UpdateBreadcrumbs} from '@/app/ui/indicator/breadcrumbs';
export default async function Page() {
  return (
  <>
    <UpdateBreadcrumbs breadcrumbs={'Magic Curtain'}/>
    <Main>
      <MagicCurtain />
    </Main>
  </>
  );
}