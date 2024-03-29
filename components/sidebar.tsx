'use client'

import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { usePathname } from 'next/navigation';
import { useMemo } from "react";
import Box from "./box";
import SidebarItem from "./sidebar-item";
import { useUser } from "@/hooks/useUser";
import Library from "./library";
import { Song } from '@/types/types';

type SidebarProps = {
  children: React.ReactNode,
  songs: Song[]
}

const Sidebar = ({ children, songs }: SidebarProps) => {

  const pathname = usePathname();
  const user = useUser();
  

  const routes = useMemo(() => [
    { 
      icon: HiHome, 
      label: 'Home', 
      href: '/',
      active: pathname !== '/search',
    }, {
      icon: BiSearch, 
      label: 'Search', 
      href: '/search',
      active: pathname === '/search'
    }
  ]
  , [pathname]);

  return <div className="flex h-full">
    <div className="
      hidden
      md:flex
      flex-col
      gap-y-2
      bg-black
      h-full
      w-[300px]
      p-2"
    >
      <Box className="p-2 flex-col">
        { routes.map((item) => <SidebarItem key={item.label} {...item}></SidebarItem> )}
      </Box>

      <Box className="flex h-full p-2">
        <Library songs={songs} />
      </Box>
    </div>
    <main className="h-full p-2 flex-1 overflow-y-auto">{ children }</main>
  </div>
}

export default Sidebar;
