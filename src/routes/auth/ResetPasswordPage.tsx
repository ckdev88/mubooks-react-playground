import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../../utils/supabase'
import { useState, useEffect, useContext } from 'react'
import { getUrlParamVal } from '../../Helpers'
import { AppContext } from '../../App'

const pageTitle = 'Reset password page'

const ResetPasswordPage = () => {
	const { userIsLoggedIn, setPopupNotification, setPopupNotificationShow, setNavTitle } = useContext(AppContext)

	useEffect(() => {
		setNavTitle(pageTitle)
	}, [setNavTitle])

	const navigate = useNavigate()
	const [error, setError] = useState('')

	if (userIsLoggedIn) navigate('/dashboard')

	const [loading, setLoading] = useState(true)

	async function verifyTokenHash() {
		const token = getUrlParamVal(window.location.href, 'token')
		const type = getUrlParamVal(window.location.href, 'type')
		const email = getUrlParamVal(window.location.href, 'email')
		if (type === 'recovery' && token !== null) {
			const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })
			if (error) {
				setError(error.message)
			} else {
				localStorage.setItem('supabaseSession', JSON.stringify(data.session))
			}
			setLoading(false)
		}
	}
	useEffect(() => {
		if (loading) {
			/* TODO: check of verifyTokenHash echt nodig is, lijkt namelijk alleen nodig bij iets als <a href="{{ .ConfirmationURL }}mubooks/#/auth/resetpassword?token={{.TokenHash}}&type=recovery"> Click here</a> to reset your password.</p>, waar we ook echt iets doen met de meegegeven properties... wat we nu niet doen volgens mij
			 */
			// "{{ .RedirectTo }}mubooks/#/auth/resetpassword?token={{ .Token }}&type=recovery&email={{ .Email }}" is een ander voorbeeld van een url die wellicht onnodig is.
			verifyTokenHash()
			setLoading(false)
		}
	}, [loading])

	function afterSbUpdate() {
		setTimeout(() => navigate('/dashboard'), 1000)
	}

	// resetpassword
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
				<h1 id="welcome">
					<img id="welcome-logo-img" src="img/logo.svg" alt="" /> MuBooks
				</h1>
				<div>
					<div className="card">
						<header>
							Reset your password
							<sub>Fill in your new password twice and submit to activate it</sub>
						</header>
						<main>
							<form onSubmit={handleSubmit}>
								<label htmlFor="account_password">
									<div className="description">New password</div>
									<input
										type="password"
										id="account_password"
										name="account_password"
										defaultValue=""
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
										required
									/>
								</label>
								<div className={error !== '' ? 'dblock error' : 'dblock'}>{error}&nbsp;</div>
								<button>Save new password and login</button>
							</form>
						</main>
						<footer>
							<Link to="/account/login">Login without changing password.</Link>
						</footer>
					</div>
				</div>
				{/*
					 <h1>Reset your password</h1>
				<p>Redirecting to the login screen...</p>
			   */}
			</>
		)
	}
}
export default ResetPasswordPage
