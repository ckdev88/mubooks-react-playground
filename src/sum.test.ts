import { describe, it, expect } from 'bun:test'
// import { sum, sumReduced } from './sum'
import { sum } from './sum'

describe('simple sum tests', () => {
	it('should be easy...', () => {
		expect(2 + 2).toBe(4)
		expect(sum(4, 4)).toBe(8)
		expect(sum(4, 1)).not.toBe(3)
	})

	// it('also using reducers', () => {
	// 	expect(sumReduced(4, 4, 4, 4)).toBe(16)
	// 	expect(sumReduced(4, 4, 4, 5)).not.toBe(16)
	// })
})
