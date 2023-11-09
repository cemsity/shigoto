import type { Compute, Predicate, Produce } from '../types'
import type { Result } from '../result'

/** 
 * An option type that represents an optional value.
 * 
 * @typeParam T - The type of the value
 * 
 * @template {T} - The type of the value
 */
export interface Option<T> {
    /**
     * Returns `other` if the option is `None`, otherwise returns the option contained value.
     * 
     * @typeParam U - The type of the value for the other option
     * 
     * @param other - The option to return if this option is `None`
     * 
     * @returns  `other` if the option is `None`, otherwise returns the option contained value.
     * 
     * @example
     * ```ts
     * const some = new Some(1)
     * const none = new None()
     * 
     * some.and(none) // None
     * none.and(some) // None
     * some.and(some) // Some(1)
     * ```
     * 
     * @see {@link andThen}
     * @see {@link or}
     * @see {@link orElse}
     * @see {@link xor}
     * @see {@link zip}
     */
  and<U>(other: Option<U>): Option<U>
  /**
   * Returns `None` if the option is `None`, otherwise calls `fn` with the option contained value and returns the result.
   * 
   * @param fn 
   * 
   * @returns `None` if the option is `None`, otherwise calls `fn` with the option contained value and returns the result.
   */
  andThen<U>(fn: Compute<T, Option<U>>): Option<U>
    /**
     * Returns the contained value or throws an error.
     * 
     * @param message - The error message
     * 
     * @returns The contained value
     * 
     * @throws {@link OptionError}
     * If the option is `None`
     */
  expect(message: string): T
  
  /**
   
   * 
   * 
   * @param predicate The predicate to test the contained value.
   * @returns `this` or `None` 
   * 
   * Returns the contained value if `Some`.
   * 
   * 
   * ```ts
   * const some = new Some(1)
   * const pred = o => o === 1;
   * let result = some.filter(pred)
   * 
   * assert(result.isSome())
   * ```
   * 
   * If the predicate returns `false`, `None` is returned.
   * @example
   * ```ts
   * const some = new Some(2)
   * let result = some.filter(pred)
   * assert(result.isNone() === true)
   * ```
   * 
   * If the option is `None`, `None` is returned.
   * @example
   * ```ts
   * const none = new None()
   * let result = none.filter(pred)
   * assert(result.isNone() === true)
   * ```
   */  
  filter(predicate: Predicate<T>): Option<T>
    
  getOrInsert(value: T): T
  getOrInsertWith(fn: Produce<T>): T
  isNone(): boolean
  isSome(): boolean
  map<U>(fn: Compute<T, U>): Option<U>
  mapOr<U>(def: U, fn: Compute<T, U>): U
  mapOrElse<U>(def: Produce<U>, fn: Compute<T, U>): U
  okOr<E>(error: E): Result<T, E>
  okOrElse<E>(error: Produce<E>): Result<T, E>
  or(other: Option<T>): Option<T>
  orElse(fn: Produce<Option<T>>): Option<T>
  replace(value: T): Option<T>
  unwrap(): T
  unwrapOr(def: T): T
  unwrapOrElse(def: Produce<T>): T
  xor(other: Option<T>): Option<T>
  zip<U>(other: Option<U>): Option<[T, U]>
}
