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
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
    <Sidebar collapsible="icon">

      {/* Header */}
      <SidebarHeader>
        <div className="px-2 py-3">
          <h1 className="text-lg font-bold text-[#F6FAFD] group-data-[collapsible=icon]:hidden">
            InterviewIQ
          </h1>

          <p className="text-xs text-[#B3CFE5] group-data-[collapsible=icon]:hidden">
            AI Interview Platform
          </p>
        </div>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Platform
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const Icon = item.icon

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink to={item.path}>
                        <Icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <NavLink to="/settings">
                <Settings />
                <span>Settings</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              onClick={() => signOut({ redirectUrl: '/login' })}
            >
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarFooter>

    </Sidebar>
  )
}

export default AppSidebar