function isUrl(url: string) {
	if (url.slice(0, 8) === 'https://') return true
	return false
}

function getOlCover(id: string, size: CoverSize = undefined) {
	let appendSize: string = ''
	if (size) appendSize = '-' + size

	if (id.slice(0, 2) === 'OL') return 'https://covers.openlibrary.org/b/olid/' + id + appendSize + '.jpg'
	return 'https://covers.openlibrary.org/b/isbn/' + id + appendSize + '.jpg'
}

function getBookCover(url: string, size: CoverSize) {
	let appendSize: string = ''
	if (size) {
		appendSize = '-' + size
		return url.replace('.jpg', appendSize + '.jpg')
	}
	return url
}

// TODO, any thing is better than any
function debounce(fn: Function, delay: number): any {
	let timerId: any // TODO, any thing is better than any
	return function (...args: any[]) {
		clearTimeout(timerId)
		timerId = setTimeout(() => {
			fn(...args)
		}, delay)
	}
}

export { isUrl, getOlCover, getBookCover, debounce }
