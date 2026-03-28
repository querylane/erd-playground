'use server'

import { parse } from '@liam-hq/schema/parser'

export const parseSql = async (sql: string) => {
  const { value, errors } = await parse(sql, 'postgres')
  return {
    schema: value,
    errors: errors.map((e) => ({ name: e.name, message: e.message })),
  }
}
