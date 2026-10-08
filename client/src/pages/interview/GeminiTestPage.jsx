import React, { useState } from 'react'
import useVoiceInterview from '../../hooks/useVoiceInterview'

function GeminiTestPage() {
  const [status, setStatus] = useState('Not connected')
  const [micStatus, setMicStatus] = useState('Microphone off')

  const {
  connect,
  startMicrophone,
  mute,
  unmute,
  isMuted,
  isListening,
} = useVoiceInterview()

  function handleMuteToggle() {
  if (isMuted) {
    unmute()
  } else {
    mute()
  }
}

  async function handleConnect() {
    try {
      setStatus('Connecting...')

      await connect()

      setStatus('Connected to Gemini')
    } catch (error) {
      console.error('Gemini connection error:', error)
      setStatus('Connection failed')
    }
  }

  async function handleMicrophone() {
    try {
      setMicStatus('Starting microphone...')

      await startMicrophone()

      setMicStatus('Microphone PCM capture working 🎤')
    } catch (error) {
      console.error('Microphone error:', error)
      setMicStatus('Microphone access failed')
    }
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
          onClick={handleMicrophone}
          className="rounded-lg bg-[#4A7FA7] px-5 py-3"
        >
          Test Microphone
        </button>
        <button
  type="button"
  onClick={handleMuteToggle}
  disabled={!isListening}
  className="rounded-lg bg-[#B3CFE5] px-5 py-3 text-[#0A1832] disabled:cursor-not-allowed disabled:opacity-40"
>
  {isMuted ? 'Unmute' : 'Mute'}
</button>
      </div>
    </div>
  )
}

export default GeminiTestPage