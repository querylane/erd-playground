'use client'

import dynamic from 'next/dynamic'

const Loading = () => (
  <div
    style={{
      display: 'flex',
      height: '100dvh',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#141616',
      color: '#6c7b7f',
      fontFamily:
        "Monaco, Menlo, 'Ubuntu Mono', Consolas, 'source-code-pro', monospace",
      fontSize: '14px',
      gap: '12px',
    }}
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <title>Loading</title>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="31.4 31.4"
        strokeLinecap="round"
      />
    </svg>
    Loading ERD Playground...
    <style>{'@keyframes spin { to { transform: rotate(360deg) } }'}</style>
  </div>
)

const PlaygroundPage = dynamic(
  () => import('./PlaygroundPage').then((m) => m.PlaygroundPage),
  { ssr: false, loading: Loading },
)

export default function Page() {
  return <PlaygroundPage />
}
