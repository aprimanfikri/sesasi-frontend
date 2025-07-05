import AppSidebar from '@/components/sidebar/app-sidebar';
import SidebarHeader from '@/components/sidebar/sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { getSession } from '@/lib/action/auth';
import { sanitizeSession } from '@/lib/utils';
import { redirect } from 'next/navigation';

const VerificatorLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect('/login');
  }

  if (session.role !== 'VERIFICATOR') {
    if (session.role === 'USER') {
      redirect('/user');
    } else {
      redirect('/admin');
    }
  }

  const safeSession = sanitizeSession(session);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" session={safeSession} />
      <SidebarInset>
        <SidebarHeader session={safeSession} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <main className="p-4">{children}</main>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default VerificatorLayout;
