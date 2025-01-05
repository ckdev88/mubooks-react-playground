import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../../utils/supabase'
import { useState, useContext } from 'react'
import { AppContext } from '../../App'
import HeaderBranding from '../../components/HeaderBranding'
import Heading from '../../components/ui/Heading'
import { localStorageKey } from '../../../utils/supabase'

const ResetPasswordPage = () => {
	const { userIsLoggedIn, setPopupNotification, setPopupNotificationShow } = useContext(AppContext)

	const navigate = useNavigate()
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState<boolean>(false)

	if (userIsLoggedIn) navigate('/dashboard')

	const updateSbUser = async (form_userpass: string) => {
		const { error } = await supabase.auth.updateUser({
			password: form_userpass,
		})
		if (error) setError(error.message)
		else {
			setPopupNotification('Password updated...')
			setPopupNotificationShow(true)
			setTimeout(() => navigate('/dashboard'), 800)
		}
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		// TODO double check if this really helps autocompleting username/password on submit of changing
		const emailaddress = JSON.parse(localStorage.getItem(localStorageKey) as string).user.email
		e.currentTarget.username.value = emailaddress

		if (e.currentTarget.account_password.value === e.currentTarget.account_password_again.value) {
			setIsLoading(true)
			const form_userpass: string = e.currentTarget.account_password.value.trim()
			updateSbUser(form_userpass).finally(() => setIsLoading(false))
		} else setError('Passwords do not match, try again')
	}

	return (
		<>
			<HeaderBranding />
			<div>
				<div className="card">
					<header>
						<Heading text="Reset your password" sub="Fill in new password twice and activate it" />
					</header>
					<main>
						<form onSubmit={handleSubmit} className={isLoading ? 'form-loading' : ''}>
							<div className={error !== '' ? 'notification error' : 'notification'}>{error}</div>
							<input type="hidden" name="username" autoComplete="username" />
							<label htmlFor="account_password">
								<div className="description">New password</div>
								<input
									type="password"
									id="account_password"
									name="account_password"
									defaultValue=""
									autoComplete="new-password"
									required
								/>
							</label>
							<label htmlFor="account_password">
								<div className="description">New password again</div>
								<input
									type="password"
									id="account_password_again"
									name="account_password_again"
									defaultValue=""
									autoComplete="new-password"
									required
								/>
							</label>
							<button className="btn-lg" disabled={isLoading}>
								Save new password and login
							</button>
						</form>
					</main>
					<footer>
						<Link className="btn-text" to="/account/login">
							Login without changing password.
						</Link>
					</footer>
				</div>
			</div>
		</>
	)
}

export default ResetPasswordPage
