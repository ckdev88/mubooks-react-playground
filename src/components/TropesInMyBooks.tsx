import { useState, useContext } from 'react'
import { cleanIndexKey } from '../helpers/cleanInput'
import { AppContext } from '../App'
import BooksOverviewPage from '../routes/books/BooksOverviewPage'
import { TropesPageContext } from '../routes/books/TropesPage'
import { cleanAnchor } from '../helpers/cleanInput'
import { Link } from 'react-router-dom'

const TropesInMyBooks = ({ page }: { page: Page }) => {
	const [isShowingTropesInMyBooks, setIsShowingTropesInMyBooks] = useState<boolean>(true)
	const { likedTropesLowercase, dislikedTropesLowercase } = useContext(TropesPageContext)
	const { userMyBooks } = useContext(AppContext)
	const [activeTrope, setActiveTrope] = useState<string>('')
	const [tropeBooks, setTropeBooks] = useState<Books>([])
	const tropesSet = new Set<string>()

	const savedbookslink: Page = 'savedbooks'

	userMyBooks.map((book) => {
		if (book.review_tropes) book.review_tropes.map((reviewtrope) => tropesSet.add(reviewtrope.trim().toLowerCase()))
	})
	const tropesArr = Array.from(tropesSet).sort((a, b) => a.localeCompare(b))

	function showTropeBooks(trope: string) {
		const tropeBooksFiltered: Books = []
		userMyBooks.map((b: Book) => {
			if (b.review_tropes !== undefined && b.review_tropes.length > 0)
				b.review_tropes.map((t: string) => {
					if (trope === t.toLowerCase()) {
						tropeBooksFiltered.push(b)
					}
				})
		})
		setTropeBooks(tropeBooksFiltered)
		setActiveTrope(trope)
		setTimeout(() => {
			location.href = '#' + cleanAnchor(trope + '_books')
		}, 200)
	}

	return (
		<section className="section-badges">
			<h2>
				Tropes in my Books&nbsp;
				{tropesArr.length > 0 && (
					<button
						className={
							isShowingTropesInMyBooks
								? 'btn-text caret-right-toggle active wauto notext diblock'
								: 'btn-text caret-right-toggle wauto notext diblock'
						}
						onClick={() => setIsShowingTropesInMyBooks(!isShowingTropesInMyBooks)}
					></button>
				)}
			</h2>
			{tropesArr.length > 0 ? (
				<div
					className={isShowingTropesInMyBooks ? 'tropes clr expandable expanded' : 'tropes clr expandable collapsed'}
					aria-expanded={isShowingTropesInMyBooks}
				>
					{tropesArr.map((trope, index) => {
						let cn: string = 'btn-sm mb0 badge'
						if (likedTropesLowercase.includes(trope.toLowerCase())) cn += ' cgreen'
						else if (dislikedTropesLowercase.includes(trope.toLowerCase())) cn += ' cred'
						return (
							<button key={cleanIndexKey(trope, index)} className={cn} onClick={() => showTropeBooks(trope)}>
								{trope}
							</button>
						)
					})}
				</div>
			) : (
				<div className="ml035">
					No tropes in my books yet, want to add some? <Link to={savedbookslink}>Go to my books</Link>
				</div>
			)}
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
		</section>
	)
}
export default TropesInMyBooks
