'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100dvh',
        gap: '16px',
        backgroundColor: '#141616',
        color: '#d4d4d4',
        fontFamily: 'monospace',
      }}
    >
      <p>Something went wrong.</p>
      <button
        type="button"
        onClick={reset}
        style={{
          padding: '8px 16px',
          color: '#d4d4d4',
          backgroundColor: 'transparent',
          border: '1px solid #3a3d3d',
          borderRadius: '6px',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Try again
      </button>
    </div>
  )
}
