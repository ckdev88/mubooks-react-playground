import { useState, useContext, useEffect } from 'react'
import { cleanIndexKey } from '../helpers/cleanInput'
import { AppContext } from '../App'
import BooksOverviewPage from '../routes/books/BooksOverviewPage'
import { TropesPageContext } from '../routes/books/TropesPage'
import { cleanAnchor } from '../helpers/cleanInput'

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

	function showTropeBooks(trope: string) {
		const tropeBooksFiltered = userMyBooks.filter(
			(book: Book) =>
				book.review_tropes !== undefined &&
				book.review_tropes.length > 0 &&
				book.review_tropes.includes(trope)
		)
		setTropeBooks(tropeBooksFiltered)
		setActiveTrope(trope)
		setTimeout(() => {
			location.href = '#' + cleanAnchor(trope + '_books')
		}, 200)
	}

	return (
		<>
			<h2>Tropes in my Books</h2>
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
					<h2 style={{ position: 'relative' }}>
						My Books for <em>{activeTrope}</em>
						<div
							style={{ position: 'absolute', marginTop: '-4em' }}
							id={cleanAnchor(activeTrope + '_' + 'books')}
						></div>
					</h2>
					<br />
					<BooksOverviewPage books={tropeBooks} page={page} />
				</>
			)}
		</>
	)
}
export default TropesInMyBooks
