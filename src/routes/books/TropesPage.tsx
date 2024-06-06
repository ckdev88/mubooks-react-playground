import { useContext, useEffect } from 'react'
import { AppContext } from '../../App'
import TropesInMyBooks from '../../components/TropesInMyBooks'
import TropesLiked from '../../components/TropesLiked'
import TropesDisliked from '../../components/TropesDisliked'

const pageTitle = 'Tropes'
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
			<TropesInMyBooks />
		</>
	)
}

export default TropesPage
