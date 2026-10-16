import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Mic, Volume2, PhoneOff, LoaderCircle, } from 'lucide-react'
import { useAuth, useUser } from '@clerk/react'
import { createSupabaseClient } from '../../lib/supabase'
import { createAnswer } from '../../lib/answerService'
import useVoiceInterview from '../../hooks/useVoiceInterview'



function InterviewPage() {
    const {
  connect,
  startMicrophone,
  sendQuestion,
  setOnTurnComplete,
  setOnTranscript,
  setOnOutputTranscription,
  mute,
  unmute,
  stop,
  isConnected,
  isListening,
  isMuted,
} = useVoiceInterview()
    const location = useLocation()
    const navigate = useNavigate()
    const { getToken } = useAuth()
    const { user } = useUser()
    const questionSentRef = useRef(false)
    const questionLoadStartedRef = useRef(false)
    const outputTranscriptionRef = useRef('')
    const savedAnswerQuestionIdsRef = useRef(new Set())
    const questionNumberRef = useRef(1)
    const activeQuestionIdRef = useRef(null)
    const savingQuestionRef = useRef(false)
    

    const [questionId, setQuestionId] = useState(null)
    useEffect(() => {
  activeQuestionIdRef.current = questionId
}, [questionId])
    const [question, setQuestion] = useState('Loading your interview question...')
    const [interviewState, setInterviewState] = useState('ai-speaking')
    const {interviewId,jobRole,interviewType,difficulty,duration,} = location.state || {}
    const [timeLeft, setTimeLeft] = useState(Math.max(1, Number(duration) || 30) * 60)
    const endingRef = useRef(false)
    

    const supabase = useMemo(
        () => createSupabaseClient(getToken),
        [getToken]
    )


    useEffect(() => {
    if (
        !interviewId ||
        !jobRole ||
        !interviewType ||
        !difficulty ||
        !duration ||
        questionLoadStartedRef.current
    ) {
        return
    }

    questionLoadStartedRef.current = true

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
                    activeQuestionIdRef.current = existingQuestion.id
                    questionNumberRef.current = existingQuestion.question_number || 1
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
                activeQuestionIdRef.current = insertedQuestion.id
                questionNumberRef.current = insertedQuestion.question_number || 1
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

    useEffect(() => {
    async function connectVoice() {
        try {
            await connect()
        } catch (error) {
            console.error('Error connecting voice interview:', error)
        }
    }

    if (interviewId) {
        connectVoice()
    }
}, [interviewId, connect])

useEffect(() => {
  setOnTurnComplete(() => {
    setInterviewState((currentState) =>
      currentState === 'ai-speaking'
        ? 'candidate-turn'
        : currentState
    )
  })
}, [setOnTurnComplete])

useEffect(() => {
  setOnTranscript((text) => {
    const answerText = text.trim()
    const currentQuestionId = activeQuestionIdRef.current

    if (!answerText || !currentQuestionId) {
      return
    }

    if (savedAnswerQuestionIdsRef.current.has(currentQuestionId)) {
      return
    }

    savedAnswerQuestionIdsRef.current.add(currentQuestionId)

    void (async () => {
      try {
        const savedAnswer = await createAnswer(supabase, {
          question_id: currentQuestionId,
          answer_text: answerText,
        })

        console.log('Answer saved successfully:', savedAnswer)
      } catch (error) {
        savedAnswerQuestionIdsRef.current.delete(currentQuestionId)
        console.error('Failed to save interview answer:', error)
      }
    })()
  })
}, [setOnTranscript, supabase])

useEffect(() => {
  setOnOutputTranscription((text, metadata) => {
    if (metadata?.isNewTurn) {
      outputTranscriptionRef.current = ''
    }

    if (text) {
      outputTranscriptionRef.current += text

      setQuestion(outputTranscriptionRef.current.trim())
    }

    if (!metadata?.turnComplete) {
      return
    }

    const completedResponse = outputTranscriptionRef.current.trim()

    // The initial question already exists in Supabase.
    if (questionNumberRef.current === 1) {
      questionNumberRef.current = 2
      return
    }

    // Prevent duplicate inserts while a question is being saved.
    if (savingQuestionRef.current || !completedResponse) {
      return
    }

    // Ignore responses that do not appear to contain a question.
    if (!completedResponse.includes('?')) {
      return
    }

    savingQuestionRef.current = true

    void (async () => {
      try {
        const nextQuestionNumber = questionNumberRef.current

        const { data: insertedQuestion, error } = await supabase
          .from('questions')
          .insert({
            interview_id: interviewId,
            question: completedResponse,
            question_number: nextQuestionNumber,
          })
          .select()
          .single()

        if (error) {
          throw error
        }

        // Activate the new question only after it is saved.
        questionNumberRef.current = nextQuestionNumber + 1
        activeQuestionIdRef.current = insertedQuestion.id
        setQuestionId(insertedQuestion.id)

        console.log('Follow-up question saved:', insertedQuestion)
      } catch (error) {
        console.error('Failed to save follow-up question:', error)
      } finally {
        savingQuestionRef.current = false
      }
    })()
  })
}, [setOnOutputTranscription, supabase, interviewId])

useEffect(() => {
  if (
    !isConnected ||
    !questionId ||
    !question ||
    question === 'Loading your interview question...' ||
    question === 'Unable to load interview question.' ||
    questionSentRef.current
  ) {
    return
  }

  try {
    sendQuestion(question)
    questionSentRef.current = true
    setInterviewState('ai-speaking')
    console.log('Interview question sent to Gemini:', question)
  } catch (error) {
    console.error('Error sending interview question:', error)
  }
}, [isConnected, questionId, question, sendQuestion])

useEffect(() => {
  return () => {
    void stop()
  }
}, [stop])


async function handleEndInterview() {
  if (endingRef.current && timeLeft !== 0) return

  endingRef.current = true

  try {
    await stop()

    if (interviewId) {
      const { error } = await supabase
        .from('interviews')
        .update({ status: 'completed' })
        .eq('id', interviewId)

      if (error) throw error
    }

    navigate('/dashboard')
  } catch (error) {
    console.error('Error ending interview:', error)
  }
}

useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft((previous) => {
      if (previous <= 1) {
        clearInterval(timer)
        return 0
      }

      return previous - 1
    })
  }, 1000)

  return () => clearInterval(timer)
}, [])

useEffect(() => {
  if (timeLeft === 0 && !endingRef.current) {
    endingRef.current = true
    void handleEndInterview()
  }
}, [timeLeft])

console.log('Current interview ID:', interviewId)

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
                        {`${Math.floor(timeLeft / 60)
                        .toString()
                        .padStart(2, '0')}:${(timeLeft % 60)
                        .toString()
                        .padStart(2, '0')}`}
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
                                    onClick={async () => {
  try {
    if (!isConnected) {
      console.error('Gemini is not connected yet.')
      return
    }

    if (isMuted) {
      unmute()
      setInterviewState('listening')
    } else if (isListening) {
      mute()
      setInterviewState('candidate-turn')
    } else {
      await startMicrophone()
      unmute()
      setInterviewState('listening')
    }
  } catch (error) {
    console.error('Microphone error:', error)
  }
}}
                                    className="flex size-20 items-center justify-center rounded-full bg-[#B3CFE5] text-[#0A1832] transition-colors duration-200 hover:bg-[#F6FAFD]"
                                >
                                    {isListening ? <Mic size={30} /> : <Mic size={30} />}
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
            onClick={() => {
                mute()
                setInterviewState('candidate-turn')
            }}
            className="flex size-20 items-center justify-center rounded-full bg-red-500 text-white transition-transform duration-200 hover:scale-105"
        >
            <Mic size={30} />
        </button>

        <p className="mt-6 text-base font-medium text-[#F6FAFD]">
            Listening...
        </p>

        <p className="mt-2 text-sm text-[#B3CFE5]/60">
            Click the microphone to mute and stop sending audio.
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