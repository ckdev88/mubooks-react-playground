// import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { supabase } from '../../../utils/supabase'
// import { useContext, useState, useEffect } from 'react'
import { useState, useEffect } from 'react'
// import { AppContext } from '../../App'
import { getUrlParamVal } from '../../Helpers'
const ResetPasswordPage = () => {
	// const { username, setUsername, usermail, setUsermail } = useContext(AppContext)
	// const { setUsername, setUsermail } = useContext(AppContext)

	const [error, setError] = useState('')

	// confirm user before enable to change password
	// const [loading, setLoading] = useState(true)
	useEffect(() => {
		async function verifyTokenHash() {
			const token = getUrlParamVal(window.location.href, 'token')

			console.log('token:', token)
			const type = getUrlParamVal(window.location.href, 'type')
			console.log('type:', type)
			if (type === 'recovery' && token !== null) {
				const { data, error } = await supabase.auth.verifyOtp({
					email: 'i.likeespressoalot@gmail.com',
					token: token,
					type: type,
				})

				if (error) {
					setError(error.message)
					console.log('error:', error.message)
				} else {
					console.log('elsie, we mogen door!')
					// Store the session in local storage or cookies
					localStorage.setItem('supabaseSession', JSON.stringify(data.session))
				}
				console.log('het was goed?')
				// setLoading(false)
			}
		}
		verifyTokenHash()
	}, [])
	// /confirm user before enable to change password

	// function afterSbUpdate(name: string, mail: string) {
	// 	setUsername(name)
	// 	setUsermail(mail)
	// 	console.log('updated, redirect naar login page?')
	// 	// see()
	// }

	// const updateSbUser = async (form_username: string, form_usermail: string, form_userpass: string) => {
	// 	if (form_userpass !== '') {
	// 		const { data, error } = await supabase.auth.updateUser({
	// 			email: form_usermail,
	// 			password: form_userpass,
	// 			data: { screenname: form_username },
	// 		})
	// 		if (error) console.log('Error updating user:', error)
	// 		else {
	// 			console.log('adata', data)
	// 			afterSbUpdate(form_username, form_usermail)
	// 		}
	// 	} else {
	// 		const { data, error } = await supabase.auth.updateUser({
	// 			email: form_userpass,
	// 			data: { screenname: form_username },
	// 		})
	// 		if (error) console.log('Error updating user:', error)
	// 		else {
	// 			console.log('data after updateSbUser in MyAccountEditCard', data)
	// 			afterSbUpdate(form_username, form_usermail)
	// 		}
	// 	}
	// }

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		console.log(e.currentTarget.account_password.value)
		if (e.currentTarget.account_password.value === e.currentTarget.account_password_again.value) {
			console.log('goed!')
			// const form_username: string = e.currentTarget.account_screenname.value.trim()
			// const form_usermail: string = e.currentTarget.account_email.value.trim()
			// const form_userpass: string = e.currentTarget.account_password.value.trim()
			// updateSbUser(form_username, form_usermail, form_userpass)
		} else setError('Passwords do not match, try again')
	}
	// if (loading) {
	// 	return <p>Loading...</p>
	// }
	if (error) {
		return <p>Error: {error}</p>
	} else
		return (
			<>
				<div className="card">
					<header>
						Reset your password
						<sub>Fill in your new password twice and submit to activate it</sub>
					</header>

					<main>
						<form onSubmit={handleSubmit}>
							<label htmlFor="account_password">
								<div className="description">New password</div>
								<input type="password" id="account_password" name="account_password" defaultValue="" />
							</label>
							<label htmlFor="account_password">
								<div className="description">New password again</div>
								<input
									type="password"
									id="account_password_again"
									name="account_password_again"
									defaultValue=""
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
				<h1>Reset your password</h1>
				<p>Redirecting to the login screen...</p>
			</>
		)
}
export default ResetPasswordPage
