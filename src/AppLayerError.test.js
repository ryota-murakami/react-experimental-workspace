import { AppLayerError } from './AppLayerError'

describe('AppLayerError', () => {
  it('should extend Error', () => {
    expect(AppLayerError.__proto__.name).toBe('Error')
  })

  it('should throw correctly', () => {
    expect(() => {
      throw new AppLayerError()
    }).toThrow()
  })

  it('should dispayed passing message', () => {
    expect(() => {
      throw new AppLayerError('foo')
    }).toThrowError('foo')
  })
})
