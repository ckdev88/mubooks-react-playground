import { useEffect, useContext } from 'react'
import LoginCard from '../../components/account/LoginCard'
import SignupCard from '../../components/account/SignupCard'
import RecoverCard from '../../components/account/RecoverCard'
import setDraaideurHeight from '../../functions/setDraaideurHeight'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'

export default function UserLoginPage() {
	const navigate = useNavigate()
	const { userIsLoggedIn } = useContext(AppContext)

	useEffect(() => {
		if (userIsLoggedIn) navigate('/dashboard')
	}, [userIsLoggedIn, navigate])

	useEffect(() => setDraaideurHeight(), [])
	return (
		<>
			<h1 id="welcome">
				<img id="welcome-logo-img" src="/img/logo.svg" alt="" /> MuBooks
			</h1>
			<i className="dblock tcenter cbadgefg mt-1 mb1">Alpha version</i>
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
