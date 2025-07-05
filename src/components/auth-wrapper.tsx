'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isLogin = pathname === '/login';

  return (
    <div className="flex bg-gray-100 min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card className="bg-white shadow-lg">
            <CardHeader className="flex flex-col items-center">
              <h1 className="text-2xl font-semibold">
                {isLogin ? 'Login' : 'Register'}
              </h1>
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter>
              <div className="mt-4 text-center text-sm w-full">
                {isLogin ? (
                  <>
                    Don&apos;t have an account?{' '}
                    <Link
                      href="/register"
                      className="underline underline-offset-4 text-primary"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <Link
                      href="/login"
                      className="underline underline-offset-4 text-primary"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
