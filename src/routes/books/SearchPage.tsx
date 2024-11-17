import { useEffect, useState } from 'react'
import BooksOverviewPage from './BooksOverviewPage'
import { getOlCover } from '../../Helpers'
import Heading from '../../components/ui/Heading'

const pageTitle = 'Search'
const currentPage = 'search'
const booklist = undefined

const SearchPage = () => {
	const [resultsMessage, setResultsMessage] = useState<string>('')
	const [resultCount, setResultCount] = useState<number>(0)
	const [searchResults, setSearchResults] = useState<Books>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		document.getElementById('search_term')?.focus()
	}, [])

	async function processSearchForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		// const before = performance.now()
		const search_term: string = e.currentTarget.search_term.value.trim()
		// const search_author: string = e.currentTarget.search_term.value.trim()
		if (search_term.length > 4) {
			setLoading(true)
			setResultsMessage('')
			const searchfields: string =
				'title,author_name,isbn,cover_edition_key,author_key,edition_key,key,first_publish_year,number_of_pages_median,subject'
			await fetch(
				'https://openlibrary.org/search.json?q=' + search_term + '&mode=everything&limit=30&fields=' + searchfields
			)
				.then((response) => response.json())
				.then((json) =>
					json.docs.filter(
						(r: Book) =>
							r.author_key !== undefined &&
							r.edition_key !== undefined &&
							r.key !== undefined &&
							r.cover_edition_key !== undefined
					)
				)
				.then((filtered) => {
					setResultCount(filtered.length)
					for (let i = 0; i < filtered.length; i++) {
						filtered[i].id = filtered[i].key.toString().replace('/works/', '')
						filtered[i].title_short = filtered[i].title.slice(0, 45).toString()
						filtered[i].cover = getOlCover(filtered[i].cover_edition_key)
					}
					filtered.length > 30
						? setResultsMessage('Showing only 30 results. Specify a bit more.')
						: setResultsMessage('Showing ' + filtered.length + ' results.')
					setSearchTerm(search_term)
					return filtered
				})
				.then((result) => {
					setSearchResults(result)
				})
				.catch((error) => setResultsMessage('error ' + error))
				.finally(() => setLoading(false))
		} else if (search_term.length === 0) setResultsMessage(search_term)
		else setResultsMessage('keep typing...')
		// console.log('search performed in:', performance.now() - before)
	}
	return (
		<>
			<Heading text={pageTitle} sub="Find the book you want to add" />
			<form onSubmit={processSearchForm}>
				<label htmlFor="search_term">
					<div className="description">Term or title</div>
					<input type="text" id="search_term" />
				</label>
				<button className="btn-lg" disabled={loading}>
					Search {loading && <span className="loader-dots"></span>}
				</button>
			</form>
			<div>
				<div className={searchTerm !== '' || resultsMessage !== '' ? 'dblock' : 'dnone'}>
					<div className="h2 resultsfound">
						{resultCount > 30 ? 'Over 30' : resultCount}
						{resultCount > 1 || resultCount === 0 ? ' books' : ' book'} found for <em>"{searchTerm}"</em>
						<sub className={resultsMessage !== '' ? 'dblock' : 'dnone'}>{resultsMessage}</sub>
					</div>
					<BooksOverviewPage books={searchResults} page={currentPage} booklist={booklist}/>
				</div>
			</div>
		</>
	)
}
export default SearchPage
