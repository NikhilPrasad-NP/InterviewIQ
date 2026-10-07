import React, { useRef, useState } from 'react'
import { createGeminiLiveSession } from '../../lib/geminiLive'
import createVoiceAudio from '../../lib/voiceAudio'

function GeminiTestPage() {
  const [status, setStatus] = useState('Not connected')
  const [session, setSession] = useState(null)
  const [micStatus, setMicStatus] = useState('Microphone off')
  const mediaStreamRef = useRef(null)
  const audioContextRef = useRef(null)
const processorRef = useRef(null)
const voiceAudioRef = useRef(null)

  async function handleMicrophone() {
  try {
    setMicStatus('Requesting microphone...')

    const voiceAudio = createVoiceAudio()
    voiceAudioRef.current = voiceAudio

    const result = await voiceAudio.start((pcm16) => {
      console.log(
        '16-bit PCM:',
        pcm16.length,
        'samples at 16000 Hz',
        `${pcm16.byteLength} bytes`
      )

      if (session) {
        const bytes = new Uint8Array(pcm16.buffer)

        let binary = ''

        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i])
        }

        const base64Audio = btoa(binary)

        session.sendRealtimeInput({
          audio: {
            data: base64Audio,
            mimeType: 'audio/pcm;rate=16000',
          },
        })
      }
    })

    setMicStatus('Microphone PCM capture working 🎤')

    console.log('Microphone stream:', result.stream)
    console.log('Audio sample rate:', result.sampleRate)
  } catch (error) {
    console.error('Microphone error:', error)
    setMicStatus('Microphone access failed')
  }
}

  async function handleConnect() {
    try {
      setStatus('Connecting...')

      const liveSession = await createGeminiLiveSession()

      setSession(liveSession)
      setStatus('Connected to Gemini')
    } catch (error) {
      console.error('Gemini connection error:', error)
      setStatus('Connection failed')
    }
  }

  function handleSend() {
  if (!session) return

  session.sendClientContent({
    turns: [
      {
        role: 'user',
        parts: [
          {
            text: 'Hello. Please introduce yourself as a professional interviewer.',
          },
        ],
      },
    ],
    turnComplete: true,
  })

  setStatus('Message sent. Check the browser console.')
}

  return (
    <div className="min-h-screen bg-[#0A1832] p-10 text-[#F6FAFD]">
      <h1 className="text-2xl font-semibold">
        Gemini Live Test
      </h1>

      <p className="mt-4 text-[#B3CFE5]">
        Status: {status}
      </p>
      <p className="mt-4 text-[#B3CFE5]">
  {micStatus}
</p>

      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={handleConnect}
          className="rounded-lg bg-[#B3CFE5] px-5 py-3 text-[#0A1832]"
        >
          Connect
        </button>

        <button
          type="button"
          onClick={handleSend}
          disabled={!session}
          className="rounded-lg bg-[#1A3D63] px-5 py-3 disabled:opacity-50"
        >
          Send Test Message
        </button>
        <button
  type="button"
  onClick={handleMicrophone}
  className="rounded-lg bg-[#4A7FA7] px-5 py-3"
>
  Test Microphone
</button>
      </div>
    </div>
  )
}

export default GeminiTestPage