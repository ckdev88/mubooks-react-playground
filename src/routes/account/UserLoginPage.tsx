import { useEffect, useContext } from 'react'
import LoginCard from '../../components/account/LoginCard'
import SignupCard from '../../components/account/SignupCard'
import RecoverCard from '../../components/account/RecoverCard'
import setDraaideurHeight from '../../functions/setDraaideurHeight'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'

const pageTitle = 'Log in'

export default function UserLoginPage() {
	const navigate = useNavigate()
	const { userIsLoggedIn, setNavTitle } = useContext(AppContext)

	useEffect(() => {
		setNavTitle(pageTitle)
		if (userIsLoggedIn) navigate('/dashboard')
	}, [setNavTitle, userIsLoggedIn, navigate])

	useEffect(() => setDraaideurHeight(), [])
	return (
		<>
			<h1 id="welcome">
				<img id="welcome-logo-img" src="img/logo.svg" alt="" /> MuBooks
			</h1>
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
