import { getDurationDays } from '../Helpers'

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

			if (b.date_reading !== undefined && b.date_finished !== undefined) {
				const date_difference: number = getDurationDays(b.date_reading, b.date_finished)
				if (dpb[date_difference] === undefined) dpb[date_difference] = 0
				dpb[date_difference] = dpb[date_difference] + 1
				// NOTE: see StatisticsDaysPerBookInYear for further handling, might be better to merge and optimize these two
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
export default countBookValues
