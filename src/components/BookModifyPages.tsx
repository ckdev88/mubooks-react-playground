import { useContext, useEffect } from 'react'
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
	const { isModdingPages, setIsModdingPages, setNumberOfPages } = useContext(IsModdingPagesContext)
	const [processPagesModifyForm, isModded, newNumberOfPages] = useChangePages(book_id, book_number_of_pages_median)

	useEffect(() => {
		if (isModded === true) {
			setIsModdingPages(false)
			setNumberOfPages(newNumberOfPages)
		}
		// TODO:  decrease dependencies if possible, or use useCallback, or upgrade to react19
	}, [isModded, setIsModdingPages, newNumberOfPages, setNumberOfPages])

	return (
		<span className="dflex" style={{ alignItems: 'center' }}>
			<div className="dflex" style={{ alignContent: 'center', alignItems: 'center', position: 'relative' }}>
				<form onSubmit={processPagesModifyForm} className="single-small-form wm6" style={{ marginRight: '.3rem' }}>
					<input type="number" name="pagesAmount" defaultValue={book_number_of_pages_median} />
					<BtnInsideCaret />
				</form>
			</div>
			<button className="btn-icon" onClick={() => setIsModdingPages(!isModdingPages)}>
				<span className="icon icon-pencil"></span>
			</button>
		</span>
	)
}
export default BookModifyPages
