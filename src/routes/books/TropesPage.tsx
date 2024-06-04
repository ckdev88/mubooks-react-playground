import { useContext, useState } from 'react'
import { AppContext } from '../../App'
import { cleanIndexKey } from '../../helpers/cleanInput'
import BooksOverviewPage from './BooksOverviewPage'
const TropesPage = () => {
	const { userMyBooks } = useContext(AppContext)
	const [activeTrope, setActiveTrope] = useState<string>('')
	const [tropeBooks, setTropeBooks] = useState<Books>([])
	let tropesSet = new Set<string>()
	userMyBooks.map((book) => {
		if (book.review_tropes) book.review_tropes.map((reviewtrope) => tropesSet.add(reviewtrope))
	})
	let tropesArr
	tropesArr = Array.from(tropesSet)

	function activateTrope(trope: string) {
		const tropeBooksFiltered = userMyBooks.filter(
			(book: Book) =>
				book.review_tropes !== undefined && book.review_tropes.length > 0 && book.review_tropes.includes(trope)
		)
		setTropeBooks(tropeBooksFiltered)
		setActiveTrope(trope)
	}

	return (
		<>
			<h1>My Tropes</h1>
			<ul className="tropes clr">
				{tropesArr.map((trope, index) => (
					<li key={cleanIndexKey(trope, index)} className="trope_add">
						<button className="btn-txt btn-sm mb0" onClick={() => activateTrope(trope)}>
							{trope}
						</button>
					</li>
				))}
			</ul>
			{tropeBooks.length > 0 && (
				<>
					<h2>
						My Books for <em>{activeTrope}</em> :
					</h2>
					<BooksOverviewPage books={tropeBooks} page="tropespage" />
				</>
			)}
		</>
	)
}

export default TropesPage
