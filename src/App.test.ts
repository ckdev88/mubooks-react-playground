import { render, screen } from '@testing-library/react'
import App from './App'
import { describe, expect, test } from 'bun:test'

describe('App', () => {
	test('should render app', () => {
		console.log('*****************************************************')
		render(App())
		expect(screen.getByText(/Vite \+ React/i)).toBeFalsy()
	})
})
