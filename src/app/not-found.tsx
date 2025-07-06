import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/action/auth';
import { House } from 'lucide-react';
import Link from 'next/link';

const NotFound = async () => {
  const session = await getSession();

  let route = '/login';

  if (session?.isLoggedIn) {
    if (session.role === 'ADMIN') {
      route = '/admin';
    } else if (session.role === 'VERIFICATOR') {
      route = '/verificator';
    } else {
      route = '/user';
    }
  }

  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce">
            404
          </h1>
          <p className="text-gray-500">
            Looks like you&apos;ve ventured into the unknown digital realm.
          </p>
        </div>
        <Link href={route} prefetch={false}>
          <Button className="cursor-pointer">
            <House /> Return to website
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
