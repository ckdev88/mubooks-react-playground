import { getBookCover } from '../Helpers'

const BookSummaryCover = ({
	book_cover = '',
	book_cover_redir = '',
	currentPage = '',
	book_id =''
}: {
	book_cover: Book['cover']
	book_cover_redir: Book['cover_redir']
	currentPage?: string
	book_id:Book['id']
}) => {
	let src: string = ''
	let alt: string = ''
	if (currentPage === 'search') {
		src = getBookCover(book_cover, 'M')
		alt = 'Search, so no redir version (yet)'
	} else {
		if(!book_cover_redir){
			//try to upgrade book to book_cover_redir

		}
		if (book_cover_redir !== '') src = book_cover_redir
		else src = getBookCover(book_cover, 'M')
	}

	if (src === '') return
	return <img src={src} alt={alt} />
}

export default BookSummaryCover
