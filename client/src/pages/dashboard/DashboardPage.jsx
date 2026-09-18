import React from 'react'
import AppSidebar from './AppSidebar'

import {
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="min-h-screen flex-1 bg-[#F6FAFD]">
        <div className="p-6">
          <SidebarTrigger />

          <div className="mt-6">
            <h1 className="text-2xl font-bold text-[#0A1832]">
              Candidate Dashboard
            </h1>
          </div>
        </div>
      </main>
    </SidebarProvider>
  )
}

export default DashboardPage