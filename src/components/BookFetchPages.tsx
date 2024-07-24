import { useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../../utils/supabase'
import { AppContext } from '../App'
import { getOlPagesMedian } from '../Helpers'

const BookFetchPages = (book: Book) => {
	const { userMyBooks, setUserMyBooks, setPopupNotification, userid } = useContext(AppContext)
	const [refreshing, setRefreshing] = useState(false)
	const [isShowingPages, setIsShowingPages] = useState(false)

	const [originalAmountPages, setOriginalAmountPages] = useState()
	const [bookPages, setBookPages] = useState<number>(book.number_of_pages_median)
	const [isModding, setIsModding] = useState<boolean>(false)
	const [isChangingBookPages, setIsChangingBookPages] = useState<number>(0)

	async function toggleRefreshPages() {
		if (isShowingPages) setIsShowingPages(!isShowingPages)
		else {
			setIsModding(true)
			await fetch('https://openlibrary.org/works/' + book.id + '.json')
				.then((res) => res.json())
				.then((json) => json.number_of_pages?.value)
				.then((pages) => {
					setIsShowingPages(true)
					if (pages !== undefined) setBookPages(pages)
				})
				.catch((err) => {
					console.log('error', err)
				})
				.finally(() => setIsModding(false))
		}
		setRefreshing(false)
	}

	// TODO: move this function to generic helper location
	async function updateMyBooks(myBooksNew: Books) {
		let msg: string
		setUserMyBooks(myBooksNew)
		const { error } = await supabase
			.from('user_entries')
			.update({ json: myBooksNew, testdata: 'updated from book summary: Add pages' })
			.eq('user_id', userid)
			.select('*')
		if (error) msg = error.message
		else msg = 'Updated pages.'
		setPopupNotification(msg)
	}

	useEffect(() => {
		if (isChangingBookPages > 0) {
			setBookPages(isChangingBookPages)

			updatePagesCallback()
			setIsChangingBookPages(0)
		}
	}, [isChangingBookPages])

	const updatePagesCallback = useCallback(
		async function updatePages() {
			if (userMyBooks.length < 1) return

			for (let i = 0; i < userMyBooks.length; i++) {
				if (userMyBooks[i].id === book.id) {
					if (isChangingBookPages !== userMyBooks[i].number_of_pages_median) {
						userMyBooks[i].number_of_pages_median = isChangingBookPages
					}
					break
				}
			}
			updateMyBooks(userMyBooks).then(() => setIsChangingBookPages(0))
		},
		[userMyBooks, book.id, bookPages, isChangingBookPages, updateMyBooks]
	)

	const getOrgPagesMed = async () => {
		const originalPagesMedian = await getOlPagesMedian(book.id)
		return originalPagesMedian
	}

	useEffect(() => {
		if (refreshing) {
			getOrgPagesMed().then((res) => setOriginalAmountPages(res))
			setRefreshing(!refreshing)
		}
		if (bookPages !== book.number_of_pages_median) {
			if (isModding) {
				updatePagesCallback()
				setIsModding(false)
			}
		}
	}, [refreshing, bookPages, isModding, updatePagesCallback, toggleRefreshPages])

	function changeBookPages(numpages: number) {
		setIsChangingBookPages(numpages)
	}

	return (
		<div className="diblock ml1">
			&nbsp;
			{originalAmountPages ? (
				<button className="btn-text" onClick={() => changeBookPages(originalAmountPages)}>
					use {originalAmountPages} pages
				</button>
			) : (
				<button className="btn-text" onClick={() => setRefreshing(!refreshing)}>
					guess
				</button>
			)}
		</div>
	)
}
export default BookFetchPages
