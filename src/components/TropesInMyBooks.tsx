import { useState, useContext } from 'react'
import { useState, useContext, useEffect } from 'react'
import { cleanIndexKey } from '../helpers/cleanInput'
import { AppContext } from '../App'
import BooksOverviewPage from '../routes/books/BooksOverviewPage'
import { TropesPageContext } from '../routes/books/TropesPage'

const TropesInMyBooks = ({ page }: { page: Page }) => {
	const { likedTropesLowercase, dislikedTropesLowercase } = useContext(TropesPageContext)
	const { userMyBooks } = useContext(AppContext)
	const [activeTrope, setActiveTrope] = useState<string>('')
	const [tropeBooks, setTropeBooks] = useState<Books>([])
	const tropesSet = new Set<string>()

	userMyBooks.map((book) => {
		if (book.review_tropes)
			book.review_tropes.map((reviewtrope) => tropesSet.add(reviewtrope.trim()))
	})
	const tropesArr = Array.from(tropesSet).sort((a, b) => a.localeCompare(b))

	useEffect(() => {
		// TODO improve efficiency
		const tropesListLower = tropesArr.map((trope) => trope.toLowerCase())
		const tropesList = tropesListLower.sort((a, b) => a.localeCompare(b))
		console.log(tropesList)
	}, [tropesArr])

	function showTropeBooks(trope: string) {
		const tropeBooksFiltered = userMyBooks.filter(
			(book: Book) =>
				book.review_tropes !== undefined &&
				book.review_tropes.length > 0 &&
				book.review_tropes.includes(trope)
		)
		setTropeBooks(tropeBooksFiltered)
		setActiveTrope(trope)
	}

	return (
		<>
			<h2>Tropes in my Books.</h2>
			<ul className="tropes clr">
				{tropesArr.map((trope, index) => {
					let cn: string = 'btn-sm mb0 badge'
					if (likedTropesLowercase.includes(trope.toLowerCase())) cn += ' cgreen'
					else if (dislikedTropesLowercase.includes(trope.toLowerCase())) cn += ' cred'
					return (
						<li key={cleanIndexKey(trope, index)} className="trope_add">
							<button className={cn} onClick={() => showTropeBooks(trope)}>
								{trope}
							</button>
						</li>
					)
				})}
			</ul>
			{tropeBooks.length > 0 && (
				<>
					<h2>
						My Books for <em>{activeTrope}</em>
					</h2>
					<br />
					<BooksOverviewPage books={tropeBooks} page={page} />
				</>
			)}
		</>
	)
}
export default TropesInMyBooks
