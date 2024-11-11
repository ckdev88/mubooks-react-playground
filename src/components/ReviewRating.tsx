import { useContext, useState } from 'react'
import { AppContext } from '../App'
import useMyBooksUpdateDb from '../hooks/useMyBooksUpdateDb'

const ReviewRating = ({
	book_id,
	book_rate_stars,
	book_rate_spice,
	book_title_short,
}: {
	book_id: Book['id']
	book_rate_stars: Book['rate_stars']
	book_rate_spice: Book['rate_spice']
	book_title_short: Book['title_short']
}) => {
	const { userMyBooks, setUserMyBooks } = useContext(AppContext)

	const [reviewStars, setReviewStars] = useState(book_rate_stars)
	const [reviewSpice, setReviewSpice] = useState(book_rate_spice)

	const msg: string = 'Added rating for ' + book_title_short
	// TODO data_hooks_methods: might be better to just refer to updateEntriesDb.ts: updateEntriesDb
	const updateMyBooksDb = useMyBooksUpdateDb({
		myBooksNew: userMyBooks,
		book_id,
		msg,
	})

	function RateStars(book_id: Book['id'], type: 'rate_stars' | 'rate_spice', rating: Scale5) {
		let myBooks: Books
		if (userMyBooks !== undefined) myBooks = userMyBooks
		else myBooks = []

		for (let i = 0; i < myBooks.length; i++) {
			if (myBooks[i].id === book_id) {
				if (type === 'rate_stars') myBooks[i].rate_stars = rating
				if (type === 'rate_spice') myBooks[i].rate_spice = rating
				break
			}
		}

		setUserMyBooks(myBooks)
		updateMyBooksDb()
		return myBooks
	}

	function RateStarsAct(type: 'rate_stars' | 'rate_spice', amount: Scale5) {
		if (type === 'rate_stars') setReviewStars(amount)
		if (type === 'rate_spice') setReviewSpice(amount)
		const newArr: Books = RateStars(book_id, type, amount)
		setUserMyBooks(newArr)
	}

	const iconClassNameEraser = 'icon icon-eraser'
	const iconClassNameStar = 'icon icon-star'
	const iconClassNameSpice = 'icon icon-spice'
	if (book_rate_stars === undefined) book_rate_stars = 0
	if (book_rate_spice === undefined) book_rate_spice = 0

	return (
		<div className="review-rates">
			<div className="rate-stars">
				<button className="btn-icon" onClick={() => RateStarsAct('rate_stars', 0)}>
					<span className={iconClassNameEraser}></span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_stars', 1)}>
					<span className={iconClassNameStar + (reviewStars > 0 ? ' active' : '')}>*</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_stars', 2)}>
					<span className={iconClassNameStar + (reviewStars > 1 ? ' active' : '')}>*</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_stars', 3)}>
					<span className={iconClassNameStar + (reviewStars > 2 ? ' active' : '')}>*</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_stars', 4)}>
					<span className={iconClassNameStar + (reviewStars > 3 ? ' active' : '')}>*</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_stars', 5)}>
					<span className={iconClassNameStar + (reviewStars > 4 ? ' active' : '')}>*</span>
				</button>
			</div>
			<div className="rate-spice">
				<button className="btn-icon" onClick={() => RateStarsAct('rate_spice', 0)}>
					<span className={iconClassNameEraser}></span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_spice', 1)}>
					<span className={iconClassNameSpice + (reviewSpice > 0 ? ' active' : '')}>&</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_spice', 2)}>
					<span className={iconClassNameSpice + (reviewSpice > 1 ? ' active' : '')}>&</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_spice', 3)}>
					<span className={iconClassNameSpice + (reviewSpice > 2 ? ' active' : '')}>&</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_spice', 4)}>
					<span className={iconClassNameSpice + (reviewSpice > 3 ? ' active' : '')}>&</span>
				</button>
				<button className="btn-icon" onClick={() => RateStarsAct('rate_spice', 5)}>
					<span className={iconClassNameSpice + (reviewSpice > 4 ? ' active' : '')}>&</span>
				</button>
			</div>
		</div>
	)
}
export default ReviewRating
