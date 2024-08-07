import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import TropesInMyBooks from '../../components/TropesInMyBooks'
import TropesLiked from '../../components/TropesLiked'
import TropesDisliked from '../../components/TropesDisliked'

const pageTitle = 'Tropes'
const currentPage = 'tropes'

const TropesPage = () => {
	const { setNavTitle } = useContext(AppContext)
	const [showMore, setShowMore] = useState<boolean>(false)

	useEffect(() => {
		setNavTitle(pageTitle)
	}, [setNavTitle])

	return (
		<>
			<h1>My Tropes</h1>
			<TropesLiked />
			<TropesDisliked />
<hr />
			<button className="btn btn-icon wauto" onClick={() => setShowMore(!showMore)}>
				<span className="icon icon-dots"></span>
			</button>
			{showMore && <TropesInMyBooks page={currentPage} />}
		</>
	)
}

export default TropesPage
