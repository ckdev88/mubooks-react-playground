import { useContext } from 'react'
import { IsModdingPagesContext } from './BookPages'
import BtnInsideCaret from './ui/BtnInsideCaret'
import useChangePages from '../hooks/useChangePages'

const BookModifyPages = ({
	book_id,
	book_number_of_pages_median,
}: {
	book_id: Book['id']
	book_number_of_pages_median: Book['number_of_pages_median']
}) => {
	const { isModding, setIsModding } = useContext(IsModdingPagesContext)
	const [processForm] = useChangePages(book_id)

	return (
		<span className="dflex" style={{ alignItems: 'center' }}>
			<div className="dflex" style={{ alignContent: 'center', alignItems: 'center', position: 'relative' }}>
				<form onSubmit={processForm} className="single-small-form wm6" style={{ marginRight: '.3rem' }}>
					<input type="number" name="pagesAmount" defaultValue={book_number_of_pages_median} />
					<BtnInsideCaret />
				</form>
			</div>
			<button className="btn-icon" onClick={() => setIsModding(!isModding)}>
				<span className="icon icon-pencil"></span>
			</button>
		</span>
	)
}
export default BookModifyPages
