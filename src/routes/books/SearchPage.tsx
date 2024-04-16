import { useState } from 'react'
import BooksOverviewPage from './BooksOverviewPage'
import { getOlCover } from '../../Helpers'

const SearchPage = () => {
	const [resultsMessage, setResultsMessage] = useState<string>('')
	const [resultCount, setResultCount] = useState<number>(0)
	const [searchResults, setSearchResults] = useState<Books>([])
	const [searchTerm, setSearchTerm] = useState('')

	// TODO: marker isSaved to highlight saved books in results
	// booksToAdd[count] = boeken[i]
	// booksToAdd[count].id = i
	// else if (count === 0) setResultsMessage('Loosen up your search a bit.')

	async function processSearchForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const before = performance.now()
		const search_term: string = e.currentTarget.search_term.value.trim()
		if (search_term.length > 4) {
			setResultsMessage('')
			await fetch('https://openlibrary.org/search.json?q=' + search_term + '&mode=everything&limit=30&fields=title,author_name,isbn,cover_edition_key,author_key,edition_key,first_publish_year,number_of_pages_median')
				.then(response => response.json())
				.then(json => json.docs.filter((r: Book) => r.author_key !== undefined && r.edition_key !== undefined && r.isbn !== undefined && r.cover_edition_key !== undefined))
				.then(filtered => {
					setResultCount(filtered.length)
					for (let i = 0; i < filtered.length; i++) {
						filtered[i].id = filtered[i].edition_key.slice(0, 1).toString()
						filtered[i].title_short = filtered[i].title.slice(0, 40).toString()
						if (filtered[i].isbn.length > 0) {
							filtered[i].isbn0 = filtered[i].isbn.slice(0, 1).toString()
							filtered[i].isbn1 = filtered[i].isbn.slice(-1).toString()
						} else {
							filtered[i].isbn0 = ''
							filtered[i].isbn1 = ''
						}
						console.log(filtered[i])
					filtered[i].cover =getOlCover(filtered[i].cover_edition_key) 
					filtered[i].coverS=getOlCover(filtered[i].cover_edition_key,'S')
					filtered[i].coverM=getOlCover(filtered[i].cover_edition_key,'M')
					filtered[i].coverL=getOlCover(filtered[i].cover_edition_key,'L')
					}
					(filtered.length > 30 ? setResultsMessage('Showing only 30 results. Specify a bit more.') : setResultsMessage('Showing ' + filtered.length + ' results.'))
					setSearchTerm(search_term)
					return filtered
				})
				.then(result => setSearchResults(result))
		}
		else if (search_term.length === 0) setResultsMessage(search_term)
		else setResultsMessage('keep typing...')
		console.log('search performed in:', performance.now() - before)
	}
	return (
		<>
			<h1>Search</h1>
			<p>
				Find the book you want to add. <br />
			</p>
			<form onSubmit={processSearchForm} >
				<input type="text" name="search_term" id="search_term" />
				<button>Search</button>
			</form>
			<div>
				<div className={searchTerm !== '' || resultsMessage !== '' ? 'dblock' : 'dnone'}>
					<h2 className="resultsfound">
						{resultCount > 30 ? 'Over 30' : resultCount} {resultCount > 1 || resultCount === 0 ? 'books' : 'book'} found for <em>"{searchTerm}"</em>
						<sub className={resultsMessage !== '' ? 'dblock' : 'dnone'}>
							{resultsMessage}
						</sub>
					</h2>
					<BooksOverviewPage books={searchResults} page="searchpage" />
				</div>
			</div>
		</>
	)
}
export default SearchPage
