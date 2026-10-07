function createVoiceAudio() {
  let mediaStream = null
  let audioContext = null
  let processor = null

  async function start(onAudioData) {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    })

    audioContext = new AudioContext()
    const source = audioContext.createMediaStreamSource(mediaStream)

    processor = audioContext.createScriptProcessor(
      4096,
      1,
      1
    )

    processor.onaudioprocess = (event) => {
      const inputData = event.inputBuffer.getChannelData(0)

      const inputSampleRate = audioContext.sampleRate
      const outputSampleRate = 16000

      const sampleRateRatio =
        inputSampleRate / outputSampleRate

      const outputLength = Math.floor(
        inputData.length / sampleRateRatio
      )

      const pcm16 = new Int16Array(outputLength)

      for (let i = 0; i < outputLength; i++) {
        const inputIndex = Math.floor(i * sampleRateRatio)

        const sample = Math.max(
          -1,
          Math.min(1, inputData[inputIndex])
        )

        pcm16[i] =
          sample < 0
            ? sample * 0x8000
            : sample * 0x7fff
      }

      onAudioData(pcm16)
    }

    source.connect(processor)
    processor.connect(audioContext.destination)

    return {
      stream: mediaStream,
      sampleRate: audioContext.sampleRate,
    }
  }

  async function stop() {
    if (processor) {
      processor.disconnect()
      processor.onaudioprocess = null
      processor = null
    }

    if (audioContext) {
      await audioContext.close()
      audioContext = null
    }

    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop()
      })

      mediaStream = null
    }
  }

  return {
    start,
    stop,
  }
}

export default createVoiceAudio