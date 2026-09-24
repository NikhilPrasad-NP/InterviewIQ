import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select'
import AppSidebar from '../dashboard/AppSidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger, } from '@/components/ui/sidebar'

function InterviewSetupPage() {
    const [difficulty, setDifficulty] = useState('medium')
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
                        <div className="mt-8 rounded-xl border border-[#1A3D63] bg-[#0A1832] p-6">
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

                                    <Select>
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

                                    <Select>
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
                                    onClick={() => setDifficulty('easy')}
                                    className={
                                        difficulty === 'easy'
                                            ? 'rounded-lg border border-[#4A7FA7] bg-[#1A3D63] px-4 py-4 text-sm font-semibold text-[#F6FAFD]'
                                            : 'rounded-lg border border-[#1A3D63] bg-[#061126] px-4 py-4 text-sm font-medium text-[#B3CFE5] transition-colors duration-200 hover:bg-[#1a3d6398]'
                                    }
                                >
                                    Beginner
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setDifficulty('medium')}
                                    className={
                                        difficulty === 'medium'
                                            ? 'rounded-lg border border-[#4A7FA7] bg-[#1A3D63] px-4 py-4 text-sm font-semibold text-[#F6FAFD]'
                                            : 'rounded-lg border border-[#1A3D63] bg-[#061126] px-4 py-4 text-sm font-medium text-[#B3CFE5] transition-colors duration-200 hover:bg-[#1a3d6398]'
                                    }
                                >
                                    Intermediate
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setDifficulty('hard')}
                                    className={
                                        difficulty === 'hard'
                                            ? 'rounded-lg border border-[#4A7FA7] bg-[#1A3D63] px-4 py-4 text-sm font-semibold text-[#F6FAFD]'
                                            : 'rounded-lg border border-[#1A3D63] bg-[#061126] px-4 py-4 text-sm font-medium text-[#B3CFE5] transition-colors duration-200 hover:bg-[#1a3d6398]'
                                    }
                                >
                                    Advanced
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default InterviewSetupPage