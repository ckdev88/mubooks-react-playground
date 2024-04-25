addEventListener('keydown', (keyboardEvent: KeyboardEvent) => {
	if (keyboardEvent.key === 'j') window.scrollBy(0, 64)
	else if (keyboardEvent.key === 'k') window.scrollBy(0, -64)
})
