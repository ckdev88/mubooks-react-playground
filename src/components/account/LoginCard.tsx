import { useContext, useState } from 'react'
import { AppContext } from '../../App'
// import { UserLogin } from '../../helpers/AuthHelpers'
import { supabase } from '../../../utils/supabase'
import useCardRotate from '../../hooks/useCardRotate'
import { useNavigate } from 'react-router-dom'

const LoginCard = () => {
	const navigate = useNavigate()
	const {
		setUsername,
		setUsermail,
		setUserMyBooks,
		userIsLoggedIn,
		setUserIsLoggedIn,
		setPopupNotificationShow,
		setPopupNotification,
	} = useContext(AppContext)
	const [error, setError] = useState('')

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
		const login = await UserLogin(user as User)
		if (login.error) {
			setError(login.error.message)
		} else {
			if (login?.data) {
				setUserIsLoggedIn(true)
				setUsername(login?.data.user?.user_metadata.screenname)
				setUsermail(login?.data.user?.user_metadata.email)
				localStorage.setItem('MyBooks', login?.data.user?.user_metadata.MyBooks)
				setUserMyBooks(localStorage.getItem('MyBooks') as string)
				setTimeout(() => {
					navigate('/dashboard')
				}, 100)
			} else setError('Something unexpected happened, try again later.')
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
					<button className="btn-text" onClick={recover}>
						Forgot password
					</button>
					<button className="btn-text ta-right" onClick={signup}>
						New here? Join now.
					</button>
				</footer>
			</article>
		</>
	)
}
export default LoginCard
