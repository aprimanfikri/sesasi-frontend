import { getSession } from '@/lib/action/auth';
import { redirect } from 'next/navigation';

const HomePage = async () => {
  const session = await getSession();

  console.log(session);

  if (session.isLoggedIn) {
    if (session.role === 'ADMIN') {
      return redirect('/admin');
    } else if (session.role === 'VERIFICATOR') {
      return redirect('/verificator');
    } else {
      return redirect('/user');
    }
  }

  return redirect('/login');
};

export default HomePage;
