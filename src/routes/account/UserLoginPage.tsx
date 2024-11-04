import { useEffect, useContext } from 'react'
import LoginCard from '../../components/account/LoginCard'
import SignupCard from '../../components/account/SignupCard'
import RecoverCard from '../../components/account/RecoverCard'
import setDraaideurHeight from '../../functions/setDraaideurHeight'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import HeaderBranding from '../../components/HeaderBranding'

export default function UserLoginPage() {
	const navigate = useNavigate()
	const { userIsLoggedIn } = useContext(AppContext)

	useEffect(() => {
		if (userIsLoggedIn) navigate('/dashboard#876554')
	}, [userIsLoggedIn, navigate])

	useEffect(() => setDraaideurHeight(), [])
	return (
		<>
			<HeaderBranding />
			<div id="cards-draaideur" className="cards-draaideur">
				<div className="axis">
					<LoginCard />
					<SignupCard />
					<RecoverCard />
				</div>
			</div>
		</>
	)
}
