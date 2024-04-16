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
		let { data, error } = await supabase.auth.resetPasswordForEmail(email)
		if (error) console.log(error)
		else {
			console.log('data:', data)
			navigate(`/account/checkmail?addr=${email}`)
		}
	}

	return (
		<>
			<article className="card" id="card-recover">
				<img src="/img/recover-icon.png" width="82" height="82" alt="" className="recover-icon" />
				<header>Forgot your password? Don't worry. Let's get it back.</header>
				<main>
					<form onSubmit={processRecoverForm}>
						<label htmlFor="recover-email">Email address: *</label>
						<input type="email" id="recover-email" name="email" required />
						<p>We'll send a link to this email if it matches an existing account.</p>
						<button type="submit">Next</button>
					</form>
				</main>
				<footer>
					<button onClick={login} className="alt">
						Back
					</button>
				</footer>
			</article>
		</>
	)
}
export default RecoverCard
