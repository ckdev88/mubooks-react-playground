import { useContext } from 'react'
import { AppContext } from '../App'
import getListName from '../hooks/getListName'
import { supabase } from '../../utils/supabase'

const RemoveBookFromXButton = (book: Book, targetList: BookList) => {
	const { userMyBooks, setUserMyBooks, setPopupNotification } = useContext(AppContext)

	const RemoveBookFromX = async (book: Book) => {
		let myBooks: Books
		if (userMyBooks === undefined) myBooks = []
		else myBooks = JSON.parse(userMyBooks as string)

		if (book.list === 4) {
			for (let i = 0; i < myBooks.length; i++) {
				if (myBooks[i].id === book.id) {
					myBooks[i].list = 3
					break
				}
			}
		} else {
			let removeIndex = 0
			for (let i = 0; i < myBooks.length; i++) {
				if (myBooks[i].id === book.id) {
					removeIndex = i
					break
				}
			}
			myBooks.splice(removeIndex, 1)
		}
		MyBooksUpdate(JSON.stringify(myBooks))
	}

	async function MyBooksUpdate(myBooksNew: string) {
		let msg: string
		setUserMyBooks(myBooksNew)
		const updater = await supabase.auth.updateUser({
			data: { MyBooks: myBooksNew },
		})
		if (!updater) msg = 'Something went wrong, Mu Books are not updated.'
		else msg = 'Removed ' + book.title_short + ' from ' + getListName(targetList) + ''
		setPopupNotification(msg)
	}

	// TODO: use favorite-star instead of icon-remove on different spot
	return (
		<div className="mark">
			<button className="btn-text" onClick={() => RemoveBookFromX(book)}>
				<span className="icon icon-remove"></span>Remove from {getListName(targetList)}
			</button>
		</div>
	)
}
export default RemoveBookFromXButton
