import { useRef, useState } from 'react'
import bookData from '../../../data/books.json'
import BooksOverviewPage from './BooksOverviewPage'

const SearchPage = () => {
	const boeken: any = bookData as any
	const searchForm = useRef(null)

	const [resultsWarning, setResultsWarning] = useState<string>('')
	const [resultsMessage, setResultsMessage] = useState<string>('')
	const [resultCount, setResultCount] = useState<number>(0)
	const [results, setResults] = useState<Books>([])
	const [searchTerm, setSearchTerm] = useState('')

	function refreshResults(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const searchTermInput: string | undefined = event.currentTarget.search_term.value.trim()

		if (searchTermInput !== undefined) {
			if (searchTermInput.length < 4) {
				setResultsWarning('keep typing...')
				return
			} else {
				setSearchTerm(searchTermInput)
				setResultsWarning('')
			}
		}
		if (searchTermInput) getResults(searchTermInput)
	}

	// const totalBooks = boeken.reduce((a, obj) => a + Object.keys(obj).length, 0)
	// console.log('totalbooks:', totalBooks) // 934.236
	// console.log('length:', boeken.length) // 155.706 - lijkt overeen te komen met for-loop
	// TODO: run proper test for above

	function getResults(searchTermInput: string) {
		let count = 0
		let booksToAdd: any = [] // the only any... TODO: lets not have any any
		for (let i = 0; i < boeken.length; i++) {
			if (searchTermInput.toLowerCase() === boeken[i].ti.toLowerCase()) {
				// TODO: marker isSaved to highlight saved books in results
				booksToAdd[count] = boeken[i]
				booksToAdd[count].id = i

				if (boeken[i].ti.length > 40) {
					booksToAdd[i].title_short = boeken[i].ti.slice(0, 40)
					booksToAdd[count].title_short += '...'
				} else booksToAdd[count].title_short = boeken[i].ti
				if (boeken[i].img !== null) booksToAdd[count].cover = 'https://images.isbndb.com/covers' + boeken[i].img + '.jpg'

				count++
			}
		}

		// search loop less exact match
		for (let i = 0; i < boeken.length; i++) {
			if (count > 30) break
			if (
				boeken[i].ti.toLowerCase().includes(String(searchTermInput)) &&
				boeken[i].ti.toLowerCase() !== searchTermInput.toLowerCase()
			) {
				// TODO: search could use some algorithmic tweaking
				// TODO: marker isSaved to highlight saved books in results
				booksToAdd[count] = boeken[i]
				booksToAdd[count].id = i
				if (boeken[i].ti.length > 40) {
					booksToAdd[count].title_short = boeken[i].ti.slice(0, 40)
					booksToAdd[count].title_short += '...'
				} else booksToAdd[count].title_short = boeken[i].ti
				if (boeken[i].img !== null) booksToAdd[count].cover = 'https://images.isbndb.com/covers' + boeken[i].img + '.jpg'

				count++
			}
		}
		if (count > 30) setResultsMessage('Showing only 30 results. Specify a bit more.')
		else if (count === 0) setResultsMessage('Loosen up your search a bit.')
		else setResultsMessage('')

		setResults(booksToAdd)
		setResultCount(count)
	}

	return (
		<>
			<h1>Search</h1>
			<p>
				Find the book you want to add by title. <br />
				At this moment only books released after 2019 are available.
			</p>
			<form onSubmit={refreshResults} ref={searchForm}>
				<input type="text" name="search_term" id="search_term" />
				<button>Search</button>
			</form>
			<div>
				<div className={resultsWarning !== '' ? 'dblock' : 'dnone'}>{resultsWarning}</div>
				<div className={searchTerm !== '' || resultsMessage !== '' ? 'dblock' : 'dnone'}>
					<h2 className="resultsfound">
						{resultCount > 30 ? 'Over 30' : resultCount} {resultCount > 1 || resultCount === 0 ? 'books' : 'book'} found for <em>"{searchTerm}"</em>
						<sub className={resultsMessage !== '' ? 'dblock' : 'dnone'}>
							{resultsMessage}
						</sub>
					</h2>
					<BooksOverviewPage books={results} page="searchpage" />
				</div>
			</div>
		</>
	)
}
export default SearchPage
