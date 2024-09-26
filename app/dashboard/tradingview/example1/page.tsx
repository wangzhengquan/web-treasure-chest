import Main from '@/app/ui/main';
import Example from '@/app/ui/tradingview/example1';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
export default async function Page() {
  return (
    <>
      <UpdateBreadcrumbs breadcrumbs={'Trading View'} />
      <Main>
        <Example />
      </Main>
    </>
  );
}
