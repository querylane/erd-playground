'use client'

import { sql } from '@codemirror/lang-sql'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { EditorState } from '@codemirror/state'
import { EditorView, placeholder } from '@codemirror/view'
import { tags } from '@lezer/highlight'
import { useEffect, useRef } from 'react'
import styles from './SqlEditor.module.css'

const PLACEHOLDER = `Paste or type PostgreSQL DDL here...

Example:
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE
);`

const theme = EditorView.theme({
  '&': {
    backgroundColor: 'var(--global-background)',
    color: '#D4D4D4',
  },
  '.cm-content': { caretColor: '#AEAFAD' },
  '.cm-cursor': { borderLeftColor: '#AEAFAD' },
  '.cm-gutters': {
    borderRight: '1px solid var(--pane-border)',
    background: 'var(--global-background)',
  },
  '.cm-lineNumbers': { color: 'var(--overlay-20)' },
  '.cm-activeLine': { backgroundColor: 'var(--overlay-5)' },
  '.cm-activeLineGutter': { backgroundColor: 'var(--overlay-5)' },
  '.cm-selectionBackground': {
    backgroundColor: 'rgba(255, 255, 255, 0.1) !important',
  },
  '&.cm-focused .cm-selectionBackground': {
    backgroundColor: 'rgba(255, 255, 255, 0.15) !important',
  },
  '.cm-placeholder': { color: 'var(--overlay-30)' },
})

const highlightStyle = HighlightStyle.define([
  // Keywords: CREATE, ALTER, DROP, TABLE, etc.
  { tag: tags.keyword, color: '#C586C0' },
  // Data types: SERIAL, VARCHAR, INTEGER, TEXT, TIMESTAMP, etc.
  { tag: tags.typeName, color: '#4EC9B0' },
  // Table and column names
  { tag: tags.propertyName, color: '#9CDCFE' },
  { tag: tags.variableName, color: '#9CDCFE' },
  // String literals
  { tag: tags.string, color: '#CE9178' },
  // Numbers
  { tag: tags.number, color: '#B5CEA8' },
  // Comments
  { tag: tags.comment, color: '#6A9955', fontStyle: 'italic' },
  // Operators and punctuation
  { tag: tags.operator, color: '#D4D4D4' },
  { tag: tags.punctuation, color: '#D4D4D4' },
  // SQL functions (NOW, COUNT, etc.)
  { tag: tags.function(tags.variableName), color: '#DCDCAA' },
  // Constraint keywords (PRIMARY KEY, REFERENCES, NOT NULL, etc.)
  { tag: tags.special(tags.keyword), color: '#569CD6', fontWeight: 'bold' },
])

type SqlEditorProps = {
  value: string
  onChange: (value: string) => void
  isParsing: boolean
  onReset?: () => void
  showReset?: boolean
}

export const SqlEditor = ({
  value,
  onChange,
  isParsing,
  onReset,
  showReset,
}: SqlEditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    if (!containerRef.current) return

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChangeRef.current(update.state.doc.toString())
      }
    })

    const state = EditorState.create({
      doc: value,
      extensions: [
        sql(),
        syntaxHighlighting(highlightStyle),
        theme,
        EditorView.lineWrapping,
        placeholder(PLACEHOLDER),
        updateListener,
      ],
    })

    const view = new EditorView({ state, parent: containerRef.current })
    viewRef.current = view

    return () => {
      view.destroy()
      viewRef.current = null
    }
    // Only create the editor once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const view = viewRef.current
    if (!view) return
    const currentDoc = view.state.doc.toString()
    if (currentDoc !== value) {
      view.dispatch({
        changes: { from: 0, to: currentDoc.length, insert: value },
      })
    }
  }, [value])

  return (
    <div className={styles.wrapper}>
      <div ref={containerRef} className={styles.editor} />
      <div className={styles.statusBar}>
        <span>{isParsing ? 'Parsing...' : 'PostgreSQL DDL'}</span>
        <span className={styles.spacer} />
        {showReset && onReset && (
          <button
            type="button"
            className={styles.resetButton}
            onClick={onReset}
          >
            Load example
          </button>
        )}
      </div>
    </div>
  )
}
