import { useContext, useEffect } from 'react'
import { AppContext } from '../../App'
import { Link, redirect } from 'react-router-dom'
import HeaderBranding from '../../components/HeaderBranding'

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
				<HeaderBranding />
				<div className="h1">{pageTitle}</div>
				<p>
					You should receive an email on <span className="bu">{recipientAddress}</span>&nbsp; 
					containing a link to reset your password, click it.
				</p>
			</>
		)
	} else if (userIsLoggedIn) {
		return (
			<>
				<HeaderBranding />
				<div className="h1">Not so fast!</div>
				<p>
					You're already logged in, do you want to <Link to="/dashboard">return to your dashboard</Link> or see
					<Link to="/account/profile">your profile here</Link>?
				</p>
			</>
		)
	} else {
		return (
			<>
				<HeaderBranding />
				<div className="h1">New here?</div>
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
