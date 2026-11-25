// Transcripts for the transcript pilot (see transcripts-pilot.md).
// Each file in src/data/transcripts/ is keyed by podcast-episode id and is
// rendered server-side so Google can index it.
import transcripts from '@/data/transcripts'

export function getTranscript(episodeId) {
  return transcripts[episodeId] ?? null
}

export function formatTimestamp(seconds) {
  const s = Math.floor(seconds)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = String(s % 60).padStart(2, '0')
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`
}
