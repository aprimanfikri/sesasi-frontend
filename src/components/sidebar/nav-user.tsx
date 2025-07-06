'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { LogOut, Settings, User } from 'lucide-react';
import { useState } from 'react';
import CustomDialog from '@/components/custom-dialog';
import LogOutButton from '@/components/logout-button';
import { CustomTabs } from '../custom-tabs';
import { AccountForm } from '../form/account-form';
import { PasswordForm } from '../form/password-form';

interface NavUserProps {
  session: Session;
}

const NavUser = ({ session }: NavUserProps) => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const tabs = [
    {
      label: 'Account',
      value: 'account',
      content: (
        <div className="p-2">
          <AccountForm
            session={session}
            onSave={() => setIsDialogOpen(false)}
          />
        </div>
      ),
    },
    {
      label: 'Password',
      value: 'password',
      content: (
        <div className="p-2">
          <PasswordForm
            session={session}
            onSave={() => setIsDialogOpen(false)}
          />
        </div>
      ),
    },
  ];

  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="/avatar.jpg" alt={session.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{session.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {session.role}
                </span>
              </div>
              <Settings size="24" color="#000000" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="/avatar.jpg" alt={session.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{session.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {session.role}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => setIsDialogOpen(true)}
                className="cursor-pointer"
              >
                <User size="24" color="#000000" />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setShowLogoutDialog(true)}
              className="cursor-pointer"
            >
              <LogOut size="24" color="#000000" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <CustomDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        title="Are you sure?"
        description="You will be logged out of your account"
      >
        <LogOutButton setShowLogoutDialog={setShowLogoutDialog} />
      </CustomDialog>
      <CustomDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="User Settings"
        description="Manage your account settings and preferences."
      >
        <CustomTabs defaultValue="account" tabs={tabs} />
      </CustomDialog>
    </SidebarMenu>
  );
};

export default NavUser;
