import { File as FileIcon, Users as UsersIcon } from 'lucide-react';

export const adminSidebarItems = [
  {
    title: 'Permission',
    url: '/admin',
    icon: FileIcon,
  },
  {
    title: 'User',
    url: '/admin/user',
    icon: UsersIcon,
  },
];

export const verificatorSidebarItems = [
  {
    title: 'Permission',
    url: '/verificator',
    icon: FileIcon,
  },
  {
    title: 'User',
    url: '/verificator/user',
    icon: UsersIcon,
  },
];

export const userSidebarItems = [
  {
    title: 'Permission',
    url: '/user',
    icon: FileIcon,
  },
];
