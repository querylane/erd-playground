'use client'

import {
  ERDRenderer,
  VersionProvider,
  type Version,
} from '@liam-hq/erd-core'
import { ErdRendererProvider } from '@liam-hq/erd-core/nextjs'
import type { Schema } from '@liam-hq/schema'

type PlaygroundErdViewerProps = {
  schema: Schema
}

const version: Version = {
  version: '1.0.0',
  gitHash: 'standalone',
  envName: 'production',
  date: new Date().toISOString(),
  displayedOn: 'web',
}

export const PlaygroundErdViewer = ({ schema }: PlaygroundErdViewerProps) => {
  return (
    <VersionProvider version={version}>
      <ErdRendererProvider
        schema={{ current: schema }}
        defaultShowMode="ALL_FIELDS"
      >
        <ERDRenderer
          defaultSidebarOpen={false}
          defaultPanelSizes={[20, 80]}
          errorObjects={[]}
        />
      </ErdRendererProvider>
    </VersionProvider>
  )
}
