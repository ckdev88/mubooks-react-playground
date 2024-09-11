import { createContext, useState } from 'react'
import BookAddPages from './BookAddPages'
import BookModifyPages from './BookModifyPages'

export const IsModdingPagesContext = createContext<IsModdingPagesContextType>({} as IsModdingPagesContextType)

const BookPages = ({
	book_id,
	book_number_of_pages_median,
	currentPage,
}: {
	book_id: Book['id']
	book_number_of_pages_median: Book['number_of_pages_median']
	currentPage: string
}) => {
	const [isModdingPages, setIsModdingPages] = useState<boolean>(false)

	return (
		<div className="pt0 mt0" style={{ display: 'flex' }}>
			<IsModdingPagesContext.Provider value={{ isModdingPages, setIsModdingPages }}>
				{isModdingPages ? (
					<div className={!book_number_of_pages_median && currentPage !== 'search' ? 'diblock' : 'dnone'}>
						<BookAddPages book_id={book_id} book_number_of_pages_median={book_number_of_pages_median} />
					</div>
				) : (
					<span className={book_number_of_pages_median > 0 ? 'diblock' : 'dnone'}>
						{book_number_of_pages_median} pages &nbsp;
					</span>
				)}
				{currentPage !== 'dashboard' && currentPage !== 'wishlist' && (
					<BookModifyPages book_id={book_id} book_number_of_pages_median={book_number_of_pages_median} />
				)}
			</IsModdingPagesContext.Provider>
		</div>
	)
}
export default BookPages
