import Loading from '@/app/components/loading';
import { Input } from "@/components/ui/input"
import Indicator from '@/app/ui/indicator';
import { Button } from "@/components/ui/button"
import Main from "@/app/ui/main";
import {RadioGroupForm} from "@/app/widgets/radio-group-form";
import DashboardSkeleton, {InvoicesTableSkeleton} from '@/app/ui/skeletons';

export default function Page() {
  return (
  <>
    <Indicator>Widgets</Indicator>
  
    <Main>
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 py-4 ">
        <Loading className=""/>
        <Button >default</Button>
        <Button variant="outline">outline</Button>
        <Button variant="destructive">outline</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="ghost">ghost</Button>
        <Button variant="link">link</Button>
        <Button variant="blue" size="lg">blue</Button>
        <Input />
        
      </div>
      <RadioGroupForm />
      {/* <div><DashboardSkeleton /></div>
      <div> <InvoicesTableSkeleton /> </div> */}
    
    </Main>
  </>
  );
}