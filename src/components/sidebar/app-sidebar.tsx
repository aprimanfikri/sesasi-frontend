'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import NavMain from '@/components/sidebar/nav-main';
import { NavUser } from '@/components/sidebar/nav-user';
import {
  adminSidebarItems,
  verificatorSidebarItems,
  userSidebarItems,
} from '@/constants';
import { Calendar as CalendarIcon } from 'lucide-react';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  session: Session;
}

const AppSidebar = ({ session, ...props }: AppSidebarProps) => {
  const items =
    session.role === 'ADMIN'
      ? adminSidebarItems
      : session.role === 'VERIFICATOR'
      ? verificatorSidebarItems
      : userSidebarItems;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center w-full gap-4 px-4">
              <CalendarIcon className="text-red-500" />
              <span className="text-base font-semibold">Permission</span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
