import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import { supabase } from '../../../utils/supabase'
import useCardRotate from '../../hooks/useCardRotate'
import { useNavigate } from 'react-router-dom'

const LoginCard = () => {
	const navigate = useNavigate()
	const { setUserIsLoggedIn, setUsername, setUsermail, setUserMyBooks } = useContext(AppContext)
	const [error, setError] = useState('')

	// TODO: either user of remove useAuthUserLogin(user) references

	const UserLogin = async (user: User) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: user.email,
			password: user.password,
		})
		return { error, data }
	}

	async function processLoginForm(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const user: User = {
			email: event.currentTarget.loginemail.value,
			password: event.currentTarget.loginpassword.value,
		}
		await UserLogin(user as User)
			.then((res) => {
				if (res.error !== null) {
					setError(res.error.message)
					setUserIsLoggedIn(false)
				} else {
					setError('')
					setUserIsLoggedIn(true)
					setUsername(res.data.user?.user_metadata.screenname)
					setUsermail(res.data.user?.user_metadata.email)
					if (res.data.user?.user_metadata.MyBooks) setUserMyBooks(res.data.user.user_metadata.MyBooks)
					navigate('/dashboard')
				}
			})
			.catch(() => setError('Something unexpected happened, try again later.'))
			.finally(() => console.log('Logged in!'))
	}

	const { recover, signup } = useCardRotate()
	useEffect(() => document.getElementById('loginemail')?.focus(), [])

	return (
		<>
			<article className="card" id="card-login">
				<main>
					<header>
						Log in
						<sub>to continue</sub>
					</header>
					<form onSubmit={processLoginForm}>
						<label htmlFor="login-email">Email address</label>
						<input type="email" id="loginemail" name="loginemail" required />
						<label htmlFor="login-password">Password</label>
						<input type="password" id="loginpassword" name="loginpassword" />
						<div className={error !== '' ? 'dblock error' : 'dblock'}>{error}&nbsp;</div>
						<input type="submit" value="Log in" />
					</form>
				</main>
				<footer>
					<button className="btn-text" onClick={recover}>
						Forgot password
					</button>
					<button className="btn-text ta-right" onClick={signup}>
						New here? Join now
					</button>
				</footer>
			</article>
		</>
	)
}
export default LoginCard
