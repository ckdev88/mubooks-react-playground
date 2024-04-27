import { useState } from 'react'
import BooksOverviewPage from './BooksOverviewPage'
import { getOlCover } from '../../Helpers'

const SearchPage = () => {
	const [resultsMessage, setResultsMessage] = useState<string>('')
	const [resultCount, setResultCount] = useState<number>(0)
	const [searchResults, setSearchResults] = useState<Books>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [loading, setLoading] = useState(false)

	async function processSearchForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const before = performance.now()
		const search_term: string = e.currentTarget.search_term.value.trim()
		if (search_term.length > 4) {
			setLoading(true)
			setResultsMessage('')
			let searchfields: string
			searchfields =
				'title,author_name,isbn,cover_edition_key,author_key,edition_key,first_publish_year,number_of_pages_median'
			await fetch(
				'https://openlibrary.org/search.json?q=' +
					search_term +
					'&mode=everything&limit=30&fields=' +
					searchfields,
			)
				.then((response) => response.json())
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
					setResultCount(filtered.length)
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
						: setResultsMessage('Showing ' + filtered.length + ' results.')
					setSearchTerm(search_term)
					return filtered
				})
				.then((result) => setSearchResults(result))
				.catch((error) => setResultsMessage('error ' + error))
				.finally(() => setLoading(false))
		} else if (search_term.length === 0) setResultsMessage(search_term)
		else setResultsMessage('keep typing...')
		console.log('search performed in:', performance.now() - before)
	}
	return (
		<>
			<h1>
				Search
				<sub>Find the book you want to add.</sub>
			</h1>
			<form onSubmit={processSearchForm}>
				<input type="text" id="search_term" />
				<input type="submit" disabled={loading} value={loading ? 'Searching...' : 'Search'} />
			</form>
			<div>
				<div className={searchTerm !== '' || resultsMessage !== '' ? 'dblock' : 'dnone'}>
					<h2 className="resultsfound">
						{resultCount > 30 ? 'Over 30' : resultCount}{' '}
						{resultCount > 1 || resultCount === 0 ? 'books' : 'book'} found for <em>"{searchTerm}"</em>
						<sub className={resultsMessage !== '' ? 'dblock' : 'dnone'}>{resultsMessage}</sub>
					</h2>
					<BooksOverviewPage books={searchResults} page="searchpage" />
				</div>
			</div>
		</>
	)
}
export default SearchPage
