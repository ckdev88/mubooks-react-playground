import { useContext, useEffect } from 'react'
import useCardRotate from '../../hooks/useCardRotate'
import { Link } from 'react-router-dom'
import { AppContext } from '../../App'
import { supabase } from '../../../utils/supabase'

async function userRefreshEmail() {
	const userdata = await supabase.auth.getSession()
	if (userdata.error) return false
	else return userdata.data.session?.user.email
}

export default function MyAccountCard() {
	const { change } = useCardRotate()
	const { username, usermail, setUsermail } = useContext(AppContext)

	async function refreshmail() {
		const refreshedEmail = await userRefreshEmail()
		if (typeof refreshedEmail === 'string') setUsermail(refreshedEmail)
	}
	if (usermail === '') {
		useEffect(() => {
			refreshmail()
		}, [])
	}
	return (
		<div className="card">
			<header>
				My account <sub>An overview of my profile</sub>
			</header>
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
