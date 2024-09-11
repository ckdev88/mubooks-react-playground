import BookAuthorList from './BookAuthorList'
const BookSummaryTitle = ({
	book_title_short,
	book_first_publish_year,
	currentPage,
	book_author_name,
	book_id,
}: {
	book_title_short: Book['title_short']
	book_first_publish_year: Book['first_publish_year']
	currentPage: string
	book_author_name: Book['author_name']
	book_id: Book['id']
}) => {
	return (
		<h2>
			{book_title_short}{' '}
			{book_first_publish_year && currentPage === 'search' && <sup>({book_first_publish_year})</sup>}
			<sub>
				<BookAuthorList book_id={book_id} book_author_name={book_author_name} />
			</sub>
		</h2>
	)
}
export default BookSummaryTitle
