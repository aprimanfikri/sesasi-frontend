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
import NavUser from '@/components/sidebar/nav-user';
import {
  adminSidebarItems,
  verificatorSidebarItems,
  userSidebarItems,
} from '@/constants';

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
              <span className="text-2xl font-semibold">Dashboard</span>
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
