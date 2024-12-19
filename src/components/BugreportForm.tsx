import { useState } from 'react'
// Here is an example of how you could create the fields in a TypeScript file for your bug report form:
//

// prompt:
/* 
in tsx, i want to call a php script that shows a form for a bugreport and allows the user to submit it to bugreport@mycrazyapp.com , please create the fields
- `type`, dropdown options `bug`, `suggestion`, `bug` is selected by default
- page, this uses the value of tsx variable currentpage when bug was chosen in field type
bug, shown when type is equal to bug
- textarea with the label `describe the bug`
- suggestion, shown when type is equal to suggestion, textarea with label `what would you suggest?`
`anything else?`, always shown, textarea
- `submit`, posts to a php file 

Please generate the php file that handles the form and sends the values to info@mycrazyapp.com
*/

interface FormState {
	type: string
	page?: string
	bug?: string
	suggestion?: string
	anythingElse?: string
}

const BugreportForm: React.FC = () => {
	const [formState, setFormState] = useState<FormState>({
		type: 'bug',
	})
	const [message, setMessage] = useState<string>('')

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormState({
			...formState,
			[event.target.name]: event.target.value,
		})
	}

	const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setFormState({
			...formState,
			type: event.target.value,
			[event.target.value]: '',
		})
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		fetch('ProcessBugreport.php', {
			method: 'POST',
			body: new FormData(event.target as HTMLFormElement),
		})
			.then((response) => response.text())
			.then((data) => setMessage(data))
			.catch((error) => console.error('Error:', error))
	}

	return (
		<div>
			{' '}
			<form onSubmit={handleSubmit}>
				{' '}
				<label htmlFor="type">Type:</label>{' '}
				<select id="type" name="type" value={formState.type} onChange={handleTypeChange}>
					{' '}
					<option value="bug">Bug</option> <option value="suggestion">Suggestion</option>{' '}
				</select>{' '}
				{formState.type === 'bug' && (
					<>
						<label htmlFor="page">Page:</label>{' '}
						<input id="page" name="page" value={formState.page || ''} onChange={handleInputChange} />{' '}
						<label htmlFor="bug">Describe the bug:</label>{' '}
						<textarea id="bug" name="bug" value={formState.bug || ''} onChange={handleInputChange} />
					</>
				)}{' '}
				{formState.type === 'suggestion' && (
					<>
						{' '}
						<label htmlFor="suggestion">What would you suggest?</label>{' '}
						<textarea
							id="suggestion"
							name="suggestion"
							value={formState.suggestion || ''}
							onChange={handleInputChange}
						/>{' '}
					</>
				)}{' '}
				<label htmlFor="anythingElse">Anything else?</label>{' '}
				<textarea
					id="anythingElse"
					name="anythingElse"
					value={formState.anythingElse || ''}
					onChange={handleInputChange}
				/>{' '}
				<button type="submit">Submit</button>{' '}
			</form>{' '}
			{message && <p>{message}</p>}{' '}
		</div>
	)
}

export default BugreportForm

// This code defines an interface BugReportFormProps that contains the current page number. It then creates a functional component called BugReportForm, which takes in this props and renders the form with three fields: type, page (which is set to the value of currentpage), and any other information you want to include. The form includes dropdown options for "bug" or "suggestion", as well as textareas for describing a bug or suggesting solutions. The form also has an option for including additional details if desired.
