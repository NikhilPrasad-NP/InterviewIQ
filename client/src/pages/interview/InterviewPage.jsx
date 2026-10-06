import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Mic, Volume2, PhoneOff, LoaderCircle, } from 'lucide-react'
import { useAuth, useUser } from '@clerk/react'
import { createSupabaseClient } from '../../lib/supabase'


function InterviewPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const { getToken } = useAuth()
    const { user } = useUser()

    

    const [questionId, setQuestionId] = useState(null)
    const [question, setQuestion] = useState('Loading your interview question...')
    const [interviewState, setInterviewState] = useState('ai-speaking')

    const supabase = useMemo(
        () => createSupabaseClient(getToken),
        [getToken]
    )

    const {
        interviewId,
        jobRole,
        interviewType,
        difficulty,
        duration,
    } = location.state || {}

    useEffect(() => {
        async function loadOrGenerateQuestion() {
            try {
                const { data: existingQuestion, error: fetchError } = await supabase
                    .from('questions')
                    .select('*')
                    .eq('interview_id', interviewId)
                    .eq('question_number', 1)
                    .maybeSingle()

                if (fetchError) throw fetchError

                if (existingQuestion) {
                    setQuestion(existingQuestion.question)
                    setQuestionId(existingQuestion.id)
                    setInterviewState('candidate-turn')
                    return
                }

                const { data, error } = await supabase.functions.invoke(
                    'generate-question',
                    {
                        body: {
                            interviewId,
                            candidateName: user?.firstName,
                            jobRole,
                            interviewType,
                            difficulty,
                            duration,
                            questionNumber: 1,
                        },
                    }
                )

                if (error) throw error

                const { data: insertedQuestion, error: insertError } = await supabase
                    .from('questions')
                    .insert({
                        interview_id: interviewId,
                        question: data.question,
                        question_number: 1,
                    })
                    .select()
                    .single()


                if (insertError) throw insertError

                setQuestion(data.question)
                setQuestionId(insertedQuestion.id)
                setInterviewState('candidate-turn')
            } catch (error) {
                console.error('Error loading or generating question:', error)
                setQuestion('Unable to load interview question.')
            }
        }

        if (
            interviewId &&
            jobRole &&
            interviewType &&
            difficulty &&
            duration
        ) {
            loadOrGenerateQuestion()
        }
    }, [
        supabase,
        interviewId,
        jobRole,
        interviewType,
        difficulty,
        duration,
        user,
    ])

    

    

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
                            {question}
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
                            {interviewState === 'ai-speaking' &&
                                'Please listen to the AI interviewer.'}

                            {interviewState === 'candidate-turn' &&
                                'It is your turn to answer.'}

                            {interviewState === 'listening' &&
                                'The interviewer is listening to your response.'}

                            {interviewState === 'processing' &&
                                'Your response is being processed.'}
                        </p>
                    </div>

                    <div className="flex flex-1 flex-col items-center justify-center py-12">

                        {interviewState === 'ai-speaking' && (
                            <>
                                <div className="flex size-20 items-center justify-center rounded-full bg-[#1A3D63] text-[#B3CFE5]">
                                    <Volume2 size={30} />
                                </div>

                                <p className="mt-6 text-base font-medium text-[#F6FAFD]">
                                    AI is speaking...
                                </p>

                                <div className="mt-3 flex items-center gap-1">
                                    <span className="size-2 animate-pulse rounded-full bg-[#B3CFE5]" />
                                    <span className="size-2 animate-pulse rounded-full bg-[#B3CFE5] [animation-delay:150ms]" />
                                    <span className="size-2 animate-pulse rounded-full bg-[#B3CFE5] [animation-delay:300ms]" />
                                </div>
                            </>
                        )}

                        {interviewState === 'candidate-turn' && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setInterviewState('listening')}
                                    className="flex size-20 items-center justify-center rounded-full bg-[#B3CFE5] text-[#0A1832] transition-colors duration-200 hover:bg-[#F6FAFD]"
                                >
                                    <Mic size={30} />
                                </button>

                                <p className="mt-6 text-base font-medium text-[#F6FAFD]">
                                    Your turn to answer
                                </p>

                                <p className="mt-2 text-sm text-[#B3CFE5]/60">
                                    Click the microphone to start speaking
                                </p>
                            </>
                        )}

                        {interviewState === 'listening' && (
                            <>
                                <button
                                    type="button"
                                    className="flex size-20 items-center justify-center rounded-full bg-red-500 text-white transition-transform duration-200 hover:scale-105"
                                >
                                    <Mic size={30} />
                                </button>

                                <p className="mt-6 text-base font-medium text-[#F6FAFD]">
                                    Listening...
                                </p>
                                

                                <p className="mt-2 text-sm text-[#B3CFE5]/60">
                                    Speak naturally. Your response will be detected automatically.
                                </p>
                            </>
                        )}

                        {interviewState === 'processing' && (
                            <>
                                <div className="flex size-20 items-center justify-center rounded-full bg-[#1A3D63] text-[#B3CFE5]">
                                    <LoaderCircle
                                        size={30}
                                        className="animate-spin"
                                    />
                                </div>

                                <p className="mt-6 text-base font-medium text-[#F6FAFD]">
                                    Processing your response...
                                </p>

                                <p className="mt-2 text-sm text-[#B3CFE5]/60">
                                    Preparing the next part of your interview.
                                </p>
                            </>
                        )}

                    </div>

                    <div className="text-center">
                        <p className="text-xs text-[#B3CFE5]/50">
                            Voice conversation will be connected next.
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