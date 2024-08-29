import { useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../../utils/supabase'
import { AppContext } from '../App'
import { getOlPagesMedian } from '../Helpers'

const BookFetchPages = ({ book }: { book: Book }) => {
	const { userMyBooks, setUserMyBooks, setPopupNotification, userid } = useContext(AppContext)
	const [onLoad, setOnLoad] = useState(true)

	const [originalNumberOfPagesMedian, setOriginalNumberOfPagesMedian] = useState<number>(0)
	const [pushOrigin, setPushOrigin] = useState<boolean>(false)

	// TODO: move this function to generic helper location
	const updateMyBooksCallback = useCallback(
		async function updateMyBooks(myBooksNew: Books) {
			let msg: string
			setUserMyBooks(myBooksNew)
			const { error } = await supabase
				.from('user_entries')
				.update({ json: myBooksNew, testdata: 'updated from book summary: Fetch pages' })
				.eq('user_id', userid)
				.select('*')
			if (error) msg = error.message
			else msg = 'Updated pages.'
			setPopupNotification(msg)
		},
		[setPopupNotification, setUserMyBooks, userid]
	)

	const updatePagesCallback = useCallback(
		async function updatePages() {
			if (userMyBooks.length < 1) return
			const newBookPages = originalNumberOfPagesMedian

			for (let i = 0; i < userMyBooks.length; i++) {
				if (userMyBooks[i].id === book.id) {
					if (newBookPages !== userMyBooks[i].number_of_pages_median && newBookPages > 0) {
						userMyBooks[i].number_of_pages_median = newBookPages
					}
					break
				}
			}
			updateMyBooksCallback(userMyBooks)
		},
		[userMyBooks, book.id, updateMyBooksCallback, originalNumberOfPagesMedian]
	)

	useEffect(() => {
		const getOrgPagesMed = async () => {
			const originalPagesMedian = await getOlPagesMedian(book.id)
			return originalPagesMedian
		}
		if (onLoad) {
			// on load to populate 'guess'-number
			getOrgPagesMed().then((res: number) => {
				setOriginalNumberOfPagesMedian(res)
			})
			setOnLoad(!onLoad)
		}
		if (pushOrigin) {
			if (originalNumberOfPagesMedian > 0) {
				updatePagesCallback()
				setPushOrigin(false)
			}
		}
	}, [onLoad, originalNumberOfPagesMedian, pushOrigin, book.id, updatePagesCallback])

	return (
		<>
			{originalNumberOfPagesMedian > 0 && (
				<button className="btn-text mt05 ml05" onClick={() => setPushOrigin(true)}>
					{' '}
					guess: {originalNumberOfPagesMedian}{' '}
				</button>
			)}
		</>
	)
}
export default BookFetchPages
