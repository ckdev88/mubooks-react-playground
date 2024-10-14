// TODO: line-graph: show amount of books read per month; x: months of year, y: books
// TODO: line-graph: show amount of pages read per month; x: months of year, y: pages
// TODO: smoother line-graph: show amount of days to finish a book; x: days, y: number of books
// TODO: circle-diagram showing the number of books per star rating
// TODO: circle-diagram showing the number of books per spice rating
import { useState } from 'react'
import BooksWithoutPagesList from './BooksWithoutPagesList'
import BooksWithoutStarsList from './BooksWithoutStarsList'
import PieG from './PieG'
import LineG2 from './LineG2'

const now: Date = new Date()
const curYear = now.getFullYear()
const curYearStartDayNr: Date = new Date(curYear, 0, 0)
const oneDay = 1000 * 60 * 60 * 24
const curYearDayNr: number = Math.floor((Number(now) - Number(curYearStartDayNr)) / oneDay)

const countBookValues = ({ myBooksArr, year }: { myBooksArr: Books; year: number }) => {
	/** Count Books Finished */
	let cbf: number = 0
	/** Count Books Finished Monthly */
	const cbfm: number[] = Array(12).fill(0)
	/** Count Books Without Pages */
	let cbwp: number = 0
	/** Count Pages Finished */
	let cpf: number = 0
	/** Count Pages Finished Monthly */
	const cpfm: number[] = Array(12).fill(0)
	/** Average Days Per Book */
	let adpb: number = 0
	/** Average Pages Per Day */
	let appd: number = 0
	/** Counted Books with STars */
	let cbst: number = 0
	/** Counted Books without STars */
	let cbwst: number = 0
	/** Counted STars Total */
	let cstt: number = 0
	/**
	 * Counted STars Per Book
	 * array of 5 values, [0]=1 star, [4]=5 stars, incremented by the amount of books per amount of stars/index
	 */
	const cstpb: number[] = [0, 0, 0, 0, 0]
	/** Average STars Per Book */
	let astpb: number = 0

	const bwp: BooksWithoutPages = []
	const bwst: BooksWithoutStars = []

	let monthIndex: number = 0

	myBooksArr.map((b) => {
		if (b.date_finished !== undefined && Math.floor(b.date_finished / 10000) === year) {
			cbf += 1

			monthIndex = Math.floor((b.date_finished - year * 10000) / 100) - 1
			// get monthly finished books
			cbfm[monthIndex] += 1

			// get pages
			if (Number(b.number_of_pages_median) === 0 || b.number_of_pages_median === undefined) {
				// pages count
				cbwp += 1
				const pageless = { id: b.id, title_short: b.title_short }
				bwp.push(pageless)
			} else if (b.number_of_pages_median > 0) {
				cpf += b.number_of_pages_median
				// add up monthly finished pages
				cpfm[monthIndex] += b.number_of_pages_median
			}

			// get star stats
			if (b.rate_stars > 0) {
				cbst += 1
				cstt += b.rate_stars
				cstpb[b.rate_stars - 1] += 1
			} else {
				cbwst += 1
				const starless = { id: b.id, title_short: b.title_short }
				bwst.push(starless)
			}
		}
	})

	if (year === curYear) {
		adpb = Math.floor(curYearDayNr / cbf)
		appd = Math.floor(cpf / curYearDayNr)
	} else {
		adpb = Math.floor(365 / cbf)
		appd = Math.floor(cpf / 365)
	}
	astpb = Number((cstt / cbst).toFixed(1))

	return { cbf, cpf, cbfm, cpfm, cbwp, adpb, appd, astpb, cstpb, bwp, bwst, cbwst }
}

const StatisticsYear = ({ myBooksArr, year }: { myBooksArr: Books; year: number }) => {
	const { cbf, cpf, cbfm, cpfm, cbwp, adpb, appd, astpb, cstpb, bwp, bwst, cbwst } = countBookValues({
		myBooksArr,
		year,
	})
	/** BWP = Books Without Pages */
	const [showBWP, setShowBWP] = useState<boolean>(false)
	/** BWST = Books Without STars */
	const [showBWST, setShowBWST] = useState<boolean>(false)
	// TODO: move tmpSubjects into something a bit more durable
	const tmpSubjects: string[] = ['Books', 'Pages']
	return (
		<>
			<h2>{year}</h2>
			Books finished: {cbf}
			<br />
			Average days per book: {adpb}
			<br />
			Pages read: {cpf}
			{cbwp > 0 && <>*</>}
			<br />
			Average pages per day: {appd}
			{cbwp > 0 && <>*</>}
			<br />
			<br />
			<b>Books & pages finished per month:</b>
			<LineG2 data={cbfm} data2={cpfm} subjects={tmpSubjects} />
			<br />
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
					<br />
				</>
			)}
			<br />
			Average stars per book: {astpb} {cbwst > 0 && <>**</>}
			{/* --- in plaats hiervan PieG laten zien
				cstpb.map((st, index) => {
				return (
					<li key={index}>
						{index + 1} stars: {st}
					</li>
				)
			})
			*/}
			<br />
			<b>How I rated my books in {year}</b>
			<PieG data={cstpb} />
			{cbwst > 0 && (
				<>
					<button
						onClick={() => setShowBWST(!showBWST)}
						className={
							showBWP
								? 'btn-text caret-right-toggle italic diblock wauto active'
								: 'btn-text caret-right-toggle italic diblock wauto'
						}
					>
						** Books without stars defined{' '}
					</button>
					<ul className={showBWST ? 'expandable expanded' : 'expandable collapsed'} aria-expanded={showBWST}>
						<BooksWithoutStarsList bwst={bwst} year={year} key={year} />
					</ul>
				</>
			)}
		</>
	)
}

export default StatisticsYear
