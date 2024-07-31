// TODO: auto hide all tropes from books
// TODO: liked tropes get different colors from disliked tropes
import { useContext, useEffect } from 'react'
import { AppContext } from '../../App'
import TropesInMyBooks from '../../components/TropesInMyBooks'
import TropesLiked from '../../components/TropesLiked'
import TropesDisliked from '../../components/TropesDisliked'

const pageTitle = 'Tropes'
const currentPage = 'tropes'

const TropesPage = () => {
	const { setNavTitle } = useContext(AppContext)
	useEffect(() => {
		setNavTitle(pageTitle)
	}, [setNavTitle])

	return (
		<>
			<h1>My Tropes</h1>
			<TropesLiked />
			<TropesDisliked />
			<hr />

			<TropesInMyBooks page={currentPage} />
		</>
	)
}

export default TropesPage
