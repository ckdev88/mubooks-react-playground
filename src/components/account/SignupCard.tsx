import { useState } from 'react'
import useCardRotate from '../../hooks/useCardRotate'
import { UserSignup } from '../../hooks/AuthHelpers'
import { useNavigate } from 'react-router-dom'

export default function SignupCard() {
	const navigate = useNavigate()
	const { login } = useCardRotate()
	const [error, setError] = useState('')

	async function processSignupForm(event: any) {
		event.preventDefault()
		const user: User = {
			email: event.target.email.value,
			screenname: event.target.screenname.value,
			password: event.target.password.value,
		}
		const signup = await UserSignup(user)

		if (signup.error) setError(signup.error.message)
		else navigate(`/account/new?addr=${user.email}`) // beetje unsafe dit, beter via sessie of api
	}

	return (
		<>
			<article className="card" id="card-signup">
				<header>Create an account</header>
				<main>
					<form onSubmit={processSignupForm}>
						<label htmlFor="screenname">Screen name</label>
						<input type="text" id="signup-screenname" name="screenname" />
						<label htmlFor="email">Email address: *</label>
						<input type="email" id="signup-email" name="email" required />
						<label htmlFor="password">Password: *</label>
						<input type="password" id="signup-password" name="password" required />
						<div className={error !== '' ? 'dblock error' : 'dnone'}>{error}</div>
						<button>Create</button>
					</form>
				</main>
				<footer className="content-right">
					<a onClick={login}>Already have an account.</a>
				</footer>
			</article>
		</>
	)
}
