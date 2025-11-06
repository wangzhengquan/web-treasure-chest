import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import Main from '@/app/ui/main';
import App from './ui';
export default function Page() {
  return (
    <Main>
      <UpdateBreadcrumbs breadcrumbs={'Context Provider'} />
      <App/>
    </Main>
  );
}
