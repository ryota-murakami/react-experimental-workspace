import { UUID } from './functions'

describe('UUID', () => {
  test('should generate random 9 length by base62', () => {
    const results: string[] = []

    for (let i = 0; i <= 1000; i++) {
      const uuid: string = UUID()
      results.push(uuid)
    }

    results.forEach((uuid) =>
      expect(uuid).toMatch(
        /^_[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789]{9}$/
      )
    )
  })
})
