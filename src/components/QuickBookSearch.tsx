import { useState } from 'react'
import { getOlCover } from '../Helpers'
import Heading from './ui/Heading'
// NOTE currently not used anywhere, this would be nice for cases where a search is executed on every keypress, and easily selects one of the results, which is also only useful if zoomin in on 1 result is utilized

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
const QuickBookSearch = () => {
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
				'https://openlibrary.org/search.json?q=' + search_term + '&mode=everything&limit=8&fields=' + searchfields
			)
			await wacht
				.json()
				.then((json) =>
					json.docs.filter(
						(r: Book) =>
							r.author_key !== undefined &&
							r.edition_key !== undefined &&
							r.isbn !== undefined &&
							r.cover_edition_key !== undefined
					)
				)
				.then((filtered) => {
					for (let i = 0; i < filtered.length; i++) {
						filtered[i].id = filtered[i].edition_key.slice(0, 1).toString()
						filtered[i].title_short = filtered[i].title.slice(0, 45).toString()
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

	function checkit() {
		console.log('checking,,,')
	}
	function cancelSearch() {
		// document.getElementById('search_term')?.nodeValue = ''

		console.log('lets empty the input field')
		// const search_term = e.currentTarget.search_term.value.trim()
	}
	return (
		<>
			<div className="booksearch">
				<Heading text="Quick search" sub="Click on a book to prefill the fields" />
				<form onSubmit={processSearchForm} className="single-small-form clr">
					<input type="text" id="search_term" name="search_term" />
					<button type="submit" className="btn-submit-inside-caret-right" disabled={loading}></button>
				</form>
				<button className="btn-text btn-text-cancel flex-start" onClick={cancelSearch}>
					Cancel
				</button>
			</div>

			<div className="booksearchresults">
				<div className={resultsMessage !== '' ? 'dblock sf' : 'dnone'}>
					<i>{resultsMessage}</i>
				</div>
				<div className={resultsWarning !== '' ? 'dblock sf' : 'dnone'}>
					<i>{resultsWarning}</i>
				</div>
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
							<div key={'result' + result_index} className="result" onClick={checkit}>
								<div className="wrapper">
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
		</>
	)
}
export default QuickBookSearch
