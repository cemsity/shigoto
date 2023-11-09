import { ok, type Result } from '../result'
import type { Compute, Predicate, Produce } from '../types'
import type { Option } from './Option'
import { None } from './None'

class Some<T> implements Option<T> {
  constructor(private value: T) {}
  and<U>(other: Option<U>): Option<U> {
    return other
  }
  andThen<U>(fn: Compute<T, Option<U>>): Option<U> {
    return fn(this.value)
  }
  expect(_: string): T {
    return this.value
  }
  filter(predicate: Predicate<T>): Option<T> {
    if (predicate(this.value)) {
      return this
    }
    return new None()
  }
  getOrInsert(_: T): T {
    return this.value
  }
  getOrInsertWith(_: Produce<T>): T {
    return this.value
  }
  isNone(): boolean {
    return false
  }
  isSome(): boolean {
    return true
  }
  map<U>(fn: Compute<T, U>): Option<U> {
    return new Some(fn(this.value))
  }
  mapOr<U>(_: U, fn: Compute<T, U>): U {
    return fn(this.value)
  }
  mapOrElse<U>(_: Produce<U>, fn: Compute<T, U>): U {
    return fn(this.value)
  }
  okOr<E>(_: E): Result<T, E> {
    return ok(this.value)
  }
  okOrElse<E>(_: Produce<E>): Result<T, E> {
    return ok(this.value)
  }
  or(this: Option<T>): Option<T> {
    return this
  }
  orElse(_: Produce<Option<T>>): Option<T> {
    return this
  }
  replace(value: T): Option<T> {
    const old = new Some(this.value)
    this.value = value
    return old
  }
  unwrap(): T {
    return this.value
  }
  unwrapOr(_: T): T {
    return this.value
  }
  unwrapOrElse(def: Produce<T>): T {
    return this.value
  }
  xor(other: Option<T>): Option<T> {
    if (other.isNone()) {
      return this
    }
    return new None()
  }
  zip<U>(other: Option<U>): Option<[T, U]> {
    if (other.isSome()) {
      return new Some([this.value, other.unwrap()])
    }
    return new None()
  }
}

export { Some }
