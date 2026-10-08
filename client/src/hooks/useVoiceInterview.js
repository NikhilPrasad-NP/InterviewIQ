import { useRef, useState } from 'react'
import { createGeminiLiveSession } from '../lib/geminiLive'
import createVoiceAudio from '../lib/voiceAudio'

function useVoiceInterview() {
  const sessionRef = useRef(null)
  const voiceAudioRef = useRef(null)

  const [isConnected, setIsConnected] = useState(false)
  const [isListening, setIsListening] = useState(false)

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

  async function stop() {
    if (voiceAudioRef.current) {
      await voiceAudioRef.current.stop()
      voiceAudioRef.current = null
    }

    sessionRef.current = null

    setIsListening(false)
    setIsConnected(false)
  }

  return {
    connect,
    startMicrophone,
    stop,
    isConnected,
    isListening,
  }
}

export default useVoiceInterview