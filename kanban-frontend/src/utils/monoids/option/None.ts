import { err, type Result } from '../result'
import type { Compute, Predicate, Produce } from '../types'
import type { Option } from './Option'
import { OptionError } from './OptionError'
import { Some } from './Some'

export class None<T> implements Option<T> {
  and<U>(other: Option<U>): Option<U> {
    return new None()
  }
  andThen<U>(fn: Compute<T, Option<U>>): Option<U> {
    return new None()
  }
  expect(message: string): never {
    throw new OptionError(message)
  }
  filter(_: Predicate<T>): Option<T> {
    return new None()
  }
  getOrInsert(value: T): T {
    this.replace(value)
    return value
  }
  getOrInsertWith(fn: Produce<T>): T {
    const value = fn()
    this.replace(value)
    return value
  }
  isNone(): boolean {
    return true
  }
  isSome(): boolean {
    return false
  }
  map<U>(_: Compute<T, U>): Option<U> {
    return new None()
  }
  mapOr<U>(def: U, _: Compute<T, U>): U {
    return def
  }
  mapOrElse<U>(def: Produce<U>, _: Compute<T, U>): U {
    return def()
  }
  okOr<E>(error: E): Result<T, E> {
    return err(error)
  }
  okOrElse<E>(error: Produce<E>): Result<T, E> {
    return err(error())
  }
  or(other: Option<T>): Option<T> {
    return other
  }
  orElse(fn: Produce<Option<T>>): Option<T> {
    return fn()
  }
  replace(value: T): Option<T> {
    Object.setPrototypeOf(this, Some.prototype).value = value
    return new None()
  }
  unwrap(): T {
    throw new OptionError('There is no `Some` value to unwrap.')
  }
  unwrapOr(def: T): T {
    return def
  }
  unwrapOrElse(def: Produce<T>): T {
    return def()
  }
  xor(other: Option<T>): Option<T> {
    return other.isSome() ? other : new None()
  }
  zip<U>(_: Option<U>): Option<[T, U]> {
    return new None()
  }
}
