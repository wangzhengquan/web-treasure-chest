import Indicator from '@/app/ui/indicator';
import Main from '@/app/ui/main';
import {UpdateBreadcrumbs} from '@/app/ui/indicator/breadcrumbs';
import Cannon from '@/app/ui/animations/cannon';
export default function Page() {
  return (
    <Main className='h-full w-full'>
      <UpdateBreadcrumbs breadcrumbs={[{label: 'Cannon', href: ''}]}/>
      <Cannon />
    </Main>
  );
}