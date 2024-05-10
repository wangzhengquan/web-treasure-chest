import Indicator from '@/app/ui/indicator';
import Main from '@/app/ui/main';
import MagicCurtain from '@/app/ui/animations/magic-curtain';
export default async function Page() {
  return (
  <>
    <Indicator> Magic Curtian </Indicator>
    <Main>
      <MagicCurtain />
    </Main>
  </>
  );
}