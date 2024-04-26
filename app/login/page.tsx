import AcmeLogo from '@/app/ui/login/acme-logo';
import LoginForm from '@/app/ui/login/login-form';
 
export default function LoginPage() {
  return (
    <main className="flex items:start md:items-center justify-center h-screen">
      <div className="bg-card rounded-lg relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 ">
        <AcmeLogo />
        <LoginForm />
      </div>
    </main>
  );
}