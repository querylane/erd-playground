'use client'

import type { Schema } from '@liam-hq/schema'
import { useCallback, useEffect, useRef, useState } from 'react'
import { parseSql } from './actions'

type ParseError = {
  name: string
  message: string
}

type ParseState = {
  schema: Schema
  errors: ParseError[]
  isParsing: boolean
  isStale: boolean
}

const emptySchema: Schema = { tables: {}, enums: {}, extensions: {} }

const DEBOUNCE_MS = 500

const isEmptySchema = (schema: Schema) =>
  Object.keys(schema.tables).length === 0

export const useSqlParser = (sqlText: string): ParseState => {
  const [schema, setSchema] = useState<Schema>(emptySchema)
  const [errors, setErrors] = useState<ParseError[]>([])
  const [isParsing, setIsParsing] = useState(true)
  const [isStale, setIsStale] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const requestIdRef = useRef(0)
  const isFirstParse = useRef(true)

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const runParse = useCallback(
    (sql: string, requestId: number) => {
      parseSql(sql)
        .then((result) => {
          if (requestId !== requestIdRef.current) return

          if (result.errors.length === 0 || !isEmptySchema(result.schema)) {
            setSchema(result.schema)
            setErrors(result.errors)
            setIsStale(false)
          } else {
            setErrors(result.errors)
            setIsStale(true)
          }
        })
        .catch((e: unknown) => {
          if (requestId !== requestIdRef.current) return
          const message = e instanceof Error ? e.message : String(e)
          setErrors([{ name: 'ParseError', message }])
          setIsStale(true)
        })
        .finally(() => {
          if (requestId !== requestIdRef.current) return
          setIsParsing(false)
        })
    },
    [],
  )

  useEffect(() => {
    clearTimer()

    if (!sqlText.trim()) {
      setSchema(emptySchema)
      setErrors([])
      setIsParsing(false)
      setIsStale(false)
      return clearTimer
    }

    setIsParsing(true)
    const currentRequestId = ++requestIdRef.current

    // Parse immediately on first load, debounce subsequent edits
    if (isFirstParse.current) {
      isFirstParse.current = false
      runParse(sqlText, currentRequestId)
      return clearTimer
    }

    timerRef.current = setTimeout(
      () => runParse(sqlText, currentRequestId),
      DEBOUNCE_MS,
    )

    return clearTimer
  }, [sqlText, clearTimer, runParse])

  return { schema, errors, isParsing, isStale }
}
