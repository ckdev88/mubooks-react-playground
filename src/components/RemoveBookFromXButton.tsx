import { useContext } from 'react'
import { AppContext } from '../App'
import getListName from '../functions/getListName'
import { supabase } from '../../utils/supabase'

const RemoveBookFromXButton = ({
	book_id,
	book_list,
	book_title_short,
	targetList,
	icon = false,
}: {
	book_id: Book['id']
	book_list: Book['list']
	book_title_short: Book['title_short']
	targetList: BookList
	icon: boolean
}) => {
	const { userid, userMyBooks, setUserMyBooks, setPopupNotification } = useContext(AppContext)

	function RemoveBookFromX(book_id: Book['id']) {
		let myBooks: Books
		if (userMyBooks === undefined) myBooks = []
		else myBooks = userMyBooks

		if (book_list === 4) {
			for (let i = 0; i < myBooks.length; i++) {
				if (myBooks[i].id === book_id) {
					myBooks[i].list = 3
					break
				}
			}
		} else if (book_list === 3) {
			for (let i = 0; i < myBooks.length; i++) {
				if (myBooks[i].id === book_id) {
					myBooks[i].list = 2
					myBooks[i].date_finished = undefined
					break
				}
			}
		} else {
			let removeIndex = 0
			for (let i = 0; i < myBooks.length; i++) {
				if (myBooks[i].id === book_id) {
					book_list = 0
					removeIndex = i
					break
				}
			}
			myBooks.splice(removeIndex, 1)
		}
		const myBooksNew: Books = myBooks
		MyBooksUpdate(myBooksNew)
		return myBooksNew
	}

	function RemoveBookFromXButtonAct() {
		const newArr: Books = RemoveBookFromX(book_id)
		setUserMyBooks(newArr)
	}

	// TODO: move this function to generic helper location
	async function MyBooksUpdate(myBooksNew: Books) {
		let msg: string
		setUserMyBooks(myBooksNew)
		const { error } = await supabase
			.from('user_entries')
			.update({ json: myBooksNew, testdata: 'updated from RemoveBookFromXButton' })
			.eq('user_id', userid)
			.select('*')
		if (error) msg = error.message
		else msg = 'Removed ' + book_title_short + ' from ' + getListName(targetList)

		setPopupNotification(msg)
	}

	// TODO: use favorite-star instead of icon-remove on different spot
	if (icon && targetList === 4) return <span className="icon-heart active" onClick={RemoveBookFromXButtonAct}></span>

	return (
		<div className="mark">
			<button className="btn-text" onClick={RemoveBookFromXButtonAct}>
				<span className="icon icon-remove"></span>Remove from {getListName(targetList)}
			</button>
		</div>
	)
}
export default RemoveBookFromXButton
