import Main from '@/app/ui/main';
import TransformFunction from './ui/transform-function';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
export default async function Page() {
  return (
    <>
      <UpdateBreadcrumbs breadcrumbs={'Transform Function'} />
      <Main>
        <TransformFunction />
      </Main>
    </>
  );
}
