import FilterDemo from "@/app/ui/svg/filter-demo";
import Main from "@/app/ui/main";
import Indicator from "@/app/ui/indicator";
export default function Page() {

  return (
    <>
      <Indicator> SVG </Indicator>
      <Main>
        <FilterDemo />
      </Main>
    </>
  );
}