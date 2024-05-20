import { useContext } from "react"
import { AppContext } from "../../App"
import { MyBooksUpdate } from "../../helpers/MyBooksHelpers"

const ClearMyBooks = () => {
	const { setUserMyBooks } = useContext(AppContext)
	function clearbooks() { // for user_metadata based MyBooks... get rid of all this when this becomes obsolete
		MyBooksUpdate('[]')
		setUserMyBooks([])
	}
	return (
		<>
			<button onClick={clearbooks}>Clear my books</button>
		</>
	)
}
export default ClearMyBooks
