import { useEffect } from 'react'
import setDraaideurHeight from '../../functions/setDraaideurHeight'
import MyAccountCard from '../../components/account/MyAccountCard'
import MyAccountEditCard from '../../components/account/MyAccountEditCard'

const UserProfilePage = () => {
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
