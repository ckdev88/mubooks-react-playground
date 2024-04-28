import { useEffect } from 'react'
import LoginCard from '../../components/account/LoginCard'
import SignupCard from '../../components/account/SignupCard'
import RecoverCard from '../../components/account/RecoverCard'
import setDraaideurHeight from '../../functions/setDraaideurHeight'

export default function UserLoginPage() {
	useEffect(() => {
		setDraaideurHeight()
	}, [])
	return (
		<>
			<div id="welcome-logo">
				<h1 style={{ textAlign: 'center' }}>MuBooks</h1>
				<img id="welcome-logo-img" src="img/logo.svg" />
			</div>
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
