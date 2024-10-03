import { useContext, useState } from 'react'
import { AppContext } from '../App'
import useMyBooksUpdateDb from './useMyBooksUpdateDb'
import { cleanInput } from '../helpers/cleanInput'

const useChangeReview = (
	book_id: Book['id'],
	o_key: 'review_text' | 'review_fav_quote',
	review_text: Book['review_text']
): [(e: React.FormEvent<HTMLFormElement>) => void, boolean, Book['review_text']] => {
	const { userMyBooks } = useContext(AppContext)
	const [isModded, setIsModded] = useState<boolean>(false)
	const [newVal, setNewVal] = useState<Book['review_text']>(review_text)
	const msg: string = 'Updated review'
	const updateMyBooksDb = useMyBooksUpdateDb({
		myBooksNew: userMyBooks,
		book_id,
		msg,
	})

	function processForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const newval: string = cleanInput(e.currentTarget.review_text.value.trim(), true)
		if (newval !== undefined) updateReviewText(newval)
	}

	function updateReviewText(newvalue: Book['review_text']): void {
		for (let i = 0; i < userMyBooks.length; i++) {
			if (userMyBooks[i].id === book_id) {
				if (o_key === 'review_text') userMyBooks[i].review_text = newvalue
				else if (o_key === 'review_fav_quote') userMyBooks[i].review_fav_quote = newvalue
				setNewVal(newvalue)
				break
			}
		}
		updateMyBooksDb()
		setIsModded(true)
	}
	return [processForm, isModded, newVal]
}

export default useChangeReview
