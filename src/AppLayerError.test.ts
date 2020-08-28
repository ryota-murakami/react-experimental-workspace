import { AppLayerError } from './AppLayerError'

describe('AppLayerError', () => {
  it('should extend Error', () => {
    // @ts-ignore why happen error about __proto__
    expect(AppLayerError.__proto__.name).toBe('Error')
  })

  it('should throw correctly', () => {
    expect(() => {
      throw new AppLayerError('ooooooo')
    }).toThrow()
  })

  it('should dispayed passing message', () => {
    expect(() => {
      throw new AppLayerError('foo')
    }).toThrowError('foo')
  })
})
