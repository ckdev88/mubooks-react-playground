import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import TropesInMyBooks from '../../components/TropesInMyBooks'
import TropesLiked from '../../components/TropesLiked'
import TropesDisliked from '../../components/TropesDisliked'

const pageTitle = 'Tropes'
const currentPage = 'tropes'

const TropesPage = () => {
	const { setNavTitle } = useContext(AppContext)
	const [isShowingTropesInMyBooks, setIsShowingTropesInMyBooks] = useState<boolean>(false)

	useEffect(() => {
		setNavTitle(pageTitle)
	}, [setNavTitle])

	return (
		<>
			<h1>My Tropes</h1>
			<TropesLiked />
			<TropesDisliked />
			<br />
			<hr />
			<br />

			<button
				className={
					isShowingTropesInMyBooks
						? 'btn-text caret-right-toggle active wauto notext'
						: 'btn-text caret-right-toggle wauto'
				}
				onClick={() => setIsShowingTropesInMyBooks(!isShowingTropesInMyBooks)}
			>
				{isShowingTropesInMyBooks ? '' : 'Show more'}
			</button>
			{isShowingTropesInMyBooks && <TropesInMyBooks page={currentPage} />}
		</>
	)
}

export default TropesPage
