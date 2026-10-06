import React, { useState } from 'react'
import { createGeminiLiveSession } from '../../lib/geminiLive'

function GeminiTestPage() {
  const [status, setStatus] = useState('Not connected')
  const [session, setSession] = useState(null)

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
      </div>
    </div>
  )
}

export default GeminiTestPage