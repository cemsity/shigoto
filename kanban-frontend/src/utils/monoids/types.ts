/**
 * Closure that computes a new value base on the given value.
 *
 * @typeParam T - The type of the given value
 * @typeParam U - The type of the computed value
 * */
export type Compute<T, U> = (value: T) => U

/**
 * Closure that returns a value.
 *
 * @typeParam T - The type of the given value
 * */
export type Produce<T> = () => T
/**
 * Closure that matches the given value for a specific condition.
 *
 * @typeParam T - The type of the given value
 * */
export type Predicate<T> = (value: T) => boolean
