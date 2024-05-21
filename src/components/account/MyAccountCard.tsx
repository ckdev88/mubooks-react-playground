import { useContext, useEffect } from 'react'
import useCardRotate from '../../hooks/useCardRotate'
import { Link } from 'react-router-dom'
import { AppContext } from '../../App'
import { supabase } from '../../../utils/supabase'

async function getUserinfo() {
	const {
		data: { user },
	} = await supabase.auth.getUser()
	return user
}
const userinfo = await getUserinfo()

export default function MyAccountCard() {
	const { change } = useCardRotate()
	const { username, usermail, setUsermail } = useContext(AppContext)

	// refresh usermail state using the one saved in localStorage

	useEffect(() => {
		if (usermail === undefined && userinfo?.email !== undefined) setUsermail(userinfo.email)
	}, [])

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
