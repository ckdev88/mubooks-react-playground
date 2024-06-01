import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../../utils/supabase'
import { useState, useEffect, useContext } from 'react'
import { getUrlParamVal } from '../../Helpers'
import { AppContext } from '../../App'

const ResetPasswordPage = () => {
	const { setPopupNotification, setPopupNotificationShow } = useContext(AppContext)
	const navigate = useNavigate()
	console.log('arrived in ResetPasswordPage')
	const [error, setError] = useState('')

	// confirm user before enable to change password
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		async function verifyTokenHash() {
			const token = getUrlParamVal(window.location.href, 'token')

			console.log('token_hash:', token)
			const type = getUrlParamVal(window.location.href, 'type')
			console.log('type:', type)
			const email = getUrlParamVal(window.location.href, 'email')
			console.log('email:', email)
			if (type === 'recovery' && token !== null) {
				const { data, error } = await supabase.auth.signInWithOtp({
					email: email,
				})
				if (error) {
					setError(error.message)
					console.log('error:', error.message, error.code, error.name, error.name)
				} else {
					console.log('elsie, we mogen door!')
					// Store the session in local storage or cookies
					localStorage.setItem('supabaseSession', JSON.stringify(data.session))
				}
				setLoading(false)
			}
		}
		verifyTokenHash()
	}, [])
	// /confirm user before enable to change password

	function afterSbUpdate() {
		console.log('updated, naar de login page om in te loggen met nieuwe password')
		setTimeout(() => {
			setPopupNotification('')
			setPopupNotificationShow(false)
			navigate('/account/login')
		}, 1000)
	}

	const updateSbUser = async (form_userpass: string) => {
		const { data, error } = await supabase.auth.updateUser({
			password: form_userpass,
		})
		if (error) console.log('Error updating user:', error)
		else {
			setPopupNotification('Password is re-set, you can now log in')
			setPopupNotificationShow(true)
			console.log('adata', data)
			afterSbUpdate()
		}
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		console.log(e.currentTarget.account_password.value)
		if (e.currentTarget.account_password.value === e.currentTarget.account_password_again.value) {
			console.log('goed!')
			const form_userpass: string = e.currentTarget.account_password.value.trim()
			updateSbUser(form_userpass)
		} else setError('Passwords do not match, try again')
	}

	if (loading) {
		return <p>Loading...</p>
	} else
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
export default ResetPasswordPage
