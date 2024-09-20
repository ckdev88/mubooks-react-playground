import { useContext, useState } from 'react'
import { AppContext } from '../App'
import { supabase } from '../../utils/supabase'
import { cleanInput } from '../helpers/cleanInput'

const useChangePages = (
	book_id: Book['id'],
	book_number_of_pages_median: Book['number_of_pages_median']
): [(e: React.FormEvent<HTMLFormElement>) => void, boolean, number] => {
	const { setPopupNotification, userMyBooks, userid } = useContext(AppContext)
	const [isModded, setIsModded] = useState<boolean>(false)
	const [newNumberOfPages, setNewNumberOfPages] = useState<number>(book_number_of_pages_median)

	async function MyBooksUpdate(myBooksNew: Books) {
		let msg: string
		const { error } = await supabase
			.from('user_entries')
			.update({ json: myBooksNew, testdata: `Updated from BookModifyPages to ${book_id}` })
			.eq('user_id', userid)
			.select('*')
		if (error) msg = error.message
		else msg = 'Updates pages amount'
		setPopupNotification(msg)
	}

	function processPagesModifyForm(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault()
		const newvalue: number = Number(cleanInput(e.currentTarget.pagesAmount.value))
		if (newvalue !== undefined && newvalue > -1) changePages(newvalue)
	}

	function changePages(numberPages: number): void {
		const myBooks: Books = userMyBooks
		for (let i = 0; i < myBooks.length; i++) {
			if (myBooks[i].id === book_id) {
				myBooks[i].number_of_pages_median = numberPages
				setNewNumberOfPages(numberPages)
				break
			}
		}
		MyBooksUpdate(myBooks)
		setIsModded(true)
	}

	return [processPagesModifyForm, isModded, newNumberOfPages]
}
export default useChangePages
