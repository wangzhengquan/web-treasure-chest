import { ButtonWithTooltip } from '@/app/ui/demo/tooltip';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import Main from '@/app/ui/main';
export default function Page() {
  return (
    <Main>
      <UpdateBreadcrumbs breadcrumbs={'Tooltip'} />
      <ButtonWithTooltip
        tooltipContent={
          <div>
            This tooltip does not fit above the button.
            <br />
            This is why its displayed below instead!
          </div>
        }
      >
        Hover over me (tooltip below)
      </ButtonWithTooltip>
      <div style={{ height: 50 }} />
      <ButtonWithTooltip
        tooltipContent={<div>This tooltip fits above the button</div>}
      >
        Hover over me (tooltip above)
      </ButtonWithTooltip>
      <div style={{ height: 50 }} />
      <ButtonWithTooltip
        tooltipContent={<div>This tooltip fits above the button</div>}
      >
        Hover over me (tooltip above)
      </ButtonWithTooltip>
    </Main>
  );
}
