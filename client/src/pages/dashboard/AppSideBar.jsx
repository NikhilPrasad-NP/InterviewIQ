
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useClerk } from '@clerk/react'
import {
  LayoutDashboard,
  Video,
  History,
  MessageSquareText,
  User,
  Settings,
  LogOut,
  Mic,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar'

function AppSidebar() {
  const { signOut } = useClerk()

  const navigation = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Interviews',
      path: '/interview',
      icon: Video,
      end: false,
    },
    {
      title: 'History',
      path: '/history',
      icon: History,
    },
    {
      title: 'Feedback',
      path: '/feedback',
      icon: MessageSquareText,
    },
    {
      title: 'Profile',
      path: '/profile',
      icon: User,
    },
  ]

  return (
    <Sidebar
      collapsible="icon"
      className="!border-r-0 !bg-[#0A1832]"
    >
      {/* Logo */}
      <SidebarHeader className="px-4 py-7 group-data-[collapsible=icon]:px-2">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#B3CFE5] text-[#0A1832]">
            <Mic size={18} />
          </div>

          <div className="group-data-[collapsible=icon]:hidden">
            <h1 className="text-xl font-bold leading-none text-[#B3CFE5]">
              InterviewAI
            </h1>

            <p className="mt-1 text-xs font-medium text-[#B3CFE5]/70">
              Pro Plan
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Main navigation */}
      <SidebarContent className="px-3 group-data-[collapsible=icon]:px-2">
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {navigation.map((item) => {
              const Icon = item.icon

              return (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.path}
                    end={item.end !== false}
                    className="group/nav-link"
                  >
                    {({ isActive }) => (
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.title}
                        className="h-9 text-[#B3CFE5] hover:bg-[#1A3D63] hover:text-[#F6FAFD]"
                      >
                        <Icon size={18} />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Bottom navigation */}
      <SidebarFooter className="px-3 pb-7 group-data-[collapsible=icon]:px-2">
        <SidebarMenu className="gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<NavLink to="/settings" />}
              tooltip="Settings"
              className="h-9 text-[#B3CFE5] hover:bg-[#1A3D63] hover:text-[#F6FAFD]"
            >
              <Settings size={18} />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              className="h-9 text-red-500 hover:bg-red-500/10 hover:text-red-400"
              onClick={() => signOut({ redirectUrl: '/login' })}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar