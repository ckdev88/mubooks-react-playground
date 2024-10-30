import { useContext, useEffect } from 'react'
import { AppContext } from '../../App'
import { Link, redirect } from 'react-router-dom'

const pageTitle = 'Check your mailbox'
// const currentPage = 'favorites'

const CheckMailPasswordPage = () => {
	const { usermail, userIsLoggedIn } = useContext(AppContext)
	const recipientAddress = usermail

	useEffect(() => {
		if (userIsLoggedIn) redirect('/dashboard')
	}, [userIsLoggedIn])

	if (usermail !== '' && !userIsLoggedIn) {
		return (
			<>
				<h1>{pageTitle}</h1>
				<p>
					<span>You should receive an email on</span>{' '}
					<strong>
						<u>{recipientAddress}</u>
					</strong>
					<span> containing a link to reset your password, click it.</span>
				</p>
			</>
		)
	} else if (userIsLoggedIn) {
		return (
			<>
				<h1>Not so fast!</h1>
				<p>
					You're already logged in, do you want to <Link to="/dashboard">return to your dashboard</Link> or
					see <Link to="/account/profile">your profile here</Link>?
				</p>
			</>
		)
	} else {
		return (
			<>
				<h1>New here?</h1>
				<p>
					Are you trying to reset your password or log in?
					<br />
					<Link to="/account/login">Click here to log in or join</Link>.
				</p>
			</>
		)
	}
}
export default CheckMailPasswordPage
