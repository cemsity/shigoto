import type { Produce } from '../types'
import { Err } from './Err'
import { Ok } from './Ok'
import type { Result } from './Result'

export const attempt = <T, E = Error>(fn: Produce<T>): Result<T, E> => {
  try {
    return ok(fn())
  } catch (error) {
    return err(error as E)
  }
}

export const err = <T, E>(value: E) => new Err<T, E>(value)

export const ok = <T, E>(value: T) => new Ok<T, E>(value)

export type { Result } from './Result'
