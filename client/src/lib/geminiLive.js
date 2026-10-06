import { GoogleGenAI, Modality } from '@google/genai'

function createAudioPlayer() {
  let audioContext = null
  let nextStartTime = 0

  async function initialize() {
    audioContext = new AudioContext({
      sampleRate: 24000,
    })

    await audioContext.resume()
    nextStartTime = audioContext.currentTime
  }

  function play(base64Audio) {
    if (!audioContext) return

    // Decode base64 into raw PCM bytes.
    const binary = atob(base64Audio)
    const bytes = Uint8Array.from(binary, (char) =>
      char.charCodeAt(0)
    )

    // Gemini returns signed 16-bit little-endian PCM.
    const view = new DataView(bytes.buffer)
    const samples = new Float32Array(bytes.length / 2)

    for (let i = 0; i < samples.length; i++) {
      samples[i] = view.getInt16(i * 2, true) / 32768
    }

    // Create a mono audio buffer at 24 kHz.
    const buffer = audioContext.createBuffer(
      1,
      samples.length,
      24000
    )

    buffer.copyToChannel(samples, 0)

    const source = audioContext.createBufferSource()
    source.buffer = buffer
    source.connect(audioContext.destination)

    // Schedule each chunk immediately after the previous one.
    const startTime = Math.max(
      audioContext.currentTime,
      nextStartTime
    )

    source.start(startTime)
    nextStartTime = startTime + buffer.duration
  }

  async function close() {
    if (audioContext) {
      await audioContext.close()
      audioContext = null
    }
  }

  return {
    initialize,
    play,
    close,
  }
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const GEMINI_TOKEN_URL =
  'https://fwzbjteklwpxbonyedhz.supabase.co/functions/v1/gemini-token'

export async function createGeminiLiveSession() {
  const audioPlayer = createAudioPlayer()
await audioPlayer.initialize()
  const response = await fetch( `${SUPABASE_URL}/functions/v1/gemini-token`, 
    {
    method: 'POST',
    headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })

  if (!response.ok) {
  const error = await response.json()

  console.error('Gemini token error:', error)

  throw new Error(
    error.details?.error?.message ||
    error.error ||
    'Failed to get Gemini token'
  )
}

  const { token } = await response.json()

  const ai = new GoogleGenAI({
    apiKey: token,
  })

  const session = await ai.live.connect({
    model: 'gemini-3.8-live',
    config: {
      responseModalities: [Modality.AUDIO],
    },
    callbacks: {
      onopen() {
        console.log('Gemini Live connected')
      },

      onmessage(message) {
  const parts = message.serverContent?.modelTurn?.parts || []

  for (const part of parts) {
    if (
      part.inlineData?.mimeType?.startsWith('audio/pcm') &&
      part.inlineData.data
    ) {
      audioPlayer.play(part.inlineData.data)
    }
  }

  if (message.serverContent?.turnComplete) {
    console.log('Gemini finished speaking')
  }
},

      onerror(error) {
        console.error('Gemini Live error:', error)
      },

      onclose(event) {
        console.log('Gemini Live closed:', event.reason)
      },
    },
  })

  return session
}