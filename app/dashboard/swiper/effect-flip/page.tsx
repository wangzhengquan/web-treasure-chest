import Main from '@/app/ui/main';
import DispalyUI  from '@/app/ui/swiper/effect-flip';
import {UpdateBreadcrumbs} from '@/app/ui/indicator/breadcrumbs';
export default async function Page() {
  return (
  <>
    <UpdateBreadcrumbs breadcrumbs={'Transform Function'}/>
    <Main className=''>
      <DispalyUI />
    </Main>
  </>
  );
}