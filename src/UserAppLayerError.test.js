import { UserAppLayerError } from './UserAppLayerError'

describe('UserAppLayerError', () => {
  it('should extend Error', () => {
    expect(UserAppLayerError.__proto__.name).toBe('Error')
  })

  it('should throw correctly', () => {
    expect(() => {
      throw new UserAppLayerError()
    }).toThrow()
  })

  it('should dispayed passing message', () => {
    expect(() => {
      throw new UserAppLayerError('foo')
    }).toThrowError('foo')
  })
})
