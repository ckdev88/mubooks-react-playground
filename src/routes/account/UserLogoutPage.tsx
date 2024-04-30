import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { supabase } from '../../../utils/supabase'

export default function UserLogoutPage() {
	const { setUserIsLoggedIn } = useContext(AppContext)
	const navigate = useNavigate()

	async function dologout():Promise<void> {
		await supabase.auth.signOut()
	}

	useEffect(() => {
		dologout()
		localStorage.clear()
		setUserIsLoggedIn(false)
		navigate('/account/login')
	}, [])

	return (
		<>
			<h1>Logging out.</h1>
			<p>Redirecting to login page...</p>
		</>
	)
}
