import LoginForm from '@/components/form/login-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
