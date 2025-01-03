import { createContext, useState } from 'react'
import BookModifyPages from './BookModifyPages'

export const IsModdingPagesContext = createContext<IsModdingPagesContextType>({} as IsModdingPagesContextType)

const BookPages = ({
	book_id,
	book_number_of_pages_median,
}: {
	book_id: Book['id']
	book_number_of_pages_median: Book['number_of_pages_median']
}) => {
	const [isModding, setIsModding] = useState<boolean>(false)
	const [numberOfPages, setNumberOfPages] = useState<number>(book_number_of_pages_median)

	return (
		<IsModdingPagesContext.Provider value={{ isModding, setIsModding, numberOfPages, setNumberOfPages }}>
			<div style={{ padding: '.25rem 0' }}>
				{isModding ? (
					<BookModifyPages book_id={book_id} book_number_of_pages_median={book_number_of_pages_median} />
				) : (
					<div className="dflex">
						{book_number_of_pages_median === 0 || !book_number_of_pages_median ? '?' : numberOfPages} pages &nbsp;
						<button className="btn-icon" onClick={() => setIsModding(!isModding)}>
							<span className="icon icon-pencil"></span>
						</button>
					</div>
				)}
			</div>
		</IsModdingPagesContext.Provider>
	)
}
export default BookPages
