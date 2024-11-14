import { useContext } from 'react'
import useCardRotate from '../../hooks/useCardRotate'
import { Link } from 'react-router-dom'
import { AppContext } from '../../App'
import Heading from '../ui/Heading'
import useResetUsermail from '../../hooks/useResetUsermail'

export default function MyAccountCard() {
	const { change } = useCardRotate()
	const { username, usermail } = useContext(AppContext)

	useResetUsermail()

	return (
		<div className="card">
			<header>
				<Heading text="My account" icon="icon-profile.svg" sub="An overview of my profile" />
			</header>
			<main>
				<dl>
					<dt>Screen name</dt>
					<dd>{username ? username : '-'}</dd>
					<dt>Email address</dt>
					<dd>{usermail}</dd>
					<dt>Password</dt>
					<dd>******</dd>
				</dl>
				<button className="btn-lg" onClick={change}>
					<span>change</span>
				</button>
			</main>
			<footer>
				<Link className="a-text" to="/dashboard">
					Back to dashboard
				</Link>
			</footer>
		</div>
	)
}
