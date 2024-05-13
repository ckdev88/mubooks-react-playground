import { useEffect, useState } from 'react'
import useCardRotate from '../../hooks/useCardRotate'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { supabase } from '../../../utils/supabase'

async function userSignup(user: User) {
	const signup = await supabase.auth.signUp(user)
	return signup
}

export default function SignupCard() {
	const { setUsermail } = useContext(AppContext)
	const navigate = useNavigate()
	const { login } = useCardRotate()
	const [error, setError] = useState('')

	async function processSignupForm(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const user: User = {
			email: event.currentTarget.email.value,
			screenname: event.currentTarget.screenname.value,
			password: event.currentTarget.password.value,
		}
		const signup = await userSignup(user)

		if (signup.error) setError(signup.error.message)
		else {
			setUsermail(user.email)
			navigate(`/account/new?addr=${user.email}`) // TODO: beetje unsafe dit, beter via sessie of api
		}
	}

	return (
		<>
			<article className="card" id="card-signup">
				<header>Let's create an account</header>
				<main>
					<form onSubmit={processSignupForm}>
						<label htmlFor="screenname">Screen name</label>
						<label htmlFor="email">Email address: *</label>
						<label htmlFor="password">Password: *</label>
							<input type="text" id="signup_screenname" name="screenname" />
							<input type="email" id="signup_email" name="email" required />
							<input type="password" id="signup_password" name="password" required />
						<div className={error !== '' ? 'dblock error' : 'dblock'}>{error}&nbsp;</div>
						<button>Create account</button>
					</form>
				</main>
				<footer className="content-right">
					<button className="btn-text" onClick={login}>
						I already have an account
					</button>
				</footer>
			</article>
		</>
	)
}
