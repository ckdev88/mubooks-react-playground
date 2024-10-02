import { useContext, useState } from 'react'
import { AppContext } from '../App'
import useMyBooksUpdateDb from './useMyBooksUpdateDb'
import { cleanInput } from '../helpers/cleanInput'

const useChangePages = (
	book_id: Book['id'],
	book_number_of_pages_median: Book['number_of_pages_median']
): [(e: React.FormEvent<HTMLFormElement>) => void, boolean, number] => {
	const { userMyBooks } = useContext(AppContext)
	const [isModded, setIsModded] = useState<boolean>(false)
	const [newNumberOfPages, setNewNumberOfPages] = useState<number>(book_number_of_pages_median)
	const msg: string = 'Updated pages amount'
	const updateMyBooksDb = useMyBooksUpdateDb({
		myBooksNew: userMyBooks,
		book_id,
		msg,
	})

	function processForm(e: React.FormEvent<HTMLFormElement>): void {
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
		updateMyBooksDb()
		setIsModded(true)
	}

	return [processForm, isModded, newNumberOfPages]
}
export default useChangePages
