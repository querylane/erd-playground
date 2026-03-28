'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@liam-hq/ui'
import { useCallback, useEffect, useState } from 'react'
import { ErrorDisplay } from './ErrorDisplay'
import { PlaygroundErdViewer } from './PlaygroundErdViewer'
import styles from './PlaygroundPage.module.css'
import { SqlEditor } from './SqlEditor'
import { useSqlParser } from './useSqlParser'

const STORAGE_KEY = 'erd-playground-sql'

const DEFAULT_SQL = `-- Example: Blog database schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  display_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  author_id INTEGER NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  body TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES posts(id),
  author_id INTEGER NOT NULL REFERENCES users(id),
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE post_tags (
  post_id INTEGER NOT NULL REFERENCES posts(id),
  tag_id INTEGER NOT NULL REFERENCES tags(id),
  PRIMARY KEY (post_id, tag_id)
);`

const loadSavedSql = (): string => {
  if (typeof window === 'undefined') return DEFAULT_SQL
  try {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_SQL
  } catch {
    return DEFAULT_SQL
  }
}

const saveSql = (sql: string) => {
  try {
    localStorage.setItem(STORAGE_KEY, sql)
  } catch {
    // localStorage may be unavailable (private browsing, quota exceeded)
  }
}

export const PlaygroundPage = () => {
  const [sqlText, setSqlText] = useState(DEFAULT_SQL)
  const [isResizing, setIsResizing] = useState(false)
  const { schema, errors, isParsing, isStale } = useSqlParser(sqlText)

  // Load saved SQL from localStorage on mount
  useEffect(() => {
    setSqlText(loadSavedSql())
  }, [])

  // Persist SQL to localStorage on change
  useEffect(() => {
    saveSql(sqlText)
  }, [sqlText])

  const handleReset = useCallback(() => setSqlText(DEFAULT_SQL), [])
  const showReset = sqlText !== DEFAULT_SQL

  return (
    <div className={styles.container}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={() => setIsResizing(false)}
      >
        <ResizablePanel defaultSize={40} minSize={20} isResizing={isResizing}>
          <div className={styles.editorPanel}>
            <SqlEditor
              value={sqlText}
              onChange={setSqlText}
              isParsing={isParsing}
              onReset={handleReset}
              showReset={showReset}
            />
            <ErrorDisplay errors={errors} isStale={isStale} />
          </div>
        </ResizablePanel>
        <ResizableHandle
          withHandle
          onDragging={(isDragging) => setIsResizing(isDragging)}
        />
        <ResizablePanel defaultSize={60} minSize={30} isResizing={isResizing}>
          <div
            className={`${styles.viewerPanel} ${isStale ? styles.viewerStale : ''}`}
          >
            {isStale && (
              <div className={styles.staleBanner}>
                Showing last valid diagram — fix errors to update
              </div>
            )}
            {isParsing && (
              <div className={styles.parsingOverlay}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={styles.spinner}
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
                Building diagram...
              </div>
            )}
            <PlaygroundErdViewer schema={schema} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
