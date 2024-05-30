import AcmeLogo from '@/app/ui/login/acme-logo';
import LoginForm from '@/app/ui/login/login-form';

export default function LoginPage() {
  return (
    <main className="items:start flex h-screen justify-center md:items-center">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 rounded-lg bg-card ">
        <AcmeLogo />
        <LoginForm />
      </div>
    </main>
  );
}
