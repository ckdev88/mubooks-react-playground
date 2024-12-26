import { useState, useContext } from 'react'
import { AppContext } from '../App'

interface FormState {
	type: string
	suggestion?: string
	anythingElse?: string
	userid: string
	username?: string
}

const BugreportForm: React.FC = () => {
	const { userid } = useContext(AppContext)
	const [formState, setFormState] = useState<FormState>({
		type: 'suggestion',
		userid: userid,
	})
	const [message, setMessage] = useState<string>('')

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormState({
			...formState,
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		console.log('handling submission...')
		event.preventDefault()
		fetch('ProcessBugreport.php', {
			method: 'POST',
			body: new FormData(event.target as HTMLFormElement),
		})
			.then((response) => {
				return response.text()
			})
			.then((data) => {
				if (data !== undefined) setMessage(data)
			})
			.catch((error) => console.error('Error:', error))
	}

	return (
		<div>
			{message === '' ? (
				<>
					<form onSubmit={handleSubmit}>
						<label htmlFor="fsb_suggestion">
							<div className="description">Please, let us know your ideas.</div>
							<textarea
								id="fsb_suggestion"
								name="suggestion"
								value={formState.suggestion || ''}
								onChange={handleInputChange}
								rows={5}
							/>
						</label>
						<label htmlFor="fsb_anythingElse">
							<div className="description">Anything else?</div>
							<textarea
								id="fsb_anythingElse"
								name="anythingElse"
								value={formState.anythingElse || ''}
								onChange={handleInputChange}
								rows={5}
							/>
						</label>
						<input type="hidden" name="userid" value={userid} />
						<button className="btn-lg" type="submit">
							Submit
						</button>
					</form>
				</>
			) : (
				<div className="h2">{message}</div>
			)}
		</div>
	)
}

export default BugreportForm

// This code defines an interface BugReportFormProps that contains the current page number. It then creates a functional component called BugReportForm, which takes in this props and renders the form with three fields: type, page (which is set to the value of currentpage), and any other information you want to include. The form includes dropdown options for "bug" or "suggestion", as well as textareas for describing a bug or suggesting solutions. The form also has an option for including additional details if desired.
