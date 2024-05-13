import { useEffect } from 'react'
import LoginCard from '../../components/account/LoginCard'
import SignupCard from '../../components/account/SignupCard'
import RecoverCard from '../../components/account/RecoverCard'
import setDraaideurHeight from '../../functions/setDraaideurHeight'

export default function UserLoginPage() {
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
