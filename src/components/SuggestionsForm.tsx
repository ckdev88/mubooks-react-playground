import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import { cleanInput } from '../helpers/cleanInput'
import useResetUsermail from '../hooks/useResetUsermail'
import { isLocal } from '../Helpers'
import { Link } from 'react-router-dom'

const SuggestionsForm: React.FC = () => {
	const { userid, usermail } = useContext(AppContext)

	useResetUsermail()

	const [message, setMessage] = useState<JSX.Element>(<div></div>)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isPosted, setIsPosted] = useState<boolean>(false)
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsLoading(true)
		// checking & sanitizing input
		const formdata: FormData = new FormData(event.target as HTMLFormElement)
		const formdata_suggestion: string | undefined = formdata.get('suggestion')?.toString().trim()
		if (!formdata_suggestion || (formdata_suggestion && formdata_suggestion.length < 1)) return false
		const formdata_anythingElse: string | undefined = formdata.get('anythingElse')?.toString().trim()
		if (formdata_suggestion) formdata.set('suggestion', cleanInput(formdata_suggestion))
		if (formdata_anythingElse !== undefined) formdata.set('anythingElse', cleanInput(formdata_anythingElse))
		else formdata.set('anythingElse', '')
		formdata.append('usermail', usermail)
		formdata.append('userid', userid)

		function setSuccessMessage() {
			setMessage(
				<div>
					<div className="h2">Thank you!</div>
					<div className="sub">We look forward to reading your message.</div>
					<br />
					<blockquote
						style={{
							border: '1px solid rgba(0,0,0,.3)',
							borderRadius: '0.2rem',
							margin: 0,
							padding: '.5rem',
						}}
						className="sf"
					>
						<b>Your suggestion:</b>
						<br />
						{formdata_suggestion}
						<br />
						<br />
						<b>Anything else?</b>
						<br />
						{formdata_anythingElse !== '' ? formdata_anythingElse : 'Not right now'}
					</blockquote>
				</div>
			)
		}
		function setFailMessage($msg: string) {
			setMessage(
				<div>
					<div className="h2">Something went wrong...</div>
					<div className="sub">{$msg}</div>
				</div>
			)
		}

		if (isLocal() === true) {
			setIsPosted(true)
			setSuccessMessage()
			setIsLoading(false)
			return
		}
		fetch('ProcessSuggestion.php', {
			method: 'POST',
			body: formdata,
		})
			.then((response) => response.text())
			.then((data) => {
				setIsPosted(true)
				if (data === 'OK') setSuccessMessage()
				else setFailMessage(data)
			})
			.catch((error) => console.error('Error:', error))
			.finally(() => setIsLoading(false))
	}

	useEffect(() => {
		document.getElementById('fsb_suggestion')?.focus()
	}, [])

	return (
		<div>
			{isPosted ? (
				<>
					{message}
					<br />
					<Link className="a-text" to={'/dashboard'}>
						Return to dashboard
					</Link>
				</>
			) : (
				<>
					<div className="h1">
						What do you think?
						<sub>Please let us know...</sub>
					</div>
					<div>
						What do you think about MuBooks, and what could make it better?
						<br />
						Please tell us anything: a request, a complaint or a suggestion, we need your help to make this
						app as friendly and helpful as possible for you.
					</div>
					<br />
					<br />
					<form onSubmit={handleSubmit} className={isLoading ? 'form-loading' : ''}>
						<label htmlFor="fsb_suggestion">
							<div className="description">Your ideas or suggestions</div>
							<textarea id="fsb_suggestion" name="suggestion" rows={5} required disabled={isLoading} />
						</label>
						<label htmlFor="fsb_anythingElse">
							<div className="description">Anything else?</div>
							<textarea id="fsb_anythingElse" name="anythingElse" rows={5} readOnly={isLoading} />
						</label>
						<button className="btn-lg" type="submit" disabled={isLoading}>
							Send {isLoading && <span className="loader-dots"></span>}
						</button>
					</form>
				</>
			)}
		</div>
	)
}

export default SuggestionsForm
