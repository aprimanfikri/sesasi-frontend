import RegisterForm from '@/components/form/register-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
};

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;
