import React from 'react';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
  {
    title: 'Projects',
    path: '/projects',
    icon: <BsIcons.BsFillCalendar2Fill />,
    cName: 'nav-text'
  },
  {
    title: 'Templates',
    path: '/templates',
    icon: <BsIcons.BsCardChecklist />,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <BsIcons.BsColumnsGap />,
    cName: 'nav-text'
  }
];