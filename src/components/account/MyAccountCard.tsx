import { useContext, useEffect } from 'react'
import useCardRotate from '../../hooks/useCardRotate'
import { Link } from 'react-router-dom'
import { AppContext } from '../../App'
import { localStorageKey } from '../../../utils/supabase'

export default function MyAccountCard() {
	const { change } = useCardRotate()
	const { username, usermail, setUsermail } = useContext(AppContext)

	// refresh usermail state using the one saved in localStorage
	useEffect(() => {
		if (usermail === '') {
			const localUser: User = JSON.parse(localStorage.getItem(localStorageKey) as string).user.user_metadata
			const localUserEmail = localUser.email
			if (typeof localUserEmail === 'string' && localUserEmail !== undefined) setUsermail(localUserEmail)
		}
	})

	return (
		<div className="card">
			<header>
				My account <sub>An overview of my profile</sub>
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
				<button onClick={change}>change</button>
			</main>
			<footer>
				<Link to="/dashboard">Back to dashboard</Link>
			</footer>
		</div>
	)
}
