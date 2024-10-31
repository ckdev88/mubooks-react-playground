import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../../utils/supabase'
import { useState, useEffect, useContext } from 'react'
import { getUrlParamVal } from '../../Helpers'
import { AppContext } from '../../App'
import HeaderBranding from '../../components/HeaderBranding'

const ResetPasswordPage = () => {
	const { userIsLoggedIn, setPopupNotification, setPopupNotificationShow } = useContext(AppContext)

	const navigate = useNavigate()
	const [error, setError] = useState('')

	if (userIsLoggedIn) navigate('/dashboard#434334')

	const [loading, setLoading] = useState(true)

	async function verifyTokenHash(): Promise<void> {
		const token = getUrlParamVal(window.location.href, 'token')
		const type = getUrlParamVal(window.location.href, 'type')
		const email = getUrlParamVal(window.location.href, 'email')
		console.log('verifyTokenHash started', token, type, email)
		if (type === 'recovery' && token !== null) {
			console.log('verifyTokenHash verified yesyesyes 1337331')
			const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })
			if (error) setError(error.message)
			else localStorage.setItem('supabaseSession', JSON.stringify(data.session))
		}
	}
	useEffect(() => {
		if (loading) {
			/* TODO: check of verifyTokenHash echt nodig is, lijkt namelijk alleen nodig bij iets als <a href="{{ .ConfirmationURL }}mubooks/#/auth/resetpassword?token={{.TokenHash}}&type=recovery"> Click here</a> to reset your password.</p>, waar we ook echt iets doen met de meegegeven properties... wat we nu niet doen volgens mij
			 */
			verifyTokenHash().then(() => setLoading(false))
		}
	}, [loading])

	function afterSbUpdate() {
		setTimeout(() => navigate('/dashboard'), 1000) // TODO check if used
	}

	const updateSbUser = async (form_userpass: string) => {
		const { error } = await supabase.auth.updateUser({
			password: form_userpass,
		})
		if (error) setError(error.message)
		else {
			setPopupNotification('Password updated...')
			setPopupNotificationShow(true)
			setTimeout(() => afterSbUpdate(), 800)
		}
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (e.currentTarget.account_password.value === e.currentTarget.account_password_again.value) {
			const form_userpass: string = e.currentTarget.account_password.value.trim()
			updateSbUser(form_userpass)
		} else setError('Passwords do not match, try again')
	}

	if (loading) return <p>Loading...</p>
	else {
		return (
			<>
				<HeaderBranding />
				<div>
					<div className="card">
						<header>
							<div>
								Reset your password
								<sub>Fill in new password twice and activate it</sub>
							</div>
						</header>
						<main>
							<form onSubmit={handleSubmit}>
								<div className={error !== '' ? 'notification error' : 'notification'}>{error}</div>
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
								<button className="btn-lg">Save new password and login</button>
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
}
export default ResetPasswordPage
