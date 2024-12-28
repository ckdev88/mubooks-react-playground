import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import { cleanInput } from '../helpers/cleanInput'

const SuggestionsForm: React.FC = () => {
	const { userid } = useContext(AppContext)
	const [message, setMessage] = useState<string>('')

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
		// checking & sanitizing input
		// TODO checking & sanitizing also in PHP, just to be sure
		const formdata: FormData = new FormData(event.target as HTMLFormElement)
		const formdata_suggestion: string | undefined = formdata.get('suggestion')?.toString().trim()
		if (!formdata_suggestion || (formdata_suggestion && formdata_suggestion.length < 1)) return false
const formdata_anythingElse: string | undefined = formdata.get('anythingElse')?.toString().trim()
if (formdata_suggestion) formdata.set('suggestion', cleanInput(formdata_suggestion))
		if (formdata_anythingElse !== undefined) formdata.set('anythingElse', cleanInput(formdata_anythingElse))
		else formdata.set('anythingElse', '')

		fetch('ProcessSuggestion.php', {
			method: 'POST',
			body: new FormData(event.target as HTMLFormElement),
		})
			.then((response) => response.text())
			.then((data) => setMessage(data))
			.catch((error) => console.error('Error:', error))
	}

	useEffect(() => {
		document.getElementById('fsb_suggestion')?.focus()
	}, [])

	return (
		<div>
			{message === '' ? (
				<>
					<div className="h1">
						What do you think?
						<sub>Please let us know...</sub>
					</div>
					<div>
						What do you think about MuBooks, and what could make it better?
						<br />
						Please tell us anything: a request, a complaint or a suggestion, we need your help to make this app as
						friendly and helpful as possible for you.
					</div>
					<br />
					<form onSubmit={handleSubmit}>
						<label htmlFor="fsb_suggestion">
							<div className="description">Your ideas or suggestions</div>
							<textarea id="fsb_suggestion" name="suggestion" rows={5} required />
						</label>
						<label htmlFor="fsb_anythingElse">
							<div className="description">Anything else?</div>
							<textarea id="fsb_anythingElse" name="anythingElse" rows={5} />
						</label>
						<input type="hidden" name="userid" value={userid} />
						<button className="btn-lg" type="submit">
							Send
						</button>
					</form>
				</>
			) : (
				<div className="h2">{message}</div>
			)}
		</div>
	)
}

export default SuggestionsForm
