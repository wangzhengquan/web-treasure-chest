import  Game from './tic-tac-toe';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';
import Main from '@/app/ui/main';
export default function Page() {
  return (
    <Main>
      <UpdateBreadcrumbs breadcrumbs={'Tic-Tac-Toe'} />
      <Game/>
    </Main>
  );
}
