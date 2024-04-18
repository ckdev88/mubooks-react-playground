import { useContext } from "react"
import { AppContext } from "../../App"
import { MyBooksUpdate } from "../../helpers/MyBooksHelpers"

const ClearMyBooks = () => {
	const { setUserMyBooks } = useContext(AppContext)
	function clearbooks() {
		MyBooksUpdate('[]')
		setUserMyBooks('[]')
	}
	return (
		<>
			<button onClick={clearbooks}>Clear my books</button>
		</>
	)
}
export default ClearMyBooks
