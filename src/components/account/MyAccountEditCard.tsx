import useCardRotate from '../../hooks/useCardRotate'
import { AppContext } from '../../App'
import { useContext } from 'react'
import { UserGetData, UserUpdate } from '../../hooks/AuthHelpers'

export default function MyAccountEditCard() {
	const { see } = useCardRotate()
	const { username, setUsername, usermail, setUsermail } = useContext(AppContext)

	async function doUserData() {
		const userGetData = await UserGetData()
		if (userGetData.error !== null) {
			console.log('error fetching userdata...', userGetData.error)
		} else {
			const d = userGetData.data.user
			if (d !== null) {
				if (d.email !== null && d.email !== undefined) setUsermail(d.email)
				setUsername(d.user_metadata?.screenname)
			}
		}
	}
	doUserData()

	function afterUpdateSb(name: string, mail: string) {
		setUsername(name)
		setUsermail(mail)
		see()
	}

	const updateUser = async (form_username: string, form_usermail: string, form_userpass: string) => {
		const updater = await UserUpdate(form_username, form_usermail, form_userpass)
		if (!updater.error) afterUpdateSb(form_username, form_usermail)
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const form_username: string = e.currentTarget.account_screenname.value.trim()
		const form_usermail: string = e.currentTarget.account_email.value.trim()
		const form_userpass: string = e.currentTarget.account_password.value.trim()
		updateUser(form_username, form_usermail, form_userpass)
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
							defaultValue={username}
						/>
						<label htmlFor="account_email">Email address</label>
						<input type="email" id="account_email" name="account_email" defaultValue={usermail} />
						<label htmlFor="account_password">Password (leave empty to keep current)</label>
						<input type="password" id="account_password" name="account_password" defaultValue="" />
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
