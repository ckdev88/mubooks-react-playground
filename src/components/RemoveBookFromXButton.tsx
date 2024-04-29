import { useContext } from 'react'
import { AppContext } from '../App'
import getListName from '../functions/getListName'
import { supabase } from '../../utils/supabase'

const RemoveBookFromXButton = (book: Book, targetList: BookList) => {
	const { userMyBooks, setUserMyBooks, setPopupNotification } = useContext(AppContext)

	const RemoveBookFromX = (book: Book) => {
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
					book.list = 0
					removeIndex = i
					break
				}
			}
			myBooks.splice(removeIndex, 1)
		}
		const myBooksNew: string = JSON.stringify(myBooks)
		MyBooksUpdate(myBooksNew)
		return myBooksNew
	}

	function RemoveBookFromXButtonAct() {
		const newArr: string = RemoveBookFromX(book)
		setUserMyBooks(newArr)
	}

	async function MyBooksUpdate(myBooksNew: string) {
		let msg: string
		setUserMyBooks(myBooksNew)
		await supabase.auth
			.updateUser({
				data: { MyBooks: myBooksNew },
			})
			.then(() => {
				msg = 'Removed ' + book.title_short + ' from ' + getListName(targetList)
			})
			.catch(() => {
				msg = 'Something went wrong, Mu Books are not updated.'
			})
			.finally(() => setPopupNotification(msg))
	}

	// TODO: use favorite-star instead of icon-remove on different spot
	return (
		<div className="mark">
			<button className="btn-text" onClick={RemoveBookFromXButtonAct}>
				<span className="icon icon-remove"></span>Remove from {getListName(targetList)}
			</button>
		</div>
	)
}
export default RemoveBookFromXButton
