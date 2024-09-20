import { getBookCover } from '../Helpers'

const BookSummaryCover = ({
	book_cover = '',
	book_cover_redir = '',
	book_id = '',
}: {
	book_cover: Book['cover']
	book_cover_redir: Book['cover_redir']
	book_id: Book['id']
}) => {
	let bookCover: string
	if (book_cover_redir !== undefined && book_cover_redir !== '') bookCover = book_cover_redir
	else bookCover = getBookCover(book_cover, 'M')

	const alt = ''
	return <img src={bookCover} alt={`${alt} ${book_id}`} />
}

export default BookSummaryCover
