
addEventListener('keydown', (keyboardEvent: KeyboardEvent) => {
	if (keyboardEvent.ctrlKey && keyboardEvent.key === 'k') {
		keyboardEvent.preventDefault()
		if (location.pathname !== '/mubooks') location.pathname = '/mubooks'
		if (location.hash.split('/').pop() !== 'search') location.hash = '#/search'
	}
	if (keyboardEvent.key === 'j') window.scrollBy(0, 64)
	else if (keyboardEvent.key === 'k') window.scrollBy(0, -64)
	else if (keyboardEvent.key === '/') {
		keyboardEvent.preventDefault()
		// TODO: remove setting harry potter when done testing
		document.getElementById('search_term')?.setAttribute('value', 'harry potter')
		document.getElementById('search_term')?.focus()
	}
})
