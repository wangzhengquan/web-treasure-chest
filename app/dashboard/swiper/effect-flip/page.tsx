import Main from '@/app/ui/main';
import Demo from './ui';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
export default async function Page() {
  return (
    <>
      <UpdateBreadcrumbs breadcrumbs={'Transform Function'} />
      <Main className="">
        <Demo />
      </Main>
    </>
  );
}
