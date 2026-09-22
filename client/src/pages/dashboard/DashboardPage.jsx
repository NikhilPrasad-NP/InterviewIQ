import React, { useState } from 'react'
import { UserButton, useUser } from '@clerk/react'
import { Clock3, Plus, Sparkles, ClipboardList, Star, Award, Timer, } from 'lucide-react'
import AppSidebar from './AppSidebar'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from 'recharts'
import { SidebarProvider, SidebarInset, SidebarTrigger, } from '@/components/ui/sidebar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select'

function DashboardPage() {
  const { user } = useUser()
  const firstName = user?.firstName || 'there'
  const [practiceRange, setPracticeRange] = useState('7')
  const practiceData7Days = [
    { day: 'Mon', interviews: 2 },
    { day: 'Tue', interviews: 4 },
    { day: 'Wed', interviews: 1 },
    { day: 'Thu', interviews: 5 },
    { day: 'Fri', interviews: 3 },
    { day: 'Sat', interviews: 6 },
    { day: 'Sun', interviews: 4 },
  ]

  const practiceData30Days = [
    { day: '1', interviews: 1 },
    { day: '2', interviews: 2 },
    { day: '3', interviews: 0 },
    { day: '4', interviews: 3 },
    { day: '5', interviews: 1 },
    { day: '6', interviews: 4 },
    { day: '7', interviews: 2 },
    { day: '8', interviews: 0 },
    { day: '9', interviews: 3 },
    { day: '10', interviews: 5 },
    { day: '11', interviews: 2 },
    { day: '12', interviews: 1 },
    { day: '13', interviews: 4 },
    { day: '14', interviews: 3 },
    { day: '15', interviews: 0 },
    { day: '16', interviews: 2 },
    { day: '17', interviews: 1 },
    { day: '18', interviews: 5 },
    { day: '19', interviews: 3 },
    { day: '20', interviews: 2 },
    { day: '21', interviews: 4 },
    { day: '22', interviews: 1 },
    { day: '23', interviews: 0 },
    { day: '24', interviews: 3 },
    { day: '25', interviews: 2 },
    { day: '26', interviews: 5 },
    { day: '27', interviews: 1 },
    { day: '28', interviews: 3 },
    { day: '29', interviews: 2 },
    { day: '30', interviews: 4 },
  ]

  const practiceData =
    practiceRange === '7'
      ? practiceData7Days
      : practiceData30Days
  const practiceRanges = [
    {
      label: 'Last 7 Days',
      value: '7',
    },
    {
      label: 'Last 30 Days',
      value: '30',
    },
  ]
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="min-h-screen bg-[#061126]">
        <header className="px-4 py-6 sm:px-6 lg:px-8">

          {/* Top row */}
          <div className="flex items-start justify-between gap-6">

            {/* Welcome */}
            <div className="flex items-start gap-3">
              <SidebarTrigger className="mt-1 shrink-0 text-[#B3CFE5] hover:bg-[#1A3D63] hover:text-[#F6FAFD]" />

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#F6FAFD] sm:text-3xl">
                  Welcome back, {firstName}
                </h1>

                <p className="mt-1 max-w-xl text-sm leading-5 text-[#B3CFE5]">
                  Ready to practice and improve your interview skills?
                </p>
              </div>
            </div>
            <div className="shrink-0 sm:hidden">
              <UserButton />
            </div>


            {/* Desktop actions */}
            <div className="hidden shrink-0 items-center gap-3 sm:flex">
              <button
                type="button"
                className="flex h-11 items-center gap-2 rounded-lg bg-[#1A3D63] px-4 text-sm font-medium text-[#F6FAFD] transition hover:bg-[#234d7a]"
              >
                <Clock3 size={17} />
                <span>Schedule Interview</span>
              </button>

              <button
                type="button"
                className="flex h-11 items-center gap-2 rounded-lg bg-[#B3CFE5] px-5 text-sm font-semibold text-[#0A1832] transition hover:bg-[#F6FAFD]"
              >
                <Plus size={18} />
                <span>Start New Interview</span>
              </button>
            </div>

          </div>


          {/* Mobile actions */}
          <div className="mt-5 flex gap-3 sm:hidden">
            <button
              type="button"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#1A3D63] px-3 text-sm font-medium text-[#F6FAFD] transition hover:bg-[#234d7a]"
            >
              <Clock3 size={17} />
              <span>Schedule Interview</span>
            </button>

            <button
              type="button"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#B3CFE5] px-3 text-sm font-semibold text-[#0A1832] transition hover:bg-[#F6FAFD]"
            >
              <Plus size={18} />
              <span>Start New Interview</span>
            </button>
          </div>


        </header>

        <section className="px-4 pb-6 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">

            {/* AI Coach Card */}
            <div className="relative overflow-hidden rounded-xl  bg-[#0A1832] p-6 sm:p-7 lg:p-8">

              {/* Right-side fade */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#061126] via-[#0A1832]/40 to-transparent" />

              {/* Card content */}
              <div className="relative z-10">

                {/* Badge */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#1A3D63] px-3 py-1.5 text-xs font-medium text-[#B3CFE5]">
                  <Sparkles size={14} />
                  <span>AI COACH READY</span>
                </div>

                {/* Content */}
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-bold leading-tight text-[#F6FAFD] sm:text-3xl lg:text-4xl">
                    Ready for your next interview?
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#B3CFE5] sm:text-base">
                    Practice with an AI-powered interview simulation tailored to your
                    role, experience, and interview type.
                  </p>

                  <button
                    type="button"
                    className="mt-6 h-11 rounded-lg bg-[#B3CFE5] px-5 text-sm font-semibold text-[#0A1832] transition hover:bg-[#F6FAFD]"
                  >
                    Start Preparation
                  </button>
                </div>

              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 ">

              {/* Total Interviews */}
              <div className="rounded-xl border border-[#1A3D63] bg-[#0A1832] p-5 transition-colors duration-200 hover:bg-[#1a3d6398]">
                <ClipboardList
                  size={20}
                  className="text-[#B3CFE5]"
                />

                <p className="mt-5 text-xs font-medium text-[#B3CFE5]/70">
                  Total Interviews
                </p>

                <p className="mt-1 text-2xl font-bold text-[#F6FAFD]">
                  0
                </p>
              </div>

              {/* Average Score */}
              <div className="rounded-xl border border-[#1A3D63] bg-[#0A1832] p-5 transition-colors duration-200 hover:bg-[#1a3d6398]">
                <Star
                  size={20}
                  className="text-[#B3CFE5]"
                />

                <p className="mt-5 text-xs font-medium text-[#B3CFE5]/70">
                  Average Score
                </p>

                <p className="mt-1 text-2xl font-bold text-[#F6FAFD]">
                  0.0
                  <span className="ml-1 text-sm font-medium text-[#B3CFE5]/70">
                    /10
                  </span>
                </p>
              </div>

              {/* Best Score */}
              <div className="rounded-xl border border-[#1A3D63] bg-[#0A1832] p-5 transition-colors duration-200 hover:bg-[#1a3d6398]">
                <Award
                  size={20}
                  className="text-[#B3CFE5]"
                />

                <p className="mt-5 text-xs font-medium text-[#B3CFE5]/70">
                  Best Score
                </p>

                <p className="mt-1 text-2xl font-bold text-[#F6FAFD]">
                  0.0
                </p>
              </div>

              {/* Practice Time */}
              <div className="rounded-xl border border-[#1A3D63] bg-[#0A1832] p-5 transition-colors duration-200 hover:bg-[#1a3d6398]">
                <Timer
                  size={20}
                  className="text-[#B3CFE5]"
                />

                <p className="mt-5 text-xs font-medium text-[#B3CFE5]/70">
                  Practice Time
                </p>

                <p className="mt-1 text-2xl font-bold text-[#F6FAFD]">
                  0h
                </p>
              </div>

            </div>
            {/* Practice Frequency */}
            <section className="px-4 pb-6 sm:px-6 lg:px-8">
              <div className="rounded-xl border border-[#1A3D63] bg-[#0A1832] p-5 sm:p-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-[#F6FAFD]">
                      Practice Frequency
                    </h2>

                    <p className="mt-1 text-sm text-[#B3CFE5]/70">
                      Your interview practice over the last 7 days
                    </p>
                  </div>

                  <Select
                    items={practiceRanges}
                    value={practiceRange}
                    onValueChange={setPracticeRange}
                  >
                    <SelectTrigger className="w-[130px] border-[#1A3D63] bg-[#0A1832] text-[#B3CFE5]">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent
                      alignItemWithTrigger={false}
                      side="bottom"
                    >
                      <SelectItem value="7">
                        Last 7 Days
                      </SelectItem>

                      <SelectItem value="30">
                        Last 30 Days
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Chart */}
                <div className="mt-8 h-48 w-full min-w-0">
                  <ResponsiveContainer width="100%" height={192}>
                    <BarChart
                      data={practiceData}
                      margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid
                        vertical={false}
                        stroke="#1A3D63"
                      />

                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#B3CFE5', fontSize: 12 }}
                      />

                      <YAxis
                        allowDecimals={false}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#B3CFE5', fontSize: 12 }}
                      />

                      <Tooltip
                        cursor={{ fill: '#1A3D63' }}
                        contentStyle={{
                          backgroundColor: '#0A1832',
                          border: '1px solid #1A3D63',
                          borderRadius: '8px',
                          color: '#F6FAFD',
                        }}
                      />

                      <Bar
                        dataKey="interviews"
                        fill="#4A7FA7"
                        radius={[5, 5, 0, 0]}
                        barSize={32}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

              </div>
            </section>
          </div>
        </section>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardPage