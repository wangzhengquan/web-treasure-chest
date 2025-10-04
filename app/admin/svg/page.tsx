import SVGFilterDemo from './ui/svg-filter-demo';
import SvgWithCssDemo from './ui/svg-with-css-demo';
import Main from '@/app/ui/main';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
export default function Page() {
  return (
    <Main>
      <UpdateBreadcrumbs breadcrumbs={'SVG'} />
      <SVGFilterDemo />
      <SvgWithCssDemo />
    </Main>
  );
}
