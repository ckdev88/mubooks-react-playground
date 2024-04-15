import { useState } from "react"
import { isUrl } from "../../Helpers"

/*
const explore = reactive({
	api: 'http://openlibrary.org/search.json',
	title: '',
	author: '',
	q: 'language:eng',
	limit: 20,
	// fields: '&fields=title,author_name,edition,key,language,ebook_access,thumbnail'
	// fields: '&fields=title,author_name,edition,thumbnail'
	fields: '&fields=*'
})
const fetchCurl = () => {
	let ret = explore.api
	ret += `?q=${explore.q}`
	if (explore.title !== '') ret += `&title=${explore.title.toLowerCase()}`
	if (explore.author !== '') ret += `&author=${explore.author}`
	if (explore.limit > 0) ret += `&limit=${explore.limit}`
	if (explore.fields !== '') ret += `&fields=${explore.fields}`
	return ret
	// https://openlibrary.org/search.json?q=language:eng&limit=10&title=Corrups&Author=Penelope&fields=title,author_name,edition,key,language,ebook_access,thumbnail
}
async function fetchBook() {
	return await fetch(fetchCurl())
		.then((res) => res.json())
		.then((data) => (foundBooks.value = data.docs))
}


for covers: https://covers.openlibrary.org/b/isbn/isbnnummerhier-S.jpg
*/


const AddBookPage = () => {
	const [coverImg, setCoverImg] = useState<string>('/img/coverless.png')
	const [searchResults, setSearchResults] = useState<SearchResults>([])
	// const [isLoading, setIsLoading] = useState<boolean>(false)
	const [searchMsg, setSearchMsg] = useState<string>('')

	async function processSearchForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const searchTitle = e.currentTarget.searchTitle.value.trim()
		if (searchTitle.length > 4) {
			setSearchMsg('')
			console.log('searching...')
			// const wacht = await fetch('https://openlibrary.org/search.json?q=language:eng&limit=8&title=' + searchTitle + '&fields=title,author_name,isbn,first_publish_year,number_of_pages_median')
			const wacht = await fetch('https://openlibrary.org/search.json?q=' + searchTitle + '&mode=everything')
			await wacht.json().then(res => { setSearchResults(res.docs); console.log(res.docs) })

			// fields: '&fields=title,author_name,edition,key,language,ebook_access,thumbnail'
			// fields: '&fields=title,author_name,edition,thumbnail'

		}
		else if (searchTitle.length === 0) setSearchMsg(searchTitle.length)
		else {
			setSearchMsg('keep typing...')
		}
	}

	// ab = abbreviation for Add Book
	function processAbForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setCoverImg(e.currentTarget.abCover.value.trim())
	}
	let showCover = (<><img src={coverImg} style={{ width: '50%' }} /></>)

	function changeCover(e: React.ChangeEvent<HTMLInputElement>) {
		let url = e.currentTarget.value
		console.log(e.currentTarget.value)
		if (!isUrl(url)) { console.log('is no url') }
		else {
			setCoverImg(e.currentTarget.value.trim())
		}
	}

	function getOlCover(isbn: [], size: string = '') {
		let appendSize: string = ''
		if (size !== '') appendSize = '-' + size
		let isbnimg: string = ''
		if (isbn.length > 0) { isbnimg = isbn.slice(-1).toString() }

		return 'https://covers.openlibrary.org/b/isbn/' + isbnimg + appendSize + '.jpg'
	}
	return (
		<>
			<div className="booksearch">
				<h1>Search book</h1>
				<form onSubmit={processSearchForm}>
					<input type="text" id='searchTitle' name='searchTitle' />
					{searchMsg}
					<button>Search</button>
				</form>
			</div>
			<div className="booksearchresults">
				{searchResults.map((res, index) => {
					if (res.isbn !== undefined) {
						let title: string
						if (res.title.length > 45) title = res.title.slice(0, 40) + '...'
						else title = res.title

						return (
							<div key={index} style={{ clear: 'both', height: '48px', display: 'flex', alignContent: 'center', marginBottom: '.5rem', marginTop: '.5rem', borderBottom: '1px dashed rgba(255,255,255,1)' }}>
								<div className="title" style={{ fontSize: '.9em', display: 'flex', alignContent: 'center', flexWrap: 'wrap', flexGrow: '3' }}>
									<img src="/img/vergrootglas.svg" style={{ height: '16px', width: '16px', alignSelf: 'center' }} />
									<div style={{ width: 'calc(100% - 24px)', alignContent: 'center', flexWrap: 'wrap', marginLeft: '8px' }}>{title} <em className="sf"> ({res.first_publish_year})</em><br />
										<em className="sf" style={{ clear: 'both' }}>{res.author_name}</em>
									</div>
								</div>
								<img src={getOlCover(res.isbn)} style={{ display: 'block', maxHeight: '48px', marginLeft: '.5rem' }} />
							</div>
						)
					}
				})}
			</div>
			<h1>Add a book</h1>
			<form onSubmit={processAbForm}>
				<fieldset>
					<label htmlFor="abIsbn">ISBN</label>
					<input type="text" id="abIsbn" name="abIsbn" required />
					<label htmlFor="abTitle">Title</label>
					<input type="text" id="abTitle" name="abTitle" required />
					<label htmlFor="abAuthors">Author(s) <em className="sf">1 author per line</em></label>
					<textarea name="abAuthors" id="abAuthors" />
					<label htmlFor="abCover">Cover URL <em className="sf">starts with https://</em></label>
					<input type="url" name="abCover" id="abCover" onChange={changeCover} />
					{showCover}<br /><br />
					<label htmlFor="abYearPublished">Year published</label>
					<input type="number" name="abYearPublished" id="abYearPublished" />
					<label htmlFor="abPages">Pages</label>
					<input type="number" name="abPages" id="abPages" />
					<label htmlFor="abTropes">Tropes <em className="sf">one trope per line</em></label>
					<textarea name="abTropes" id="abTropes"></textarea>
					<button>Add book to wishlist</button>
				</fieldset>
			</form>
		</>
	)
}
export default AddBookPage
