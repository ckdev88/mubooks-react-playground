import { useContext } from 'react'
import useCardRotate from '../../hooks/useCardRotate'
import { Link } from 'react-router-dom'
import { AppContext } from '../../App'
import { UserGetData } from '../../hooks/AuthHelpers'

export default function MyAccountCard() {
	const { change } = useCardRotate()
	const { username, usermail, setUsermail, setUsername } = useContext(AppContext)

	async function doUserData() {
		const userGetData = await UserGetData()
		if (userGetData.error !== null) {
			console.log('error fetching userdata...', userGetData.error)
		} else {
			const d = userGetData.data.user
			if (d !== null) {
				if (d.email !== null && d.email !== undefined) setUsermail(d.email)
				setUsername(d.user_metadata?.screenname)
			}
		}
	}
	doUserData()

	return (
		<div className="card">
			<header>My account</header>
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
