import { useRef, useState } from 'react'
import { createGeminiLiveSession } from '../lib/geminiLive'
import createVoiceAudio from '../lib/voiceAudio'

function useVoiceInterview() {
  const sessionRef = useRef(null)
  const voiceAudioRef = useRef(null)
  const mutedRef = useRef(false)

  const [isConnected, setIsConnected] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  async function connect() {
    try {
      const session = await createGeminiLiveSession()

      sessionRef.current = session

      setIsConnected(true)

      return session
    } catch (error) {
      console.error('Gemini connection error:', error)
      throw error
    }
  }

  async function startMicrophone() {
    try {
      if (!sessionRef.current) {
        throw new Error('Gemini session is not connected')
      }

      const voiceAudio = createVoiceAudio()

      voiceAudioRef.current = voiceAudio

      await voiceAudio.start((pcm16) => {
        if (!sessionRef.current) return
        if (mutedRef.current) return

        const bytes = new Uint8Array(pcm16.buffer)

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
  }

  function mute() {
    mutedRef.current = true
    setIsMuted(true)
  }

  function unmute() {
    mutedRef.current = false
    setIsMuted(false)
  }

  async function stop() {
    if (voiceAudioRef.current) {
      await voiceAudioRef.current.stop()
      voiceAudioRef.current = null
    }

    sessionRef.current = null
    mutedRef.current = false

    setIsListening(false)
    setIsConnected(false)
    setIsMuted(false)
  }

  return {
    connect,
    startMicrophone,
    mute,
    unmute,
    stop,
    isConnected,
    isListening,
    isMuted,
  }
}

export default useVoiceInterview