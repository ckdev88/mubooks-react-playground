import useCardRotate from '../../hooks/useCardRotate'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../utils/supabase'
import { useState, useContext } from 'react'
import { AppContext } from '../../App'
import Heading from '../ui/Heading'

const RecoverCard = () => {
	const { setUsermail, userIsLoggedIn } = useContext(AppContext)
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const { login } = useCardRotate()
	const [isLoading, setIsLoading] = useState(false)

	function processRecoverForm(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const email: string = event.currentTarget.email.value
		recoverAccount(email)
	}

	async function recoverAccount(email: string) {
		setIsLoading(true)
		const { error } = await supabase.auth.resetPasswordForEmail(email)
		if (error) setError(error.message)
		else {
			setUsermail(email)
			setIsLoading(false)
			if (userIsLoggedIn) navigate('/dashboard')
			else navigate('/account/forgotpassword')
		}
	}

	return (
		<>
			<article className="card" id="card-recover">
				<header>
					<Heading text="Forgot your password?" sub="Don't worry. Let's reset it." />
					<img src="/img/recover-icon.png" width="82" height="82" alt="" className="recover-icon" />
				</header>
				<main>
					<form onSubmit={processRecoverForm} className={isLoading ? 'form-loading' : ''}>
						<label htmlFor="recover_email">
							<div className="description">Email address: *</div>
							<input
								type="email"
								id="recover_email"
								name="email"
								required
								autoComplete="email"
								readOnly={isLoading}
							/>
						</label>
						<p>We'll send a link to this email address if it matches an existing account.</p>
						<div className={error !== '' ? 'dblock error' : 'dblock'}>{error}&nbsp;</div>
						<button disabled={isLoading} className="btn-lg">
							Send me a password reset link {isLoading && <span className="loader-dots"></span>}
						</button>
					</form>
				</main>
				<footer>
					<button onClick={login} className="btn-text">
						Back to login
					</button>
				</footer>
			</article>
		</>
	)
}
export default RecoverCard
