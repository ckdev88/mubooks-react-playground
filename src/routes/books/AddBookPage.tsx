// TODO: make this form interact with openlibrary.org to help append to their database
import { useContext, useState } from 'react'
import { isUrl } from '../../Helpers'
// TODO apply BookSummary-BookPages to keep uniformity ??
// import BookPages from '../../components/BookPages'
import BookSummaryTitle from '../../components/BookSummaryTitle'
// TODO apply BookSummary-Components to keep uniformity
import { AppContext } from '../../App'
import updateEntriesDb from '../../functions/updateEntriesDb'
import { cleanAnchor } from '../../helpers/cleanInput'

const pageTitle: string = 'Add a book'

const AddBookPage = () => {
	const { userMyBooks, setUserMyBooks, userid, setPopupNotification } = useContext(AppContext)
	const [coverImg, setCoverImg] = useState<string>('')

	// for the preview
	// 	const synopsis = 'nothing for now'
	// 	const [isShowingSynopsis, setIsShowingSynopsis] = useState<boolean>(false)

	const [title, setTitle] = useState<Book['title']>('')
	const [firstPublishYear, setFirstPublishYear] = useState<Book['first_publish_year']>('')
	const [authorName, setAuthorName] = useState<Book['author_name']>(['']) // TODO need to convert to string[]
	const bookId: Book['id'] = Math.ceil(Math.random() * 10000000).toString() // TODO need to somehow generate uniquely, or just on save .... TODO 2: see how useful this actually is, timestamp is better and if it's better with connected to uploaded cover id/filename
	const [numberOfPages, setNumberOfPages] = useState<Book['number_of_pages_median']>(0)
	const [tropes, setTropes] = useState<string[]>([])
	const [selectedImage, setSelectedImage] = useState<null | File>(null)

	// const [imagePath, setImagePath] = useState<string | null>(null) // TODO use or remove 1/2

	const [selectedImageType, setSelectedImageType] = useState<undefined | 'url' | 'upload'>(undefined)

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

	const processAbForm = async (e: React.FormEvent<HTMLFormElement>) => {
		// TODO: create possibility to upload the cover to the server
		e.preventDefault()

		let coverImgPosted: string = coverImg.trim() // coverImg = via url

		if (selectedImage) {
			const formData = new FormData()
			formData.append('image', selectedImage)
			formData.append('userid', userid)

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
					// setImagePath(result.path) // TODO use or remove 2/2
					if (result.path !== null) {
						coverImgPosted = result.path // TODO improve efficiency & relation to imagePath state
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
		// TODO: cover_redir should be more dynamic, reacting to search of openlibrary OL
		// TODO: create image uploading to server, to replace hotlinking
		const book = {
			author_name: authorName,
			cover: coverImgPosted,
			cover_redir: coverImgPosted,
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

	return (
		<>
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
					<div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}>
						<div>
							<label htmlFor="abYearPublished">Year published</label>
							<input type="number" name="abYearPublished" id="abYearPublished" onChange={changeFirstPublishYear} />{' '}
						</div>
						<div>
							<label htmlFor="abPages">Pages</label>
							<input type="number" name="abPages" id="abPages" onChange={changePages} />
						</div>
					</div>
					<label htmlFor="abTropes">
						Tropes <em className="sf">one trope per line</em>
					</label>
					<textarea name="abTropes" id="abTropes" onChange={changeTropes}></textarea>
					<label htmlFor="abCover">
						<div>Cover</div>
						{!selectedImage && <em className="sf">Paste URL or press Choose File</em>}
					</label>
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
							<input type="file" accept="image/*" onChange={handleFileChange} name="myImage" className="file" />
						)}
						<div className="dnone">{selectedImage ? <>created blob: {URL.createObjectURL(selectedImage)} </> : ''}</div>
						{selectedImage && (
							<span className="btn-text-cancel btn-text sf mb05" onClick={resetFile}>
								cancel
							</span>
						)}
					</div>
				</fieldset>
				<hr />
				<br />
				<button className="btn-lg" type="submit">
					Add book to wishlist
				</button>
			</form>

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
						{tropes.map((t, index) => {
							return (
								<div className="trope badge" key={`trope${index}`}>
									{t}
								</div>
							)
						})}
					</div>
				</article>
			</article>
		</>
	)
}
export default AddBookPage
