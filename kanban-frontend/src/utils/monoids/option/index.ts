import { None } from './None'
import { Some } from './Some'
import type { Option } from './Option'

export const maybe = <T>(value: T): Option<T> => {
  if (value === null || value === undefined) {
    return none()
  }
  return some(value)
}

export const some = <T>(value: T) => new Some(value)

export const none = <T>() => new None<T>()

export type { Option } from './Option'
