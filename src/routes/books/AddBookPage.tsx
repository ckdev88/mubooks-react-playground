// TODO: make this form interact with openlibrary.org to help append to their database
import { useContext, useState } from 'react'
/* 
Search is currently unavailable due to cunts that hacked archive.org	
import { isUrl, getOlCover } from '../../Helpers'
*/
import { isUrl } from '../../Helpers'
// TODO apply BookSummary-BookPages to keep uniformity ??
// import BookPages from '../../components/BookPages'
import BookSummaryTitle from '../../components/BookSummaryTitle'
// TODO apply BookSummary-Components to keep uniformity
import { AppContext } from '../../App'
import updateEntriesDb from '../../functions/updateEntriesDb'
import { cleanAnchor } from '../../helpers/cleanInput'
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

const pageTitle: string = 'Add a book'

const AddBookPage = () => {
	const { userMyBooks, setUserMyBooks, userid, setPopupNotification } = useContext(AppContext)
	const [coverImg, setCoverImg] = useState<string>('/img/coverless.png')

	/*
Search is currently unavailable due to cunts that hacked archive.org	

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
*/

	const [title, setTitle] = useState<Book['title']>('')
	const [firstPublishYear, setFirstPublishYear] = useState<Book['first_publish_year']>('')
	const [authorName, setAuthorName] = useState<Book['author_name']>(['']) // need to convert to string[]
	const bookId: Book['id'] = Math.ceil(Math.random() * 10000000).toString() // need to somehow generate uniquely, or just on save
	const [numberOfPages, setNumberOfPages] = useState<Book['number_of_pages_median']>(0)
	const [tropes, setTropes] = useState<string[]>([])

	function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
		setTitle(e.currentTarget.value)
	}
	// TODO run through cleaner method
	function changeAuthors(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const postedAuthors: string[] = e.currentTarget.value.split('\n')
		const newAuthors: string[] = []
		let tmpAuthor = ''
		for (let i = 0; i < postedAuthors.length; i++) {
			tmpAuthor = postedAuthors[i].trim()
			if (tmpAuthor.length > 0) newAuthors.push(tmpAuthor)
		}
		setAuthorName(newAuthors)
	}
	function changePages(e: React.ChangeEvent<HTMLInputElement>) {
		const num: number = Number(e.currentTarget.value)
		setNumberOfPages(num)
	}
	function changeCover(e: React.ChangeEvent<HTMLInputElement>) {
		const url = e.currentTarget.value
		if (isUrl(url)) setCoverImg(e.currentTarget.value.trim())
	}

	// TODO run through cleaner method
	function changeTropes(e: React.ChangeEvent<HTMLTextAreaElement>): void {
		const postedTropes: string[] = e.currentTarget.value.split('\n')
		const newTropes: string[] = []
		let tmptrope = ''
		for (let i = 0; i < postedTropes.length; i++) {
			tmptrope = postedTropes[i].trim()
			if (tmptrope.length > 0) newTropes.push(tmptrope)
		}
		setTropes(newTropes)
	}
	function changeFirstPublishYear(e: React.ChangeEvent<HTMLInputElement>): void {
		setFirstPublishYear(e.currentTarget.value)
	}
	// /for the preview

	// ab = abbreviation for Add Book
	async function processAbForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const tmpCoverImg=e.currentTarget.abCover.value.trim()
		if(tmpCoverImg!=='') setCoverImg(e.currentTarget.abCover.value.trim())

		const newArr = userMyBooks
		const list: Book['list'] = 1
		const rate_stars: Book['rate_stars'] = 0
		const rate_spice: Book['rate_spice'] = 0
		const title_short = title.slice(0, 55)
		// TODO: cover_redir should be more dynamic, reacting to search of openlibrary, if ever resumed
		// TODO: create image uploading to server, to replace hotlinking
		const book = {
			author_name: authorName,
			cover: coverImg,
			cover_redir: coverImg,
			first_publish_year: firstPublishYear,
			id: bookId,
			list: list,
			number_of_pages_median: numberOfPages,
			review_tropes: tropes,
			title: title,
			title_short: title_short,
			cover_edition_key: '',
			rate_stars: rate_stars,
			rate_spice: rate_spice,
		}

		newArr.push(book)
		setUserMyBooks(newArr)
		const msg = await updateEntriesDb(newArr, userid)

		const bookAnchor: string = `${cleanAnchor(title_short)}_${bookId}`
		const linkto: string = '/wishlist#' + bookAnchor
		location.href = linkto

		setPopupNotification(msg)
	}

	const showCover = (
		<>
			<img src={coverImg} className="cover shade" />
		</>
	)

	return (
		<>
			{/*
			<div className="booksearch">
				<h1>Search book</h1>
				<form onSubmit={processSearchForm}>
					<input type="text" id="search_term" name="search_term" />
					<div className={resultsMessage !== '' ? 'dblock' : 'dnone'}>{resultsMessage}</div>
					<div className={resultsWarning !== '' ? 'dblock' : 'dnone'}>{resultsWarning}</div>
					<button className="btn-lg" disabled={loading}>
						{loading ? 'Searching...' : 'Search'}
					</button>
				</form>
			</div>
			*/}
			{/*
Search is currently unavailable due to cunts that hacked archive.org	
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
			*/}
			<h1>{pageTitle}</h1>
			<form onSubmit={processAbForm}>
				<fieldset>
					{/*
					<label htmlFor="abIsbn">ISBN</label>
					<input type="text" id="abIsbn" name="abIsbn" required />
					*/}
					<label htmlFor="abTitle">Title</label>
					<input type="text" id="abTitle" name="abTitle" required onChange={changeTitle} />
					<label htmlFor="abAuthors">
						Author(s) <em className="sf">1 author per line</em>
					</label>
					<textarea name="abAuthors" id="abAuthors" onChange={changeAuthors} />
					<label htmlFor="abCover">
						Cover URL <em className="sf">starts with https://</em>
					</label>
					<input type="url" name="abCover" id="abCover" onChange={changeCover} />
					<label htmlFor="abYearPublished">Year published</label>
					<input type="number" name="abYearPublished" id="abYearPublished" onChange={changeFirstPublishYear} />{' '}
					<label htmlFor="abPages">Pages</label>
					<input type="number" name="abPages" id="abPages" onChange={changePages} />
					<label htmlFor="abTropes">
						Tropes <em className="sf">one trope per line</em>
					</label>
					<textarea name="abTropes" id="abTropes" onChange={changeTropes}></textarea>
					<button className="btn-lg">Add book to wishlist</button>
				</fieldset>
			</form>
			{/* ---------------------------------------------------------------- */}
			<h3>Preview</h3>
			<article className="book-summary preview">
				<aside className="aside">{showCover}</aside>
				<article className="main">
					<header>
						<BookSummaryTitle
							book_title_short={title}
							book_first_publish_year={firstPublishYear}
							book_author_name={authorName}
							book_id={bookId}
							currentPage="wishlist"
						/>
						{numberOfPages > 0 && <>{numberOfPages} pages</>}
					</header>
					<div className="tropes clr mb0 ml-035">
						{tropes.map((t) => {
							return <div className="trope badge">{t}</div>
						})}
					</div>
				</article>
			</article>
			{/* ---------------------------------------------------------------- */}
		</>
	)
}
export default AddBookPage
