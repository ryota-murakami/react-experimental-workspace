export class AppLayerError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'AppLayerError'
    this.message = msg
    Error.captureStackTrace(this, AppLayerError)
  }
}
