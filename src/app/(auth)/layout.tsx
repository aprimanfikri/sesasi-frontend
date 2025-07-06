import AuthWrapper from '@/components/auth-wrapper';
import { getSession } from '@/lib/action/auth';
import { redirect } from 'next/navigation';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (session.isLoggedIn) {
    if (session.role === 'ADMIN') {
      redirect('/admin');
    } else if (session.role === 'VERIFICATOR') {
      redirect('/verificator');
    } else {
      redirect('/user');
    }
  }

  return <AuthWrapper>{children}</AuthWrapper>;
};

export default AuthLayout;
