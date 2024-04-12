import { useNavigate } from 'react-router-dom'
import useCardRotate from '../../hooks/useCardRotate'
import UserLogin from '../../stores/UserLogin'
import { useContext, useState } from "react"
import { AppContext } from '../../App'

const LoginCard = () => {
	const navigate = useNavigate()
	const { setUsername, setUserMyBooks, setUserIsLoggedIn } = useContext(AppContext)
	const [error, setError] = useState('')

	async function processLoginForm(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const user: User = {
			email: event.currentTarget.loginemail.value,
			password: event.currentTarget.loginpassword.value,
		}
		const login = await UserLogin(user as User)
		if (login?.error) {
			setError(login.error.message)
		}
		if (login?.data) {
			setUserIsLoggedIn(true)
			setUsername(login?.data.user?.user_metadata.screenname)
			localStorage.setItem('MyBooks', login?.data.user?.user_metadata.MyBooks)
			setUserMyBooks(localStorage.getItem('MyBooks') as string)
			setTimeout(() => {
				navigate('/dashboard')
			}, 600)
		}

	}

	const { recover, signup } = useCardRotate()
	return (
		<>
			<article className="card" id="card-login">
				<main>
					<header>Log in</header>
					<form onSubmit={processLoginForm}>
						<label htmlFor="login-email">Email</label>
						<input type="email" id="loginemail" name="loginemail" required />
						<label htmlFor="login-password">Password</label>
						<input type="password" id="loginpassword" name="loginpassword" />
						<div className={error !== '' ? 'dblock error' : 'dnone'}>{error}</div>
						<button>Log in</button>
					</form>
				</main>
				<footer>
					<a onClick={recover}>Forgot password</a>
					<a onClick={signup}>New here? Join now.</a>
				</footer>
			</article>
		</>
	)
}
export default LoginCard
