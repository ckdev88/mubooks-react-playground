import { getBookCover } from '../Helpers'

const BookSummaryCover = ({
	book_cover = '',
	book_cover_redir = '',
}: {
	book_cover: Book['cover']
	book_cover_redir: Book['cover_redir']
}) => {
	// TODO turn images back on
	const showImages = false
	if (!showImages) {
		const bookCover = getBookCover('','M')
		return <img src={bookCover} alt="" className="cover shade" />
	}

	let bookCover: string
	if (book_cover_redir !== undefined && book_cover_redir !== '') bookCover = book_cover_redir
	else bookCover = getBookCover(book_cover, 'M')

	return <img src={bookCover} alt="" className="cover shade" />
}

export default BookSummaryCover
