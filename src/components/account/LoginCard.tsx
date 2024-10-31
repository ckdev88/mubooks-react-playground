import { useContext, useState } from 'react'
import { AppContext } from '../../App'
import { supabase } from '../../../utils/supabase'
import useCardRotate from '../../hooks/useCardRotate'

const LoginCard = () => {
	const { setUserIsLoggedIn, setUsername, setUsermail } = useContext(AppContext)
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
				} else {
					setUserIsLoggedIn(true)
					setUsername(res.data.user?.user_metadata.screenname)
					setUsermail(res.data.user?.user_metadata.email)
				}
			})
			.catch(() => setError('Something unexpected happened, try again later.'))
			.finally(() => setIsLoading(false))
	}

	const { recover, signup } = useCardRotate()

	return (
		<>
			<article className="card" id="card-login">
				<main>
					<header>
						<div>
							Log in
							<sub>to continue</sub>
						</div>
					</header>
					<form onSubmit={processLoginForm}>
						<div className={error !== '' ? 'notification error' : 'notification'}>{error}</div>
						<label htmlFor="login_email">
							<div className="description">Email address</div>
							<input type="email" id="login_email" name="login_email" required autoComplete="username" />
						</label>
						<label htmlFor="login_password">
							<div className="description">Password</div>
							<input type="password" id="login_password" name="login_password" autoComplete="current-password" />
						</label>
						<button value="Log in" disabled={isLoading} className="btn-lg">
							{isLoading ? 'Logging in...' : 'Log in'}
						</button>
					</form>
				</main>
				<footer>
					<button className="btn-text wauto-md nowrap" onClick={recover}>
						Forgot password
					</button>
					<button className="btn-text ta-right wauto-md nowrap diblock" onClick={signup}>
						<span className="dnone diblock-md">New here?&nbsp;</span>Join now
					</button>
				</footer>
			</article>
		</>
	)
}
export default LoginCard
