import { useContext } from 'react'
import { AppContext } from '../../App'
import updateEntriesDb from '../../functions/updateEntriesDb'

const newArr: [] = []
function ClearMyBooks() {
	const { userid, setUserMyBooks, userMyBooks } = useContext(AppContext)
	async function clearbooksyes() {
		setUserMyBooks(newArr)
		const msg = await updateEntriesDb(newArr, userid)
		console.log(`${msg} :, ${userMyBooks}`)
	}

	return <button onClick={() => clearbooksyes()}>Clear my books</button>
}
export default ClearMyBooks
