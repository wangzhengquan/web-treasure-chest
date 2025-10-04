import Loading from '@app/components/loading';
import { Input } from '@app/components/input';
import Indicator from '@/app/ui/indicator';
import { Button } from '@app/components/button';
import Main from '@/app/ui/main';
import clsx from 'clsx';
import { List } from '@app/components/list';
import { RadioGroupForm } from './ui/radio-group-form';
import NotificationItem from './ui/notification-item';
import { CardWithForm } from './ui/card-with-form';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import Capacity from "@app/components/capacity";
export default function Page() {
  return (
    <>
      <UpdateBreadcrumbs breadcrumbs={'Widgets'} />

      <Main>
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 py-4 ">
          <Loading className="" />
          <Button>default</Button>
          <Button variant="outline">outline</Button>
          <Button variant="destructive">outline</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="link">link</Button>
           
          <Input />
          
        </div>
        <NotificationItem />
        <RadioGroupForm />
        <div>
          <CardWithForm />
        </div>
        <Capacity/>
        {/* <div><DashboardSkeleton /></div>
      <div> <InvoicesTableSkeleton /> </div> */}
      </Main>
    </>
  );
}
