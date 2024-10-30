import { getBookCover } from '../Helpers'

const BookSummaryCover = ({
	book_cover = '',
	book_cover_redir = '',
}: {
	book_cover: Book['cover']
	book_cover_redir: Book['cover_redir']
}) => {
	let bookCover: string

	if (book_cover_redir !== undefined && book_cover_redir !== '') {
		bookCover = book_cover_redir
	} else {
		bookCover = getBookCover(book_cover, 'M')
	}

	// NOTE set showOLImages to false when archive/OpenLibrary is unavailable
	const showOLImages = true
	if (!showOLImages && book_cover_redir.includes('openlibrary')) bookCover = getBookCover('', 'M')

	return <img src={bookCover} alt="" className="cover shade" />
}

export default BookSummaryCover
