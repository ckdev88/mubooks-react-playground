import { useState } from 'react'
import TropesInMyBooks from '../../components/TropesInMyBooks'
import TropesLiked from '../../components/TropesLiked'
import TropesDisliked from '../../components/TropesDisliked'

const currentPage = 'tropes'

const TropesPage = () => {
	const [isShowingTropesInMyBooks, setIsShowingTropesInMyBooks] = useState<boolean>(false)

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
