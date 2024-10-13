// TODO: line-graph: show amount of books read per month; x: months of year, y: books
// TODO: line-graph: show amount of pages read per month; x: months of year, y: pages
// TODO: smoother line-graph: show amount of days to finish a book; x: days, y: number of books
// TODO: circle-diagram showing the number of books per star rating
// TODO: circle-diagram showing the number of books per spice rating
import { useState } from 'react'
import BooksWithoutPagesList from './BooksWithoutPagesList'

const now: Date = new Date()
const curYear = now.getFullYear()
const curYearStartDayNr: Date = new Date(curYear, 0, 0)
const oneDay = 1000 * 60 * 60 * 24
const curYearDayNr: number = Math.floor((Number(now) - Number(curYearStartDayNr)) / oneDay)

const countBookValues = ({ myBooksArr, year }: { myBooksArr: Books; year: number }) => {
	/** Count Books Finished */
	let cbf: number = 0
	/** Count Books Without Pages */
	let cbwp: number = 0
	/** Count Pages Finished */
	let cpf: number = 0
	/** Average Days Per Book */
	let adpb: number = 0
	/** Average Pages Per Day */
	let appd: number = 0
	const bwp: BooksWithoutPages = []
	myBooksArr.map((b) => {
		if (b.date_finished !== undefined && Math.floor(b.date_finished / 10000) === year) {
			cbf += 1
			if (Number(b.number_of_pages_median) === 0 || b.number_of_pages_median === undefined) {
				cbwp += 1
				const pageless = { id: b.id, title_short: b.title_short }
				bwp.push(pageless)
			} else if (b.number_of_pages_median > 0) cpf += b.number_of_pages_median
		}
	})
	if (year === curYear) {
		adpb = Math.floor(curYearDayNr / cbf)
		appd = Math.floor(cpf / curYearDayNr)
	} else {
		adpb = Math.floor(365 / cbf)
		appd = Math.floor(cpf / 365)
	}

	return { cbf, cpf, cbwp, adpb, appd, bwp }
}

const StatisticsYear = ({ myBooksArr, year }: { myBooksArr: Books; year: number }) => {
	const { cbf, cpf, cbwp, adpb, appd, bwp } = countBookValues({ myBooksArr, year })
	/** BWP = Books Without Pages */
	const [showBWP, setShowBWP] = useState<boolean>(false)
	return (
		<>
			<h2>{year}</h2>
			Books finished: {cbf}
			<br />
			Pages read: {cpf}
			{cbwp > 0 && <>*</>}
			<br />
			Average days per book: {adpb}
			<br />
			Average pages per day: {appd}
			{cbwp > 0 && <>*</>}
			<br />
			{cbwp > 0 && (
				<>
					<button
						onClick={() => setShowBWP(!showBWP)}
						className={
							showBWP
								? 'btn-text caret-right-toggle italic diblock wauto active'
								: 'btn-text caret-right-toggle italic diblock wauto'
						}
					>
						* Books without pages defined{' '}
					</button>
					<ul className={showBWP ? 'expandable expanded' : 'expandable collapsed'} aria-expanded={showBWP}>
						<BooksWithoutPagesList bwp={bwp} year={year} key={year} />
					</ul>
				</>
			)}
		</>
	)
}

export default StatisticsYear
