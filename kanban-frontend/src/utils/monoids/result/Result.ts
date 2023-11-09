// export type Result<T, E = Error > = {ok: true, value: T} | {ok: false, error: E}

import type { Compute } from '../types'
import type { Option } from '../option/Option'

import ResultError from './ResultError'
// export const Ok = <T>(data: T): Result<T, never> => {
//   return {ok: true, value: data}
// }

// export const Err = <E>(error: E): Result<never, E> => {
//   return {ok: false, error}
// }

export interface Result<T, E> {
  and<U>(other: Result<U, E>): Result<U, E>
  andThen<U>(fn: Compute<T, Result<U, E>>): Result<U, E>
  err(): Option<E>
  expect(message: string): T
  expectErr(message: string): E
  isErr(): boolean
  isOk(): boolean
  map<U>(fn: Compute<T, U>): Result<U, E>
  mapErr<F>(fn: Compute<E, F>): Result<T, F>
  mapOr<U>(def: U, fn: Compute<T, U>): U
  mapOrElse<U>(def: Compute<E, U>, fn: Compute<T, U>): U
  ok(): Option<T>
  or<F>(other: Result<T, F>): Result<T, F>
  orElse<F>(fn: Compute<E, Result<T, F>>): Result<T, F>

  /**
   * @typeParam T - Type of value
   * @returns <T> - The value
   * @throws {@link ResultError}
   * If result is not `Ok`
   */
  unwrap(): T

  /**
   * @throws {ResultError} If this result is not `Err`.
   */
  unwrapErr(): E
  /**
   * @param def - The default value.
   *
   * @returns - The  value in this result or the default value.
   */
  unwrapOr(def: T): T
  /**
   * @typeParam T -
   * @typeParam E -
   *
   * @param fn - The default value computer
   *
   * @returns The vale in this result or the default value
   */
  unwrapOrElse(fn: Compute<E, T>): T
}
