import { useState } from 'react'
import BooksWithoutPagesList from './BooksWithoutPagesList'
import BooksWithoutStarsList from './BooksWithoutStarsList'
import PieG from './PieG'
import LineG2 from './LineG2'
import LineG3 from './LineG3'

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
	/** Days Per Book array where key is amount of days, value is amount of books */
	const dpb: number[] = []
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

			if (b.date_reading !== undefined) {
				// get days per book
				/** Date Reading .. leftover will be Day Reading */
				let dr: number = b.date_reading
				/** Date Reading Year */
				const dry: number = Math.floor(dr / 10000)
				dr -= dry * 10000
				/** Date Reading Month */
				const drm: number = Math.floor(dr / 100)
				dr -= drm * 100
				const date_reading_date = new Date(dry, drm, dr)
				/** Date Finished .. leftover of dr will be Day Finished */
				let df: number = b.date_finished
				/** Date Finished Year */
				const dfy: number = Math.floor(df / 10000)
				df -= dfy * 10000
				/** Date Finished Month */
				const dfm: number = Math.floor(df / 100)
				df -= dfm * 100
				const date_finished_date: Date = new Date(dfy, dfm, df)
				const date_difference: number = (date_finished_date.getTime() - date_reading_date.getTime()) / 1000 / 3600 / 24
				if (dpb[date_difference] === undefined) dpb[date_difference] = 0
				dpb[date_difference] = dpb[date_difference] + 1
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

	return { cbf, cpf, cbfm, cpfm, cbwp, adpb, appd, astpb, cstpb, bwp, bwst, cbwst, dpb }
}

const StatisticsYear = ({ myBooksArr, year }: { myBooksArr: Books; year: number }) => {
	const { cbf, cpf, cbfm, cpfm, cbwp, adpb, appd, astpb, cstpb, bwp, bwst, cbwst, dpb } = countBookValues({
		myBooksArr,
		year,
	})
	const [showCbfDetails, setShowCbfDetails] = useState<boolean>(false)
	const [showDpbDetails, setShowDpbDetails] = useState<boolean>(false)
	const [showStpbDetails, setShowStpbDetails] = useState<boolean>(false)

	const monthNames: string[] = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	function getMonthName(i: number): string {
		return monthNames[i]
	}
	/** Get Days Per Book Per Year Per Month */
	function getDpbPyPm(year: number, month: number): void {
		console.log('hola')
	}

	return (
		<section className="stats-year">
			<h1>Your numbers for {year}</h1>
			<article className="stats-item">
				<h3 className="mb0">Books & pages per month</h3>
				<LineG2 data={cbfm} data2={cpfm} subjects={['Books', 'Pages']} />
				Books finished in {year}: <b>{cbf}</b>
				{cbwp > 0 && <span className="sf">*</span>}{' '}
				<button onClick={() => setShowCbfDetails(!showCbfDetails)} className="btn-text diblock">
					...
				</button>
				{showCbfDetails && (
					<div className="mt05 sf">
						{
							// DOING: show title_short of books, including hash link to /finished
						}
						{cbfm.map((c, index) => (
							<div key={`cbfm${year}${index}`}>
								{getMonthName(index)}:{' '}
								<b>
									{c} {c === 1 ? 'book' : 'books'}
								</b>
								&nbsp;
								{c > 0 && (
									<button className="btn-text diblock h1em lh1em" onClick={() => getDpbPyPm(year, index)}>
										...
									</button>
								)}
								<br />
							</div>
						))}
						<br />
						Pages read: <b>{cpf}</b>
						<br />
						Average pages per day: <b>{appd}</b>
						<br />
						<br />
						{bwp.length > 0 && (
							<div>
								<i>* Books without pages defined</i>
								<ul className="mt0">
									<BooksWithoutPagesList bwp={bwp} year={year} key={year} />
								</ul>
							</div>
						)}
					</div>
				)}
			</article>
			<article className="stats-item">
				<h3 className="mb0">Days per book</h3>
				<LineG3 data={dpb} />
				Average days to finish a book: <b>{adpb}</b>&nbsp;
				<button className="btn-text diblock" onClick={() => setShowDpbDetails(!showDpbDetails)}>
					...
				</button>
				{
					// TODO: show title_short of books, including hash link to /finished
				}
				{showDpbDetails && (
					<div className="mt05 sf">
						{dpb.map((b, index) => {
							return (
								<div key={`adpb${year}${index}`}>
									{index} {index === 1 ? 'day' : 'days'}:{' '}
									<b>
										{b} {b === 1 ? `book` : `books`}
									</b>
								</div>
							)
						})}
					</div>
				)}
				<br />
			</article>
			<article className="stats-item">
				<h3 className="mb0">How I rated my books in {year}</h3>
				<PieG data={cstpb} />
				Average stars per book: <b>{astpb}</b>
				{cbwst > 0 && (
					<>
						<span className="sf">*</span>
						<button onClick={() => setShowStpbDetails(!showStpbDetails)} className="btn-text diblock">
							...
						</button>
						{
							// TODO: show title_short of books, including hash link to /finished
						}
						{showStpbDetails && (
							<div className="mt05 sf">
								{cstpb.length > 0 &&
									cstpb.map((b, index) => {
										return (
											<div key={`cstpb${year}${index}`} className={b === 0 ? 'dnone' : ''}>
												{index + 1} {index + 1 === 1 ? 'star' : 'stars'}:{' '}
												<b>
													{b} {b === 1 ? 'book' : 'books'}
												</b>
											</div>
										)
									})}

								{bwst.length > 0 && (
									<div>
										<br />
										<i>* Books without stars defined: </i>
										<ul className="mt0">
											<BooksWithoutStarsList bwst={bwst} year={year} key={year} />
										</ul>
									</div>
								)}
							</div>
						)}
					</>
				)}
			</article>
		</section>
	)
}

export default StatisticsYear
