// @flow

export class AppLayerError extends Error {
  constructor(...args: Array<any>) {
    super(...args)
    this.name = 'AppLayerError'
    this.message = args[0]
    Error.captureStackTrace(this, AppLayerError)
  }
}
