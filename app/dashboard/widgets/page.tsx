import Loading from '@/app/components/loading';
import { Input } from '@/components/ui/input';
import Indicator from '@/app/ui/indicator';
import { Button } from '@/components/ui/button';
import Main from '@/app/ui/main';
import clsx from 'clsx';
import { List } from '@/app/components/list';
import { RadioGroupForm } from '@/app/widgets/radio-group-form';
import NotificationItem from '@/app/widgets/notification-item';
import { CardWithForm } from '@/app/widgets/card-with-form';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';

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
          <Button variant="blue" size="lg">
            blue
          </Button>
          <Input />
        </div>
        <NotificationItem />
        <RadioGroupForm />
        <div>
          <CardWithForm />
        </div>
        <List />
        {/* <div><DashboardSkeleton /></div>
      <div> <InvoicesTableSkeleton /> </div> */}
      </Main>
    </>
  );
}
