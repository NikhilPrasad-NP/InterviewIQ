import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    Mic,
    MicOff,
    Volume2,
    PhoneOff,
} from 'lucide-react'

function InterviewPage() {
    const location = useLocation()
    const navigate = useNavigate()

    const {
        jobRole,
        interviewType,
        difficulty,
        duration,
    } = location.state || {}

    function handleEndInterview() {
        navigate('/dashboard')
    }

    return (
        <div className="min-h-screen bg-[#061126] text-[#F6FAFD]">
            {/* Header */}
            <header className="border-b border-[#1A3D63] bg-[#0A1832] px-4 py-4 sm:px-6">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold text-[#F6FAFD]">
                            InterviewIQ
                        </p>

                        <p className="mt-1 text-xs text-[#B3CFE5]/70">
                            {jobRole || 'Interview'} • {interviewType || 'Interview'}
                        </p>
                    </div>

                    <div className="rounded-lg border border-[#1A3D63] bg-[#061126] px-4 py-2 text-sm font-medium text-[#B3CFE5]">
                        30:00
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-5xl flex-col px-4 py-8 sm:px-6 lg:py-10">

                {/* Interview info */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#B3CFE5]/70">
                    <span>
                        {difficulty
                            ? `${difficulty.charAt(0).toUpperCase()}${difficulty.slice(1)}`
                            : 'Medium'}
                    </span>

                    <span>•</span>

                    <span>
                        {duration || '30'} minutes
                    </span>
                </div>

                {/* AI Question */}
                <section className="mt-6 rounded-xl border border-[#1A3D63] bg-[#0A1832] p-6 sm:p-8">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-[#1A3D63] text-[#B3CFE5]">
                            <Volume2 size={19} />
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-[#B3CFE5]/60">
                                AI Interviewer
                            </p>

                            <p className="text-sm font-semibold text-[#F6FAFD]">
                                Question 1
                            </p>
                        </div>
                    </div>

                    <div className="mt-7">
                        <h1 className="text-2xl font-semibold leading-relaxed text-[#F6FAFD] sm:text-3xl">
                            Tell me about yourself and your experience.
                        </h1>
                    </div>
                </section>

                {/* Candidate response */}
                <section className="mt-5 flex flex-1 flex-col rounded-xl border border-[#1A3D63] bg-[#0A1832] p-6 sm:p-8">
                    <div>
                        <p className="text-sm font-semibold text-[#F6FAFD]">
                            Your Response
                        </p>

                        <p className="mt-1 text-sm text-[#B3CFE5]/70">
                            Speak naturally. The AI interviewer will listen to your response.
                        </p>
                    </div>

                    <div className="flex flex-1 items-center justify-center py-12">
                        <button
                            type="button"
                            className="flex size-20 items-center justify-center rounded-full bg-[#B3CFE5] text-[#0A1832] transition-colors duration-200 hover:bg-[#F6FAFD]"
                        >
                            <Mic size={30} />
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm font-medium text-[#B3CFE5]">
                            Tap the microphone to answer
                        </p>

                        <p className="mt-1 text-xs text-[#B3CFE5]/50">
                            Voice input will be connected next
                        </p>
                    </div>
                </section>

                {/* Bottom controls */}
                <div className="mt-5 flex items-center justify-between gap-4">
                    <p className="text-xs text-[#B3CFE5]/50">
                        Stay focused and answer as you would in a real interview.
                    </p>

                    <button
                        type="button"
                        onClick={handleEndInterview}
                        className="flex shrink-0 items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2.5 text-sm font-medium text-red-400 transition-colors duration-200 hover:bg-red-500/10"
                    >
                        <PhoneOff size={16} />
                        End Interview
                    </button>
                </div>
            </main>
        </div>
    )
}

export default InterviewPage