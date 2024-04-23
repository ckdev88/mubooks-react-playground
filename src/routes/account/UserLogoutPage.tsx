import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from "react"
import { AppContext } from '../../App'
import { supabase } from '../../../utils/supabase'

const UserLogout = async () => {
	let { error } = await supabase.auth.signOut()
	if (error === null) {
		console.log('logged out')
	} else {
		return error
	}
	return error
}
export default function UserLogoutPage() {
	const { setUserIsLoggedIn } = useContext(AppContext)
	const navigate = useNavigate()
	async function processLogout() {
		setUserIsLoggedIn(false)
		UserLogout()
		// TODO: for now we assume there are no errors... this will need to change

		setTimeout(() => {
			navigate('/account/login')
		}, 600)
	}
	useEffect(() => { processLogout() }, [])

	return (
		<>
			<h1>Logging out.</h1>
			<p>
				Redirecting to login page...
			</p>
		</>
	)
}
