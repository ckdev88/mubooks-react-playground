import { beforeEach, describe, it, expect, afterEach } from 'bun:test'
import { setupCounter } from './counter'

beforeEach(() => console.log('------------------------'))

describe('doing it...', () => {
	it('loud....', () => {
		expect(true).toBe(true)
		// expect((
	})
})

describe('setupCounter', () => {
	let buttonElement: HTMLButtonElement

	beforeEach(() => {
		document.body.innerHTML = '<button id="test-button"></button>'
		buttonElement = document.getElementById('test-button') as HTMLButtonElement
		setupCounter(buttonElement)
	})

	it('init count 0', () => {
		// initially button should display 0
		expect(buttonElement.innerHTML).toBe('count is 0')
	})

	// it('increments counter on click', () => {
	// 	buttonElement.click()
	// 	expect(buttonElement.innerHTML).toBe('count is 1')
	// })

	// it('increments on multiple clicks', () => {
	// 	buttonElement.click()
	// 	buttonElement.click()
	// 	expect(buttonElement.innerHTML).toBe('count is 2')
	// 	// buttonElement.click()
	// })
	// it('increments again on multiple clicks', () => {
	// 	buttonElement.click()
	// 	buttonElement.click()
	// 	console.log(
	// 		buttonElement.innerHTML
	// 	)
	// 	expect(buttonElement.innerHTML).not.toBe('count is 3')
	// })
})
afterEach(() => console.log('========================'))
