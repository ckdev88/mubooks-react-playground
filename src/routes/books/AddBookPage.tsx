// TODO: cover_redir should be more dynamic, reacting to search of openlibrary OL
// TODO: create image uploading to server option, to replace hotlinking
// DOING: make tropes same UX as in BookSummary and TropesPage
// TODO: make this form interact with openlibrary.org to help append to their database
import { useContext, useState, useEffect } from 'react'
import { isUrl } from '../../Helpers'
// TODO apply BookSummary-BookPages to keep uniformity ??
import BookSummaryTitle from '../../components/BookSummaryTitle'
// TODO apply BookSummary-Components to keep uniformity
import { AppContext } from '../../App'
import updateEntriesDb from '../../functions/updateEntriesDb'
import { cleanAnchor, cleanInput } from '../../helpers/cleanInput'
import Heading from '../../components/ui/Heading'

const pageTitle: string = 'Add a book'

const AddBookPage = () => {
	const { userMyBooks, setUserMyBooks, userid, setPopupNotification } = useContext(AppContext)
	const [coverImg, setCoverImg] = useState<string>('')

	useEffect(() => {
		const firstField = document.getElementById('abTitle')
		if (firstField) firstField.focus()
	}, [])

	const [title, setTitle] = useState<Book['title']>('')
	const [firstPublishYear, setFirstPublishYear] = useState<Book['first_publish_year']>('')
	const bookId: Book['id'] = 'MU' + new Date().getTime().toString()
	const [numberOfPages, setNumberOfPages] = useState<Book['number_of_pages_median']>(0)
	const [selectedImage, setSelectedImage] = useState<null | File>(null)
	const [bookAuthors, setBookAuthors] = useState<string[]>([])
	const [bookAuthorsLowercase, setBookAuthorsLowercase] = useState<string[]>([])
	useEffect(() => {
		setBookAuthorsLowercase(bookAuthors.map((t) => t.toLowerCase()))
	}, [bookAuthors])
	const [bookTropes, setBookTropes] = useState<BookTropes>([])
	const [bookTropesLowercase, setBookTropesLowercase] = useState<BookTropes>([])
	useEffect(() => {
		setBookTropesLowercase(bookTropes.map((t) => t.toLowerCase()))
	}, [bookTropes])

	const [selectedImageType, setSelectedImageType] = useState<undefined | 'url' | 'upload'>(undefined)

	function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
		setTitle(e.currentTarget.value)
	}

	function changePages(e: React.ChangeEvent<HTMLInputElement>) {
		const num: number = Number(e.currentTarget.value)
		setNumberOfPages(num)
	}

	function changeCover(e: React.ChangeEvent<HTMLInputElement>) {
		const url = e.currentTarget.value
		if (isUrl(url)) setCoverImg(e.currentTarget.value.trim())
	}

	function changeFirstPublishYear(e: React.ChangeEvent<HTMLInputElement>): void {
		setFirstPublishYear(e.currentTarget.value)
	}
	// /for the preview

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
	const processAbForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// NOTE set to false when all is done if the redirect to wishlist is canceled
		setIsSubmitting(true)

		let coverImgPosted: string = coverImg.trim() // coverImg = via url

		if (selectedImage) {
			const formData = new FormData()
			formData.append('image', selectedImage)
			formData.append('userid', userid)
			formData.append('bookid', bookId)

			try {
				const response = await fetch('ProcessCover.php', {
					method: 'POST',
					body: formData,
				})
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}

				const result = await response.json()
				if (result.error) {
					console.error(result.error)
				} else {
					if (result.path !== null) {
						coverImgPosted = result.path
					} else console.error('Error uploading image: doin nothin')
				}
			} catch (error) {
				console.error('Error uploading image:', error)
			}
		}

		const newArr = userMyBooks
		const list: Book['list'] = 1
		const rate_stars: Book['rate_stars'] = 0
		const rate_spice: Book['rate_spice'] = 0
		const title_short = title.slice(0, 55)
		const book: Book = {
			author_name: bookAuthors,
			cover: coverImgPosted,
			cover_redir: coverImgPosted,
			first_publish_year: firstPublishYear,
			id: bookId,
			list: list,
			number_of_pages_median: numberOfPages,
			review_tropes: bookTropes,
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

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setSelectedImage(e.target.files[0])
		}
	}

	function resetFile() {
		setSelectedImage(null)
		setSelectedImageType(undefined)
		setCoverImg('')
		const fileImage = document.querySelector('.file')
		if (fileImage !== null && 'value' in fileImage) fileImage.value = ''
	}
	const showCover = (
		<div>
			{coverImg !== '' && <img alt="" src={coverImg} className="cover shade" />}
			{selectedImage !== null && <img alt="" src={URL.createObjectURL(selectedImage)} className="cover shade" />}
		</div>
	)

	const [authorInputValue, setAuthorInputValue] = useState<string>('')
	function addAuthor() {
		if (authorInputValue.trim()) {
			const authorToAdd: string = cleanInput(authorInputValue.trim(), true)
			if (authorToAdd !== undefined && authorToAdd.length > 1) {
				const authorIndex = bookAuthorsLowercase.indexOf(authorToAdd.toLowerCase())
				if (bookAuthorsLowercase.indexOf(authorToAdd.toLowerCase()) > -1) bookTropes.splice(authorIndex, 1)
				const newArr: string[] = [...bookAuthors, authorToAdd]
				setBookAuthors(newArr)
				setAuthorInputValue('')
			}
		}
		document.getElementById('abAuthorAdd')?.focus()
	}
	function removeAuthor(filterAuthor: string) {
		setBookAuthors(bookAuthors.filter((author) => author !== filterAuthor))
	}

	const [tropeInputValue, setTropeInputValue] = useState<string>('')
	function addTrope() {
		if (tropeInputValue.trim()) {
			const tropeToAdd: string = cleanInput(tropeInputValue.trim(), true)

			if (tropeToAdd !== undefined && tropeToAdd.length > 1) {
				const tropeIndex = bookTropesLowercase.indexOf(tropeToAdd.toLowerCase())
				if (bookTropesLowercase.indexOf(tropeToAdd.toLowerCase()) > -1) bookTropes.splice(tropeIndex, 1)
				const newArr: BookTropes = [...bookTropes, tropeToAdd]
				newArr.sort((a, b) => a.localeCompare(b))
				setBookTropes(newArr)
				setTropeInputValue('')
			}
		}
		document.getElementById('abTropeAdd')?.focus()
	}
	function removeTrope(filterTrope: string) {
		setBookTropes(bookTropes.filter((trope) => trope !== filterTrope))
	}
	const handleKeyDownAuthor = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault()
			addAuthor()
		}
	}
	const handleKeyDownTrope = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault()
			addTrope()
		}
	}

	return (
		<>
			<Heading text={pageTitle} sub="See your preview below" icon="icon-addbook.svg" />
			<form onSubmit={processAbForm}>
				<fieldset style={{ display: 'flex', flexDirection: 'column' }}>
					<label htmlFor="abTitle">
						<div className="description">Title</div>
						<input type="text" id="abTitle" name="abTitle" required onChange={changeTitle} />
					</label>
					<label htmlFor="abAuthors">
						<div className="description">
							Author(s) <em>... separate with comma (,) or hit Enter</em>
						</div>
						<div className="dflex ">
							<input
								type="text"
								id="abAuthorAdd"
								value={authorInputValue}
								onChange={(e) => setAuthorInputValue(e.target.value)}
								onKeyDown={handleKeyDownAuthor}
								placeholder="Add an author..."
							/>
							<span
								className="btn-submit-inside-caret-right wauto"
								style={{ marginTop: '.75rem' }}
								onClick={() => addAuthor()}
							></span>
						</div>
					</label>
					{bookAuthors.length > 0 && (
						<div className="mb1 mt-05">
							{bookAuthors.map((author, index) => (
								<div className="badge" key={`removeauthor${index}`}>
									{author}
									<span className="btn-x" onClick={() => removeAuthor(author)}>
										x
									</span>
								</div>
							))}
							<br />
						</div>
					)}
					<div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between', gap: '1rem' }}>
						<div>
							<label htmlFor="abYearPublished">
								<div className="description">Year published</div>
								<input
									type="number"
									name="abYearPublished"
									id="abYearPublished"
									onChange={changeFirstPublishYear}
								/>{' '}
							</label>
						</div>
						<div>
							<label htmlFor="abPages">
								<div className="description">Pages</div>
								<input type="number" name="abPages" id="abPages" onChange={changePages} />
							</label>
						</div>
					</div>
					<label htmlFor="abCover" className="dblock pb0" style={{ marginBottom: '.75rem' }}>
						<div className="description">Cover {!selectedImage && <em>... paste URL or press Choose File</em>}</div>
						{!selectedImage && (
							<>
								<input
									type="url"
									name="abCover"
									id="abCover"
									onChange={(event) => {
										changeCover(event)
										setSelectedImageType('url')
									}}
									value={coverImg ? coverImg : ''}
									placeholder="Paste the URL here, or Choose File below..."
									className={coverImg ? '' : 'mb0o'}
								/>
								{coverImg && (
									<span className="btn-text-cancel btn-text sf mt-05 mb05" onClick={resetFile}>
										cancel
									</span>
								)}
							</>
						)}
						<div>
							{selectedImageType !== 'url' && (
								<>
									<input
										type="file"
										accept="image/*"
										onChange={handleFileChange}
										name="myImage"
										className={coverImg ? '' : 'mb0o'}
									/>
								</>
							)}
							<div className="dnone">
								{selectedImage ? <>created blob: {URL.createObjectURL(selectedImage)} </> : ''}
							</div>
							{selectedImage && (
								<span className="btn-text-cancel btn-text sf mb05" onClick={resetFile}>
									cancel
								</span>
							)}
						</div>
					</label>
					<label htmlFor="abTropeAdd" className="dblock pb035">
						<div className="description">
							Tropes <em>... shown again when finished reading</em>
						</div>
						<div className="dflex">
							<input
								type="text"
								id="abTropeAdd"
								value={tropeInputValue}
								onChange={(e) => setTropeInputValue(e.target.value)}
								onKeyDown={handleKeyDownTrope}
								placeholder="Add a trope..."
							/>
							<span
								className="btn-submit-inside-caret-right wauto"
								style={{ marginTop: '.75rem' }}
								onClick={() => addTrope()}
							></span>
						</div>
					</label>
					{bookTropes.length > 0 && (
						<div className="mb1 mt-05">
							{bookTropes.map((trope, index) => (
								<div className="badge" key={`removetrope${index}`}>
									{trope}
									<span className="btn-x" onClick={() => removeTrope(trope)}>
										x
									</span>
								</div>
							))}
							<br />
						</div>
					)}
				</fieldset>
				<button className="btn-lg" type="submit" disabled={isSubmitting}>
					Add book to wishlist
				</button>
			</form>
			<div className="h3">Preview</div>
			{!title && <>No title yet...</>}
			<article className="book-summary preview">
				<aside className="aside">{showCover}</aside>
				<div className="article-main">
					<header>
						<BookSummaryTitle
							book_title_short={title}
							book_first_publish_year={firstPublishYear}
							book_author_name={bookAuthors}
							book_id={bookId}
							currentPage="wishlist"
						/>
						{numberOfPages > 0 && <>{numberOfPages} pages</>}
						<div className="tropes">
							{bookTropes.map((trope, index) => (
								<div className="trope badge" key={'trope' + index}>
									{trope}
								</div>
							))}
						</div>
					</header>
				</div>
			</article>
		</>
	)
}
export default AddBookPage
