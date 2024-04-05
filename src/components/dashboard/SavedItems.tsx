import { useNavigate } from 'react-router-dom'

// TODO: add deck of "cards" to show first n of saved books (covers)

const SavedItems = () => {
	const navigate = useNavigate()
	function goSavedBooks() {
		navigate('/saved-books')
	}
	return (
		<>
			<main className="toadd">
				<aside>
					<button onClick={() => goSavedBooks()}>
						<img src="img/save-books-icon.png" />
					</button>
				</aside>
				Let's start saving books.
			</main>
		</>
	)
}
export default SavedItems
