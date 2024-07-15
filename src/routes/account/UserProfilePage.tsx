import { useContext, useEffect } from 'react'
import setDraaideurHeight from '../../functions/setDraaideurHeight'
import MyAccountCard from '../../components/account/MyAccountCard'
import MyAccountEditCard from '../../components/account/MyAccountEditCard'
import { AppContext } from '../../App'

const pageTitle = 'Mu Profile'
// const currentPage = 'profile'

const UserProfilePage = () => {
	const { setNavTitle } = useContext(AppContext)

	useEffect(() => {
		setNavTitle(pageTitle)
	}, [setNavTitle])

	useEffect(() => {
		setDraaideurHeight()
	}, [])
	return (
		<>
			<div className="cards-draaideur" id="cards-draaideur">
				<div className="axis">
					<MyAccountCard />
					<MyAccountEditCard />
				</div>
			</div>
		</>
	)
}
export default UserProfilePage
