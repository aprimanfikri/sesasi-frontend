'use client';

import {
  adminSidebarItems,
  verificatorSidebarItems,
  userSidebarItems,
} from '@/constants';
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

interface SidebarHeaderProps {
  session: Session;
}

const SidebarHeader = ({ session }: SidebarHeaderProps) => {
  const pathname = usePathname();

  let siteHeader = 'Dashboard';

  if (
    pathname.startsWith('/admin/courses/') ||
    pathname.startsWith('/teacher/courses/')
  ) {
    siteHeader = 'Course Setup';
  } else {
    const currentPage =
      session.role === 'ADMIN'
        ? adminSidebarItems.find((item) => item.url === pathname)
        : session.role === 'VERIFICATOR'
        ? verificatorSidebarItems.find((item) => item.url === pathname)
        : userSidebarItems.find((item) => item.url === pathname);

    if (currentPage) {
      siteHeader = currentPage.title;
    }
  }

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 cursor-pointer" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex w-full items-center justify-between">
          <h1 className="text-base font-medium">{siteHeader}</h1>
        </div>
      </div>
    </header>
  );
};

export default SidebarHeader;
