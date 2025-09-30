import Main from '@/app/ui/main';
import MagicCurtain from './ui';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
export default async function Page() {
  return (
    <>
      <UpdateBreadcrumbs breadcrumbs={'Magic Curtain'} />
      <Main>
        <MagicCurtain />
      </Main>
    </>
  );
}
