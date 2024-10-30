function isUrl(url: string) {
	if (url.slice(0, 8) === 'https://') return true
	return false
}

function getOlCover(id: string, size: CoverSize = undefined): string {
	let appendSize: string = ''
	if (size) appendSize = '-' + size

	if (id.slice(0, 2) === 'OL') return 'https://covers.openlibrary.org/b/olid/' + id + appendSize + '.jpg'
	return 'https://covers.openlibrary.org/b/isbn/' + id + appendSize + '.jpg'
}

function getBookCover(url: string = '', size: CoverSize): string {
	// NOTE set showOLImages to false when archive/OpenLibrary is unavailable
	const showOLImages = true

	if ((url.includes('openlibrary') && !showOLImages) || url === '') {
		return './../img/save-books-icon.png'
	}

	let appendSize: string = ''
	if (size) {
		appendSize = '-' + size
		return url.replace('.jpg', appendSize + '.jpg')
	}
	return url
}

async function getOlPagesMedian(id: string): Promise<number> {
	const ret = await fetch(
		'https://openlibrary.org/search.json?q=/works/' +
			id +
			'&mode=number_of_pages_median&fields=number_of_pages_median&limit=1'
	)
		.then((res) => res.json())
		.then((json) => json.docs[0].number_of_pages_median)
	return ret
}

const debounce = <T extends unknown[]>(callback: (...args: T) => void, delay: number) => {
	let timeoutTimer: ReturnType<typeof setTimeout>

	return (...args: T) => {
		clearTimeout(timeoutTimer)

		timeoutTimer = setTimeout(() => {
			callback(...args)
		}, delay)
	}
}

function openCalendarPopUp(dateFieldId: string): void {
	const dateElement = document.getElementById(dateFieldId) as HTMLInputElement
	try {
		dateElement.showPicker()
	} catch (e) {
		dateElement.classList.remove('calendar-hidden')
		dateElement.focus()
		console.error(e)
	}
}

function shuffleArray(array: []) {
	let currentIndex = array.length
	while (currentIndex > 0) {
		const randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--
		;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
	}
}

function getUrlParamVal(url: string, key: string, hash: boolean = false): string {
	let urlArr: string[]
	if (hash) urlArr = url.split(/['#','?','&']/)
	else urlArr = url.split(/['?','&']/)
	for (let i = 0; i < urlArr.length; i++) {
		if (urlArr[i].slice(0, key.length) === key) return urlArr[i].split('=')[1]
	}
	return ''
}

export { isUrl, getOlCover, getBookCover, debounce, openCalendarPopUp, shuffleArray, getUrlParamVal, getOlPagesMedian }
