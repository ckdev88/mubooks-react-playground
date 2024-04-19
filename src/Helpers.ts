function isUrl(url: string) {
	if (url.slice(0, 8) === 'https://') return true
	return false
}

function getOlCover(id: string, size: string = '') {
	let appendSize: string = ''
	if (size !== '') appendSize = '-' + size

	if (id.slice(0, 2) === 'OL')
		return 'https://covers.openlibrary.org/b/olid/' + id + appendSize + '.jpg'
	return 'https://covers.openlibrary.org/b/isbn/' + id + appendSize + '.jpg'
}

export { isUrl, getOlCover }
