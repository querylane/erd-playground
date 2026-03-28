'use client'

import { ERDRenderer, VersionProvider, versionSchema } from '@liam-hq/erd-core'
import { ErdRendererProvider } from '@liam-hq/erd-core/nextjs'
import type { Schema } from '@liam-hq/schema'
import * as v from 'valibot'

type PlaygroundErdViewerProps = {
  schema: Schema
}

const versionData = {
  version: '0.1.0',
  gitHash: process.env.NEXT_PUBLIC_GIT_HASH || 'unknown',
  envName: process.env.NEXT_PUBLIC_ENV_NAME || 'development',
  date: process.env.NEXT_PUBLIC_RELEASE_DATE || new Date().toISOString(),
  displayedOn: 'web' as const,
}
const version = v.parse(versionSchema, versionData)

export const PlaygroundErdViewer = ({ schema }: PlaygroundErdViewerProps) => {
  return (
    <VersionProvider version={version}>
      <ErdRendererProvider schema={{ current: schema }} defaultShowMode="ALL_FIELDS">
        <ERDRenderer
          defaultSidebarOpen={false}
          defaultPanelSizes={[20, 80]}
          errorObjects={[]}
        />
      </ErdRendererProvider>
    </VersionProvider>
  )
}
