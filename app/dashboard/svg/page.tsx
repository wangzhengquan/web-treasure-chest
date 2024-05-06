import SVGFilterDemo from "@/app/ui/svg/svg-filter-demo";
import SvgWithCssDemo from "@/app/ui/svg/svg-with-css-demo";
import Main from "@/app/ui/main";
import Indicator from "@/app/ui/indicator";
export default function Page() {

  return (
    <>
      <Indicator> SVG </Indicator>
      <Main>
        <SVGFilterDemo />
        <SvgWithCssDemo />
      </Main>
    </>
  );
}