// import { useContext, useEffect } from 'react'
import { useContext } from 'react'
import useCardRotate from '../../hooks/useCardRotate'
import { Link } from 'react-router-dom'
import { AppContext } from '../../App'
import { UserRefreshEmail } from '../../helpers/AuthHelpers'

export default function MyAccountCard() {
	const { change } = useCardRotate()
	const { username, usermail, setUsermail } = useContext(AppContext)

	const resfreshedEmail = UserRefreshEmail()
	if (usermail === '') setUsermail(resfreshedEmail)


	return (
		<div className="card">
			<header>My account.</header>
			<main>
				<dl>
					<dt>Screen name</dt>
					<dd>{username}</dd>
					<dt>Email address</dt>
					<dd>{usermail}</dd>
					<dt>Password</dt>
					<dd>******</dd>
				</dl>
				<button onClick={change}>change</button>
			</main>
			<footer>
				<Link to="/dashboard">Back to dashboard</Link>
			</footer>
		</div>
	)
}
