import { useContext, useState } from 'react'
import { AppContext } from '../App'
import useMyBooksUpdateDb from './useMyBooksUpdateDb'
import { cleanInput } from '../helpers/cleanInput'

const useChangeReview = (
	book_id: Book['id'],
	review_type: 'text' | 'quote',
	review_text: string
): [(e: React.FormEvent<HTMLFormElement>) => void, boolean, string] => {
	const { userMyBooks } = useContext(AppContext)
	const [isModded, setIsModded] = useState<boolean>(false)
	const [newReviewText, setNewReviewText] = useState<string>(review_text)
	const msg: string = 'Updated review ' + review_type
	const updateMyBooksDb = useMyBooksUpdateDb({
		myBooksNew: userMyBooks,
		book_id,
		msg,
	})

	function processForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const newvalue: string = cleanInput(e.currentTarget.review_text.value.trim(), true).toString()
		if (newvalue !== undefined) updateReviewText(newvalue)
	}

	function updateReviewText(newReviewText: string): void {
		const myBooks: Books = userMyBooks
		for (let i = 0; i < myBooks.length; i++) {
			if (myBooks[i].id === book_id) {
				if (review_type === 'text') myBooks[i].review_text = newReviewText
				else if (review_type === 'quote') myBooks[i].review_fav_quote = newReviewText
				setNewReviewText(newReviewText)
				break
			}
		}
		updateMyBooksDb()
		setIsModded(true)
	}

	return [processForm, isModded, newReviewText]
}

export default useChangeReview
