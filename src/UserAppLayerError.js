// @flow

export class UserAppLayerError extends Error {
  constructor(...args: Array<any>) {
    super(...args)
    this.name = 'UserAppLayerError'
    this.message = args[0]
    Error.captureStackTrace(this, UserAppLayerError)
  }
}
