import { formatTimestamp } from '@/lib/transcripts'

// Server-rendered, collapsible transcript. <details> content is part of the
// HTML response, so it is crawlable even while collapsed.
export function TranscriptSection({ transcript }) {
  return (
    <section id="transcript" aria-labelledby="transcript-heading" className="mt-16 max-w-3xl scroll-mt-24">
      <h2 id="transcript-heading" className="text-xl font-bold text-slate-900">
        Episode transcript
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        Machine-generated with Whisper and lightly edited for names and readability.
        It may contain errors — the audio is the final word.
      </p>
      <details className="group mt-4 rounded-lg border border-slate-200">
        <summary className="cursor-pointer list-none px-5 py-3 font-bold text-pink-600 hover:text-pink-700">
          <span className="group-open:hidden">Read the transcript ▸</span>
          <span className="hidden group-open:inline">Hide the transcript ▾</span>
        </summary>
        <div className="prose prose-slate max-w-none border-t border-slate-200 px-5 py-4">
          {transcript.sections.map((section) => (
            <div key={section.start}>
              <h3 id={`t-${Math.floor(section.start)}`}>
                <span className="font-mono text-slate-500">
                  {formatTimestamp(section.start)}
                </span>
                {section.heading ? ` — ${section.heading}` : ''}
              </h3>
              {section.paragraphs.map((p, i) => (
                <p key={i}>
                  {p.speaker && <strong>{p.speaker}: </strong>}
                  {p.text}
                </p>
              ))}
            </div>
          ))}
        </div>
      </details>
    </section>
  )
}

export function TranscriptJumpLink() {
  return (
    <p className="mt-6 text-sm">
      <a href="#transcript" className="font-bold text-pink-600 hover:text-pink-700">
        Read the full episode transcript ↓
      </a>
    </p>
  )
}
