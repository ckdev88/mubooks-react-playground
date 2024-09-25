import { useContext } from 'react'
import { MyBooksUpdate } from '../helpers/MyBooksHelpers'
import { AppContext } from '../App'

const useClearBooks = (): [() => void] => {
	const { setUserMyBooks } = useContext(AppContext)
	const clearnow = async (): Promise<void> => {
		await MyBooksUpdate([])
			.then(() => setUserMyBooks([]))
			.finally(() => console.log('cleared'))
		// setUserMyBooks([])
		// console.log('clear!')
	}

	return [clearnow]
}
export default useClearBooks
