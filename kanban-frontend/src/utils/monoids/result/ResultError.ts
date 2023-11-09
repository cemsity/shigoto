/**
 * A error realting to type {@link Result}
 *
 */
class ResultError extends Error {
  constructor(message: string) {
    super(message)

    this.name = 'ResultError'
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export default ResultError
