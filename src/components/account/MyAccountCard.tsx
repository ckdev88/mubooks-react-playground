// import { useContext, useEffect } from 'react'
import { useContext } from 'react'
import useCardRotate from '../../hooks/useCardRotate'
import { Link } from 'react-router-dom'
import { AppContext } from '../../App'
// import { UserGetData } from '../../helpers/AuthHelpers'

export default function MyAccountCard() {
	const { change } = useCardRotate()
	// const { username, setUsername, usermail, setUsermail } = useContext(AppContext)
	const { username, usermail } = useContext(AppContext)

	/* const doUserData = async () => {
		const d = await UserGetData()
		console.log('ddddd', d)
		if (d.error) console.error(d.error)
		else {
			if (d.data.user?.user_metadata.email) setUsermail(d.data.user?.user_metadata.email);
			setUsername(d.data.user?.user_metadata.screenname)
		}
	}

	useEffect(() => {
		doUserData()
	}, []) */

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
