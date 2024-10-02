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
			<div style={{ display: 'flex', padding: '.5rem 0' }}>
				{isModding ? (
					<BookModifyPages book_id={book_id} book_number_of_pages_median={book_number_of_pages_median} />
				) : (
					<>
						<span className="diblock">
							{book_number_of_pages_median === 0 || !book_number_of_pages_median ? '?' : numberOfPages} pages
							&nbsp;
						</span>
						<button className="diblock btn-icon" onClick={() => setIsModding(!isModding)}>
							<span className="icon icon-pencil"></span>
						</button>
					</>
				)}
			</div>
		</IsModdingPagesContext.Provider>
	)
}
export default BookPages
