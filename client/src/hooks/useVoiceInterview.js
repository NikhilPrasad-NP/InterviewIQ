import { useCallback, useRef, useState } from 'react'
import { createGeminiLiveSession } from '../lib/geminiLive'
import createVoiceAudio from '../lib/voiceAudio'
import { sendInterviewQuestion } from '../lib/geminiLive'

function useVoiceInterview() {
  const sessionRef = useRef(null)
  const connectPromiseRef = useRef(null)
  const voiceAudioRef = useRef(null)
  const mutedRef = useRef(false)
  const turnCompleteCallbackRef = useRef(null)
  const transcriptCallbackRef = useRef(null)
  const outputTranscriptionCallbackRef = useRef(null)
  const transcriptBufferRef = useRef('')
  const [transcript, setTranscript] = useState('')
  const lifecycleIdRef = useRef(0)

  const [isConnected, setIsConnected] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const connect = useCallback(async () => {
  if (sessionRef.current) {
    return sessionRef.current.session
  }

  if (connectPromiseRef.current) {
    return connectPromiseRef.current
  }

  const attemptId = lifecycleIdRef.current

  const connectionPromise = (async () => {
    let liveConnection

    try {
      liveConnection = await createGeminiLiveSession({
  onTurnComplete: () => {
    turnCompleteCallbackRef.current?.()
  },

  onInputTranscription: (text) => {
    transcriptBufferRef.current += text
    setTranscript(transcriptBufferRef.current)
    console.log('Sending candidate transcription to InterviewPage:', text)
    transcriptCallbackRef.current?.(text)
  },
  onOutputTranscription: (text, metadata) => {
  outputTranscriptionCallbackRef.current?.(text, metadata)
},
})

      // stop() may have been called while connecting.
      if (attemptId !== lifecycleIdRef.current) {
        await liveConnection.close()
        return null
      }

      sessionRef.current = liveConnection
      setIsConnected(true)

      return liveConnection.session
    } catch (error) {
      // Don't report an obsolete connection attempt as a new failure.
      if (attemptId === lifecycleIdRef.current) {
        console.error('Gemini connection error:', error)
      }

      throw error
    } finally {
      if (connectPromiseRef.current === connectionPromise) {
        connectPromiseRef.current = null
      }
    }
  })()

  connectPromiseRef.current = connectionPromise

  return connectionPromise
}, [])

  const startMicrophone = useCallback(async () => {
    try {
      if (!sessionRef.current?.session) {
  throw new Error('Gemini session is not connected')
}

      if (voiceAudioRef.current) {
        return
      }

      const voiceAudio = createVoiceAudio()
      voiceAudioRef.current = voiceAudio

      await voiceAudio.start((pcm16) => {
        if (!sessionRef.current?.session || mutedRef.current) return

        const bytes = new Uint8Array(
          pcm16.buffer,
          pcm16.byteOffset,
          pcm16.byteLength
        )

        let binary = ''

        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i])
        }

        const base64Audio = btoa(binary)

        sessionRef.current.session.sendRealtimeInput({
          audio: {
            data: base64Audio,
            mimeType: 'audio/pcm;rate=16000',
          },
        })
      })

      setIsListening(true)
    } catch (error) {
      console.error('Microphone error:', error)
      throw error
    }
  }, [])

  const mute = useCallback(() => {
  mutedRef.current = true
  setIsMuted(true)
}, [])

const unmute = useCallback(() => {
  mutedRef.current = false
  setIsMuted(false)
}, [])

  const sendQuestion = useCallback((question) => {
  if (!sessionRef.current?.session) {
    throw new Error('Gemini session is not connected')
  }

  sendInterviewQuestion(sessionRef.current.session, question)
}, [])

const setOnTurnComplete = useCallback((callback) => {
  turnCompleteCallbackRef.current = callback
}, [])

const setOnTranscript = useCallback((callback) => {
  transcriptCallbackRef.current = callback
}, [])

const setOnOutputTranscription = useCallback((callback) => {
  outputTranscriptionCallbackRef.current = callback
}, [])

const clearTranscript = useCallback(() => {
  transcriptBufferRef.current = ''
  setTranscript('')
}, [])

const getTranscript = useCallback(() => {
  return transcriptBufferRef.current.trim()
}, [])

const stop = useCallback(async () => {
  // Invalidate any connection attempt still in progress.
  lifecycleIdRef.current += 1

  const liveConnection = sessionRef.current

  sessionRef.current = null
  connectPromiseRef.current = null
  mutedRef.current = false

  try {
    const voiceAudio = voiceAudioRef.current
    voiceAudioRef.current = null

    if (voiceAudio) {
      await voiceAudio.stop()
    }
  } catch (error) {
    console.error('Error stopping microphone:', error)
  }

  try {
    if (liveConnection) {
      await liveConnection.close()
    }
  } catch (error) {
    console.error('Error closing Gemini session:', error)
  } finally {
    setIsListening(false)
    setIsConnected(false)
    setIsMuted(false)
  }
}, [])

  return {
  connect,
  startMicrophone,
  sendQuestion,
  setOnTurnComplete,
  setOnTranscript,
  setOnOutputTranscription,
  clearTranscript,
  getTranscript,
  transcript,
  mute,
  unmute,
  stop,
  isConnected,
  isListening,
  isMuted,
}
}

export default useVoiceInterview