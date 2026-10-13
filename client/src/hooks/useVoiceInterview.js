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

  const [isConnected, setIsConnected] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const connect = useCallback(async () => {
    if (sessionRef.current) {
      return sessionRef.current
    }

    if (connectPromiseRef.current) {
      return connectPromiseRef.current
    }

    const connectionPromise = (async () => {
      try {
        const session = await createGeminiLiveSession({
  onTurnComplete: () => {
    turnCompleteCallbackRef.current?.()
  },
})

        sessionRef.current = session
        setIsConnected(true)

        return session
      } catch (error) {
        console.error('Gemini connection error:', error)
        throw error
      } finally {
        connectPromiseRef.current = null
      }
    })()

    connectPromiseRef.current = connectionPromise

    return connectionPromise
  }, [])

  const startMicrophone = useCallback(async () => {
    try {
      if (!sessionRef.current) {
        throw new Error('Gemini session is not connected')
      }

      if (voiceAudioRef.current) {
        return
      }

      const voiceAudio = createVoiceAudio()
      voiceAudioRef.current = voiceAudio

      await voiceAudio.start((pcm16) => {
        if (!sessionRef.current || mutedRef.current) return

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

        sessionRef.current.sendRealtimeInput({
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
  if (!sessionRef.current) {
    throw new Error('Gemini session is not connected')
  }

  sendInterviewQuestion(sessionRef.current, question)
}, [])

const setOnTurnComplete = useCallback((callback) => {
  turnCompleteCallbackRef.current = callback
}, [])

  const stop = useCallback(async () => {
    if (voiceAudioRef.current) {
      await voiceAudioRef.current.stop()
      voiceAudioRef.current = null
    }

    sessionRef.current = null
    mutedRef.current = false

    setIsListening(false)
    setIsConnected(false)
    setIsMuted(false)
  }, [])

  return {
  connect,
  startMicrophone,
  sendQuestion,
  setOnTurnComplete,
  mute,
  unmute,
  stop,
  isConnected,
  isListening,
  isMuted,
}
}

export default useVoiceInterview