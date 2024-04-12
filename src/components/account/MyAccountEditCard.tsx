import useCardRotate from '../../hooks/useCardRotate'
import { supabase } from '../../../utils/supabase'
import { AppContext } from '../../App'
import { useEffect, useState, useContext } from 'react'

export default function MyAccountEditCard() {
	const { see } = useCardRotate()
	const { username, setUsername, usermail, setUsermail } = useContext(AppContext)
	const [sbUsermail, setSbUsermail] = useState<string>(usermail)
	const [sbUsername, setSbUsername] = useState<string>(username)
	const [updateError, setUpdateError] = useState<string>('')

	useEffect(() => {
		userdata()
	}, [])

	const userdata = async () => {
		const { data, error } = await supabase.auth.getUser()
		if (error) {
			console.log('error updating userdata', error)
		} else {
			if (data.user.email) setSbUsermail(data.user.email)
			setSbUsername(data.user.user_metadata?.screenname)
		}
	}
	function afterUpdateSb(name: string, mail: string) {
		setUsername(name)
		setUsermail(mail)
		setSbUsername(name)
		setSbUsermail(mail)
		see()
	}
	async function updateUser(form_username: string, form_usermail: string, form_userpass: string) {
		if (form_userpass !== '') {
			// TODO: ugly conditional, make nice
			const { error } = await supabase.auth.updateUser({
				email: form_usermail,
				password: form_userpass,
				data: { screenname: form_username },
			})
			if (error) return { error }
			else afterUpdateSb(form_username, form_usermail)
		} else {
			const { error } = await supabase.auth.updateUser({
				email: form_usermail,
				data: { screenname: form_username },
			})
			if (error) return { error }
			else afterUpdateSb(form_username, form_usermail)
		}
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const form_username: string = e.currentTarget.account_screenname.value.trim()
		const form_usermail: string = e.currentTarget.account_email.value.trim()
		const form_userpass: string = e.currentTarget.account_password.value.trim()
		const update = await updateUser(form_username, form_usermail, form_userpass)
		if (update?.error) setUpdateError(update.error.message)
	}

	return (
		<>
			<div className="card">
				<header>My account</header>
				<main>
					<form onSubmit={handleSubmit}>
						<label>Screen name</label>
						<input
							type="text"
							id="account_screenname"
							name="account_screenname"
							defaultValue={sbUsername}
						/>
						<label htmlFor="account_email">Email address</label>
						<input
							type="email"
							id="account_email"
							name="account_email"
							defaultValue={sbUsermail}
						/>
						<label htmlFor="account_password">
							Password (leave empty to keep current)
						</label>
						<input
							type="password"
							id="account_password"
							name="account_password"
							defaultValue=""
						/>
						<div className={updateError !== '' ? 'dblock error' : 'dnone'}>{updateError}</div>
						<button>Save and return</button>
					</form>
				</main>
				<footer>
					<a onClick={see}>Return without saving</a>
				</footer>
			</div>
		</>
	)
}
