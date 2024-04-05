import { useEffect } from 'react'
import LoginCard from '../../components/account/LoginCard'
import SignupCard from '../../components/account/SignupCard'
import RecoverCard from '../../components/account/RecoverCard'
import setDraaideurHeight from '../../hooks/setDraaideurHeight'

export default function UserLoginPage() {
	useEffect(() => { setDraaideurHeight() }, [])
	// TODO: proper redirect if already logged in, probably has to be done in routes or app
	return (
		<>
			<div id="welcome-logo" style={{ marginBottom: 1 + 'rem' }}>
				<h1 style={{ textAlign: 'center' }}>MuBooks</h1>
				<img
					id="welcome-logo-img"
					src="img/logo.svg"
					style={{
						maxWidth: '33%',
						display: 'block',
						margin: '0 auto',
						position: 'relative',
						zIndex: 2,
					}}
				/>
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
