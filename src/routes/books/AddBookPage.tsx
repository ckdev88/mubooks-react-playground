import { useState } from 'react'
import { isUrl, getOlCover } from '../../Helpers'

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
}
async function fetchBook() {
	return await fetch(fetchCurl())
		.then((res) => res.json())
		.then((data) => (foundBooks.value = data.docs))
}
*/

const AddBookPage = () => {
	const [coverImg, setCoverImg] = useState<string>('/img/coverless.png')
	const [searchResults, setSearchResults] = useState<Books>([])
	const [resultsWarning, setResultsWarning] = useState<string>('')
	const [resultsMessage, setResultsMessage] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	async function processSearchForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const search_term = e.currentTarget.search_term.value.trim()
		if (search_term.length > 4) {
			setLoading(true)
			setResultsWarning('')
			const searchfields: string =
				'title,author_name,isbn,cover_edition_key,author_key,edition_key,key,first_publish_year,number_of_pages_median'
			const wacht = await fetch(
				'https://openlibrary.org/search.json?q=' +
					search_term +
					'&mode=everything&limit=8&fields=' +
					searchfields,
			)
			await wacht
				.json()
				.then((json) =>
					json.docs.filter(
						(r: Book) =>
							r.author_key !== undefined &&
							r.edition_key !== undefined &&
							r.isbn !== undefined &&
							r.cover_edition_key !== undefined,
					),
				)
				.then((filtered) => {
					for (let i = 0; i < filtered.length; i++) {
						filtered[i].id = filtered[i].edition_key.slice(0, 1).toString()
						filtered[i].title_short = filtered[i].title.slice(0, 45).toString()
						if (filtered[i].isbn.length > 0) {
							filtered[i].isbn0 = filtered[i].isbn.slice(0, 1).toString()
							filtered[i].isbn1 = filtered[i].isbn.slice(-1).toString()
						} else {
							filtered[i].isbn0 = ''
							filtered[i].isbn1 = ''
						}
						filtered[i].cover = getOlCover(filtered[i].cover_edition_key)
					}
					filtered.length > 30
						? setResultsMessage('Showing only 30 results. Specify a bit more.')
						: setResultsMessage('Showing ' + filtered.length + ' results for ' + search_term + '.')
					return filtered
				})
				.then((result) => setSearchResults(result))
			setLoading(false)
		} else if (search_term.length === 0) setResultsWarning(search_term.length)
		else setResultsWarning('keep typing...')
	}

	// ab = abbreviation for Add Book
	function processAbForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setCoverImg(e.currentTarget.abCover.value.trim())
	}
	const showCover = (
		<>
			<img src={coverImg} style={{ width: '50%' }} />
		</>
	)

	function changeCover(e: React.ChangeEvent<HTMLInputElement>) {
		const url = e.currentTarget.value
		if (isUrl(url)) setCoverImg(e.currentTarget.value.trim())
	}

	return (
		<>
			<div className="booksearch">
				<h1>Search book</h1>
				<form onSubmit={processSearchForm}>
					<input type="text" id="search_term" name="search_term" />
					<div className={resultsMessage !== '' ? 'dblock' : 'dnone'}>{resultsMessage}</div>
					<div className={resultsWarning !== '' ? 'dblock' : 'dnone'}>{resultsWarning}</div>
					<button disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
				</form>
			</div>
			<div className="booksearchresults">
				{searchResults.map((res, result_index) => {
					if (res.id !== undefined) {
						let title: string
						if (res.title.length > 55) title = res.title.slice(0, 55) + '...'
						else title = res.title
						const authors = res.author_name.map((author, author_index) => {
							return (
								<span key={'author' + result_index + author_index}>
									{author}
									{author_index < res.author_name.length - 1 && ', '}
								</span>
							)
						})

						return (
							<div key={'result' + result_index} className="result">
								<div className="wrapper">
									<img src="img/loep.svg" className="loep" />
									<div className="text">
										{title} <em className="sf"> ({res.first_publish_year})</em>
										<br />
										<em className="sf cl">{authors}</em>
									</div>
								</div>
								<img src={getOlCover(res.id, 'S')} className="thumbnail" />
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
					<label htmlFor="abAuthors">
						Author(s) <em className="sf">1 author per line</em>
					</label>
					<textarea name="abAuthors" id="abAuthors" />
					<label htmlFor="abCover">
						Cover URL <em className="sf">starts with https://</em>
					</label>
					<input type="url" name="abCover" id="abCover" onChange={changeCover} />
					{showCover}
					<br />
					<br />
					<label htmlFor="abYearPublished">Year published</label>
					<input type="number" name="abYearPublished" id="abYearPublished" />
					<label htmlFor="abPages">Pages</label>
					<input type="number" name="abPages" id="abPages" />
					<label htmlFor="abTropes">
						Tropes <em className="sf">one trope per line</em>
					</label>
					<textarea name="abTropes" id="abTropes"></textarea>
					<button>Add book to wishlist</button>
				</fieldset>
			</form>
		</>
	)
}
export default AddBookPage
