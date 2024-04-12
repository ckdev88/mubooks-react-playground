import { Link } from 'react-router-dom'
import ReadingItems from './ReadingItems'
// check if there are any saved books
// if yes, check if any of saved books are marked as reading
// if yes, router.push to saved books
// if no, router.push to saved books?
// if no, router.push to search

// import { useMuBooksStore } from '../../stores/MuBooksStore'
// const muBooksStore = useMuBooksStore()
// const readingBook = muBooksStore.getReadingBook
// console.log('readingBook:', readingBook)
export default function Reading() {
	return (
		<>
			<article className="adder">
				<Link to="/reading">
					<header>
						What I'm reading now <span>›</span>
					</header>
				</Link>
				<ReadingItems />
			</article>
		</>
	)
}
