import useCardRotate from '../../hooks/useCardRotate'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../utils/supabase'

const RecoverCard = () => {
	const navigate = useNavigate()
	const { login } = useCardRotate()

	function processRecoverForm(event: any) {
		event.preventDefault()
		const email: string = event.target.email.value
		recoverAccount(email)
	}

	async function recoverAccount(email: string) {
		console.log('recovering..')
		let { error } = await supabase.auth.resetPasswordForEmail(email)
		if (error) console.log(error)
		else {
			navigate(`/account/checkmail?addr=${email}`)
		}
	}

	return (
		<>
			<article className="card" id="card-recover">
				<header>
					<img src="/img/recover-icon.png" width="82" height="82" alt="" className="recover-icon" />
					Forgot your password? <br />
					<span className='sub'>Don't worry. Let's reset it.</span>
				</header>
				<main>
					<form onSubmit={processRecoverForm}>
						<label htmlFor="recover-email">Email address: *</label>
						<input type="email" id="recover-email" name="email" required />
						<p>We'll send a link to this email address if it matches an existing account.</p>
						<button type="submit">Send me a password reset link</button>
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
