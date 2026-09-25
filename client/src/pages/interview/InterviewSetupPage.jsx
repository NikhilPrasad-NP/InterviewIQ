import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select'
import AppSidebar from '../dashboard/AppSidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger, } from '@/components/ui/sidebar'

function InterviewSetupPage() {
    const [difficulty, setDifficulty] = useState('intermediate')
    const [duration, setDuration] = useState('30')
    const [jobRole, setJobRole] = useState('')
    const [interviewType, setInterviewType] = useState('')
    function handleStartInterview() {
        if (!jobRole || !interviewType) {
            return
        }

        console.log({
            jobRole,
            interviewType,
            difficulty,
            duration,
        })
    }
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-[#061126] text-[#F6FAFD]">
                <div className="min-h-screen">
                    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <SidebarTrigger className="mb-5 text-[#B3CFE5] hover:bg-[#1A3D63] hover:text-[#F6FAFD]" />
                        <h1 className="text-3xl font-bold tracking-tight">
                            Setup Your Interview
                        </h1>

                        <p className="mt-2 text-sm text-[#B3CFE5]">
                            Configure your interview preferences before you begin.
                        </p>
                        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
                            <div>

                                <div className=" rounded-xl border border-[#1A3D63] bg-[#0A1832] p-6">
                                    <h2 className="text-lg font-semibold text-[#F6FAFD]">
                                        Target Role
                                    </h2>

                                    <p className="mt-1 text-sm text-[#B3CFE5]/70">
                                        Choose the role and type of interview you want to practice.
                                    </p>

                                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-[#B3CFE5]">
                                                Job Role
                                            </label>

                                            <Select value={jobRole} onValueChange={setJobRole}>
                                                <SelectTrigger className="h-11 w-full border-[#1A3D63] bg-[#061126] text-[#B3CFE5]">
                                                    <SelectValue placeholder="Select a job role" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="frontend-developer">
                                                        Frontend Developer
                                                    </SelectItem>

                                                    <SelectItem value="backend-developer">
                                                        Backend Developer
                                                    </SelectItem>

                                                    <SelectItem value="full-stack-developer">
                                                        Full Stack Developer
                                                    </SelectItem>

                                                    <SelectItem value="software-engineer">
                                                        Software Engineer
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-[#B3CFE5]">
                                                Interview Type
                                            </label>

                                            <Select value={interviewType} onValueChange={setInterviewType}>
                                                <SelectTrigger className="h-11 w-full border-[#1A3D63] bg-[#061126] text-[#B3CFE5]">
                                                    <SelectValue placeholder="Select interview type" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="hr">
                                                        HR
                                                    </SelectItem>

                                                    <SelectItem value="technical">
                                                        Technical
                                                    </SelectItem>

                                                    <SelectItem value="mixed">
                                                        Mixed
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 rounded-xl border border-[#1A3D63] bg-[#0A1832] p-6">
                                    <h2 className="text-lg font-semibold text-[#F6FAFD]">
                                        Interview Difficulty
                                    </h2>

                                    <p className="mt-1 text-sm text-[#B3CFE5]/70">
                                        Choose how challenging you want the interview to be.
                                    </p>

                                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                        <button
                                            type="button"
                                            onClick={() => setDifficulty('beginner')}
                                            className={
                                                difficulty === 'beginner'
                                                    ? 'rounded-lg border border-[#4A7FA7] bg-[#1A3D63] px-4 py-4 text-sm font-semibold text-[#F6FAFD]'
                                                    : 'rounded-lg border border-[#1A3D63] bg-[#061126] px-4 py-4 text-sm font-medium text-[#B3CFE5] transition-colors duration-200 hover:bg-[#1a3d6398]'
                                            }
                                        >
                                            Beginner
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setDifficulty('intermediate')}
                                            className={
                                                difficulty === 'intermediate'
                                                    ? 'rounded-lg border border-[#4A7FA7] bg-[#1A3D63] px-4 py-4 text-sm font-semibold text-[#F6FAFD]'
                                                    : 'rounded-lg border border-[#1A3D63] bg-[#061126] px-4 py-4 text-sm font-medium text-[#B3CFE5] transition-colors duration-200 hover:bg-[#1a3d6398]'
                                            }
                                        >
                                            Intermediate
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setDifficulty('advanced')}
                                            className={
                                                difficulty === 'advanced'
                                                    ? 'rounded-lg border border-[#4A7FA7] bg-[#1A3D63] px-4 py-4 text-sm font-semibold text-[#F6FAFD]'
                                                    : 'rounded-lg border border-[#1A3D63] bg-[#061126] px-4 py-4 text-sm font-medium text-[#B3CFE5] transition-colors duration-200 hover:bg-[#1a3d6398]'
                                            }
                                        >
                                            Advanced
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-5 rounded-xl border border-[#1A3D63] bg-[#0A1832] p-6">
                                    <h2 className="text-lg font-semibold text-[#F6FAFD]">
                                        Interview Duration
                                    </h2>

                                    <p className="mt-1 text-sm text-[#B3CFE5]/70">
                                        Choose how long you want the interview to last.
                                    </p>

                                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                        <button
                                            type="button"
                                            onClick={() => setDuration('15')}
                                            className={
                                                duration === '15'
                                                    ? 'rounded-lg border border-[#4A7FA7] bg-[#1A3D63] px-4 py-4 text-sm font-semibold text-[#F6FAFD]'
                                                    : 'rounded-lg border border-[#1A3D63] bg-[#061126] px-4 py-4 text-sm font-medium text-[#B3CFE5] transition-colors duration-200 hover:bg-[#1a3d6398]'
                                            }
                                        >
                                            15 Minutes
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setDuration('30')}
                                            className={
                                                duration === '30'
                                                    ? 'rounded-lg border border-[#4A7FA7] bg-[#1A3D63] px-4 py-4 text-sm font-semibold text-[#F6FAFD]'
                                                    : 'rounded-lg border border-[#1A3D63] bg-[#061126] px-4 py-4 text-sm font-medium text-[#B3CFE5] transition-colors duration-200 hover:bg-[#1a3d6398]'
                                            }
                                        >
                                            30 Minutes
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setDuration('45')}
                                            className={
                                                duration === '45'
                                                    ? 'rounded-lg border border-[#4A7FA7] bg-[#1A3D63] px-4 py-4 text-sm font-semibold text-[#F6FAFD]'
                                                    : 'rounded-lg border border-[#1A3D63] bg-[#061126] px-4 py-4 text-sm font-medium text-[#B3CFE5] transition-colors duration-200 hover:bg-[#1a3d6398]'
                                            }
                                        >
                                            45 Minutes
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className=" rounded-xl border border-[#1A3D63] bg-[#0A1832] p-6">
                                    <h2 className="text-lg font-semibold text-[#F6FAFD]">
                                        Interview Summary
                                    </h2>

                                    <p className="mt-1 text-sm text-[#B3CFE5]/70">
                                        Review your interview preferences before you begin.
                                    </p>

                                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                        <div className="rounded-lg bg-[#061126] p-4">
                                            <p className="text-xs font-medium text-[#B3CFE5]/60">
                                                Job Role
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-[#F6FAFD]">
                                                {jobRole || 'Not selected'}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-[#061126] p-4">
                                            <p className="text-xs font-medium text-[#B3CFE5]/60">
                                                Interview Type
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-[#F6FAFD]">
                                                {interviewType || 'Not selected'}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-[#061126] p-4">
                                            <p className="text-xs font-medium text-[#B3CFE5]/60">
                                                Difficulty
                                            </p>
                                            <p className="mt-1 text-sm font-semibold capitalize text-[#F6FAFD]">
                                                {difficulty}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-[#061126] p-4">
                                            <p className="text-xs font-medium text-[#B3CFE5]/60">
                                                Duration
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-[#F6FAFD]">
                                                {duration} Minutes
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            onClick={handleStartInterview}
                                            className="flex h-11 w-full items-center justify-center rounded-lg bg-[#B3CFE5] px-6 text-sm font-semibold text-[#0A1832] transition-colors duration-200 hover:bg-[#F6FAFD]"
                                        >
                                            Start Interview
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default InterviewSetupPage