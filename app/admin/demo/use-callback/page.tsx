import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import Main from '@/app/ui/main';
import ParentComponent from './demo-use-callback';
export default function Page() {
  return (
    <Main>
      <UpdateBreadcrumbs breadcrumbs={'Use Callback'} />
      <ParentComponent/>
    </Main>
  );
}
