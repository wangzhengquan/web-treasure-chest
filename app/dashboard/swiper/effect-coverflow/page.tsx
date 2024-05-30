import Main from '@/app/ui/main';
import Demo from '@/app/ui/swiper/effect-coverflow';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
export default async function Page() {
  return (
    <>
      <UpdateBreadcrumbs breadcrumbs={'3D effect coverflow'} />
      <Main>
        <Demo />
      </Main>
    </>
  );
}
