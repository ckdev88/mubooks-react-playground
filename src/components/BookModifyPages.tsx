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
	const { isModding, setIsModding } = useContext(IsModdingPagesContext)
	const [processForm] = useChangePages(book_id)

	const placeholder: string = '0'
	const inputId = 'pages_' + book_id

	useEffect(() => {
		if (isModding) document.getElementById(inputId)?.focus()
	}, [isModding, inputId])

	return (
		<>
			<form onSubmit={processForm} className="single-small-form wm6" style={{ marginRight: '.3rem' }}>
				<input
					type="number"
					name="pagesAmount"
					id={inputId}
					defaultValue={book_number_of_pages_median}
					min="0"
					placeholder={placeholder}
				/>
				<BtnInsideCaret />
			</form>
			{isModding && (
				<>
					<button className="btn-text btn-text-cancel" onClick={() => setIsModding(false)}>
						Cancel
					</button>
				</>
			)}
		</>
	)
}
export default BookModifyPages
