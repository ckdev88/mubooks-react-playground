import UpdateMyBooks from '../stores/UpdateMyBooks'
import { useContext } from 'react'
import { AppContext } from '../App'

// TODO: this could just be a toggle with addtoreading... its basically the same code
// TODO: should also be a button, which is actually more important: done reading
const FinishReading = (id: number) => {
	let myBooks: Books
	if (localStorage.getItem('MyBooks') === 'undefined') {
		myBooks = []
	} else myBooks = JSON.parse(localStorage.getItem('MyBooks') as string)

	for (let i = 0; i < myBooks.length; i++) {
		if (myBooks[i].id === id) {
			myBooks[i].reading = !myBooks[i].reading
			myBooks[i].finished = true
		}
	}
	const myBooksNew: string = JSON.stringify(myBooks)

	UpdateMyBooks(myBooksNew) // update localstorage, database
	return myBooksNew // return value for update global state
}

const FinishReadingButton = (id: number, reading: boolean) => {
	const { setUserMyBooks } = useContext(AppContext)

	function FinishReadingButtonAct() {
		const newArr = FinishReading(id) // update localstorage, database
		setUserMyBooks(newArr) // update global state
	}

	if (!reading) return <></>
	return (
		<a onClick={() => FinishReadingButtonAct()}>
			<span className="icon icon-read"></span>Finish reading
		</a>
	)
}
export default FinishReadingButton 
