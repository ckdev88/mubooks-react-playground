import { useContext } from 'react'
import { AppContext } from '../../App'
import useMyBooksUpdateDb from '../../hooks/useMyBooksUpdateDb'

const newArr: [] = []
function ClearMyBooks() {
	const { setUserMyBooks } = useContext(AppContext)
	setUserMyBooks(newArr)
	const clearbooks = useMyBooksUpdateDb({
		myBooksNew: newArr,
		book_id: null,
		msg: 'Books cleared',
	})
	function clearbooksyes() {
		clearbooks()
	}

	return <button onClick={() => clearbooksyes()}>Clear my books</button>
}
export default ClearMyBooks
