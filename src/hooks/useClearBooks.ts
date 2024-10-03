import { useContext } from 'react'
import { MyBooksUpdate } from '../helpers/MyBooksHelpers'
import { AppContext } from '../App'

const useClearBooks = (): [() => void] => {
	const { setUserMyBooks } = useContext(AppContext)
	const clearnow = async (): Promise<void> => {
		await MyBooksUpdate([]).then(() => setUserMyBooks([]))
	}

	return [clearnow]
}
export default useClearBooks
