import { useContext, useState } from 'react'
import { AppContext } from '../../App'
import { supabase } from '../../../utils/supabase'
import useCardRotate from '../../hooks/useCardRotate'
import { useNavigate } from 'react-router-dom'

const LoginCard = () => {
	const navigate = useNavigate()
	const { setUserIsLoggedIn, setUsername, setUsermail, formNotification, setFormNotification } =
		useContext(AppContext)
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const UserLogin = async (user: User) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: user.email,
			password: user.password,
		})
		return { error, data }
	}

	async function processLoginForm(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setIsLoading(true)
		const user: User = {
			email: event.currentTarget.login_email.value,
			password: event.currentTarget.login_password.value,
		}
		await UserLogin(user as User)
			.then((res) => {
				if (res.error !== null) {
					setError(res.error.message)
					setUserIsLoggedIn(false)
					setIsLoading(false)
				} else {
					setError('')
					setUserIsLoggedIn(true)
					setFormNotification('')
					setUsername(res.data.user?.user_metadata.screenname)
					setUsermail(res.data.user?.user_metadata.email)
					navigate('/loadlibrary')
				}
			})
			.catch(() => setError('Something unexpected happened, try again later.'))
	}

	const { recover, signup } = useCardRotate()

	return (
		<>
			<article className="card" id="card-login">
				<main>
					<header>
						Log in
						<sub>to continue</sub>
					</header>
					<em className="form-notification">{formNotification}</em>
					<form onSubmit={processLoginForm}>
						<label htmlFor="login_email">
							<div className="description">Email address</div>
							<input type="email" id="login_email" name="login_email" required />
						</label>
						<label htmlFor="login_password">
							<div className="description">Password</div>
							<input type="password" id="login_password" name="login_password" />
						</label>
						<div className={error !== '' ? 'dblock error' : 'dblock'}>{error}&nbsp;</div>
						<button type="submit" value="Log in" disabled={isLoading}>
							{isLoading ? 'Logging in...' : 'Log in'}
						</button>
					</form>
				</main>
				<footer>
					<button className="btn-text wauto-md nowrap" onClick={recover}>
						Forgot password
					</button>
					<button className="btn-text ta-right wauto-md nowrap" onClick={signup}>
						<span className="dnone diblock-md">New here?&nbsp;</span>Join now
					</button>
				</footer>
			</article>
		</>
	)
}
export default LoginCard
