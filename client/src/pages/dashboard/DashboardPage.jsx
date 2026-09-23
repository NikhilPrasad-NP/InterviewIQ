import React, { useState } from 'react'
import { UserButton, useUser } from '@clerk/react'
import { Clock3, Plus, Sparkles, ClipboardList, Star, Award, Timer, Lightbulb, Brain, MessageSquareText, Building2, ChevronRight, } from 'lucide-react'
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
          </div>
        </section>

        {/* Practice Frequency */}
        <section className="px-4 pb-6 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">

            <div className="min-w-0">

              <div className="rounded-xl border border-[#1A3D63] bg-[#0A1832] p-5 sm:p-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-[#F6FAFD]">
                      Practice Frequency
                    </h2>

                    <p className="mt-1 text-sm text-[#B3CFE5]/70">
                      Your interview practice over the last {practiceRange} days
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
            </div>

            <div className="min-w-0">

              <div className="rounded-xl border border-[#1A3D63] bg-[#0A1832] p-6">

                {/* Heading */}
                <h2 className="text-lg font-semibold text-[#F6FAFD]">
                  Quick Actions
                </h2>

                {/* Actions */}
                <div className="mt-6 space-y-3">

                  {/* Resume Analysis */}
                  <button
                    type="button"
                    className="flex w-full items-center gap-4 rounded-lg p-3 text-left transition-colors duration-200 hover:bg-[#061126]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1A3D63] text-[#B3CFE5]">
                      <Lightbulb size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#F6FAFD]">
                        Resume Analysis
                      </p>

                      <p className="mt-0.5 text-xs text-[#B3CFE5]/70">
                        Update AI context with your latest CV
                      </p>
                    </div>
                  </button>

                  {/* Behavioral Prep */}
                  <button
                    type="button"
                    className="flex w-full items-center gap-4 rounded-lg p-3 text-left transition-colors duration-200 hover:bg-[#061126]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1A3D63] text-[#B3CFE5]">
                      <Brain size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#F6FAFD]">
                        Behavioral Prep
                      </p>

                      <p className="mt-0.5 text-xs text-[#B3CFE5]/70">
                        Practice 20 most common STAR questions
                      </p>
                    </div>
                  </button>

                  {/* Mock Peer Review */}
                  <button
                    type="button"
                    className="flex w-full items-center gap-4 rounded-lg p-3 text-left transition-colors duration-200 hover:bg-[#061126]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1A3D63] text-[#B3CFE5]">
                      <MessageSquareText size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#F6FAFD]">
                        Mock Peer Review
                      </p>

                      <p className="mt-0.5 text-xs text-[#B3CFE5]/70">
                        Get anonymous feedback from peers
                      </p>
                    </div>
                  </button>

                </div>

                {/* Upcoming Interview */}
                <div className="mt-6 rounded-xl border border-[#1A3D63] bg-[#061126] p-4">
                  <p className="text-sm font-semibold text-[#B3CFE5]">
                    Upcoming Interview
                  </p>

                  <p className="mt-1 text-sm text-[#B3CFE5]/80">
                    No upcoming interviews
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>
        <section className="px-4 pb-8 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-xl border border-[#1A3D63] bg-[#0A1832]">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 px-6 py-5">
              <h2 className="text-lg font-semibold text-[#F6FAFD]">
                Recent Sessions
              </h2>

              <button
                type="button"
                className="shrink-0 text-sm font-medium text-[#B3CFE5] transition-colors hover:text-[#F6FAFD]"
              >
                View All History
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <div className="min-w-[760px]">
                {/* Table Header */}
                <div className="grid grid-cols-[2fr_1.1fr_1.1fr_1.5fr_60px] items-center gap-4 bg-[#132c4650] px-6 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#B3CFE5]/80">
                  <span>Role & Company</span>
                  <span>Type</span>
                  <span>Date</span>
                  <span>Score</span>
                  <span className="text-center">Actions</span>
                </div>

                {/* Session 1 */}
                <div className="grid grid-cols-[2fr_1.1fr_1.1fr_1.5fr_60px] items-center gap-4 px-6 py-4 transition-colors duration-200 hover:bg-[#132c4650]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1A3D63] text-[#B3CFE5]">
                      <Building2 size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#F6FAFD]">
                        Senior Backend Engineer
                      </p>
                      <p className="truncate text-xs text-[#B3CFE5]">
                        Meta Platforms Inc.
                      </p>
                    </div>
                  </div>

                  <span className="w-fit rounded-md bg-[#1A3D63]/60 px-2.5 py-1 text-xs text-[#B3CFE5]">
                    System Design
                  </span>

                  <span className="text-sm text-[#B3CFE5]">
                    Oct 20, 2024
                  </span>

                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-32 overflow-hidden rounded-full bg-[#1A3D63]">
                      <div
                        className="h-full rounded-full bg-[#B3CFE5]"
                        style={{ width: '88%' }}
                      />
                    </div>

                    <span className="text-sm font-medium text-[#B3CFE5]">
                      8.8
                    </span>
                  </div>

                  <button
                    type="button"
                    className="flex justify-center text-[#B3CFE5] transition-colors hover:text-[#F6FAFD]"
                  >
                    <ChevronRight size={19} />
                  </button>
                </div>

                {/* Session 2 */}
                <div className="grid grid-cols-[2fr_1.1fr_1.1fr_1.5fr_60px] items-center gap-4  px-6 py-4 transition-colors duration-200 hover:bg-[#132c4650]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1A3D63] text-[#B3CFE5]">
                      <Building2 size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#F6FAFD]">
                        Staff Frontend Lead
                      </p>
                      <p className="truncate text-xs text-[#B3CFE5]">
                        Shopify
                      </p>
                    </div>
                  </div>

                  <span className="w-fit rounded-md bg-[#1A3D63]/60 px-2.5 py-1 text-xs text-[#B3CFE5]">
                    Architecture
                  </span>

                  <span className="text-sm text-[#B3CFE5]">
                    Oct 18, 2024
                  </span>

                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-32 overflow-hidden rounded-full bg-[#1A3D63]">
                      <div
                        className="h-full rounded-full bg-[#B3CFE5]"
                        style={{ width: '92%' }}
                      />
                    </div>

                    <span className="text-sm font-medium text-[#B3CFE5]">
                      9.2
                    </span>
                  </div>

                  <button
                    type="button"
                    className="flex justify-center text-[#B3CFE5] transition-colors hover:text-[#F6FAFD]"
                  >
                    <ChevronRight size={19} />
                  </button>
                </div>

                {/* Session 3 */}
                <div className="grid grid-cols-[2fr_1.1fr_1.1fr_1.5fr_60px] items-center gap-4  px-6 py-4 transition-colors duration-200 hover:bg-[#132c4650]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1A3D63] text-[#B3CFE5]">
                      <Building2 size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#F6FAFD]">
                        Lead AI Researcher
                      </p>
                      <p className="truncate text-xs text-[#B3CFE5]">
                        OpenAI
                      </p>
                    </div>
                  </div>

                  <span className="w-fit rounded-md bg-[#1A3D63]/60 px-2.5 py-1 text-xs text-[#B3CFE5]">
                    ML Fundamentals
                  </span>

                  <span className="text-sm text-[#B3CFE5]">
                    Oct 15, 2024
                  </span>

                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-32 overflow-hidden rounded-full bg-[#1A3D63]">
                      <div
                        className="h-full rounded-full bg-[#B3CFE5]"
                        style={{ width: '75%' }}
                      />
                    </div>

                    <span className="text-sm font-medium text-[#B3CFE5]">
                      7.5
                    </span>
                  </div>

                  <button
                    type="button"
                    className="flex justify-center text-[#B3CFE5] transition-colors hover:text-[#F6FAFD]"
                  >
                    <ChevronRight size={19} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="px-4 pb-8 pt-2 sm:px-6 lg:px-8">
          <div className=" pt-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-[#F6FAFD]">
                  InterviewIQ
                </p>

                <p className="mt-1 text-xs text-[#B3CFE5]">
                  © 2026 InterviewIQ. Practice smarter. Interview better.
                </p>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#B3CFE5]">
                <button
                  type="button"
                  className="transition-colors hover:text-[#F6FAFD]"
                >
                  Privacy Policy
                </button>

                <button
                  type="button"
                  className="transition-colors hover:text-[#F6FAFD]"
                >
                  Terms of Service
                </button>

                <button
                  type="button"
                  className="transition-colors hover:text-[#F6FAFD]"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </footer>

      </SidebarInset >
    </SidebarProvider >
  )
}

export default DashboardPage