import { useContext, useEffect } from 'react'
import { AppContext } from '../../App'
import { MyBooksUpdate } from '../../helpers/MyBooksHelpers'

const pageTitle = 'Clear all saved books'
const ClearMyBooks = () => {
	const { setUserMyBooks, setNavTitle } = useContext(AppContext)
	useEffect(() => {
		setNavTitle(pageTitle)
	}, [setNavTitle])

	function clearbooks() {
		// for user_metadata based MyBooks... get rid of all this when this becomes obsolete
		MyBooksUpdate([])
		setUserMyBooks([])
	}
	return (
		<>
			<button onClick={clearbooks}>Clear my books</button>
		</>
	)
}
export default ClearMyBooks
