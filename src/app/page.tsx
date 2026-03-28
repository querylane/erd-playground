'use client'

import dynamic from 'next/dynamic'
import { LoadingScreen } from './LoadingScreen'

const PlaygroundPage = dynamic(
  () => import('./PlaygroundPage').then((m) => m.PlaygroundPage),
  { ssr: false, loading: LoadingScreen },
)

export default function Page() {
  return <PlaygroundPage />
}
