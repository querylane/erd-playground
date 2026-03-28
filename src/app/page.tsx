'use client'

import dynamic from 'next/dynamic'

const PlaygroundPage = dynamic(
  () => import('./PlaygroundPage').then((m) => m.PlaygroundPage),
  { ssr: false },
)

export default function Page() {
  return <PlaygroundPage />
}
