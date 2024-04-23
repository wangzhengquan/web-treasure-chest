import Loading from '@/app/components/loading';
import ModeToggle from "@/app/widgets/mode-toggle"
import DashboardSkeleton, {InvoicesTableSkeleton} from '@/app/ui/skeletons';
export default function Page() {
  return (
    <>
    <div className="grid grid-cols-autofill gap-2 py-4">
      <Loading/>
      <ModeToggle />
    </div>

    <div><DashboardSkeleton /></div>
    <div> <InvoicesTableSkeleton /> </div>
    
    </>
  );
}