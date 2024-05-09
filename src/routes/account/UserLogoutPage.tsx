import { useContext, useEffect } from 'react'
import { AppContext } from '../../App'
import { supabase } from '../../../utils/supabase'
import { useNavigate } from 'react-router-dom'

export default function UserLogoutPage() {
	const { setUserIsLoggedIn } = useContext(AppContext)
	const navigate = useNavigate()

	async function dologout() {
		await supabase.auth
			.signOut()
			.then(() => {
				localStorage.clear()
				setUserIsLoggedIn(false)
			})
			.finally(() => {
				setTimeout(() => {
					navigate('/account/login')
				}, 1000)
			})
	}
	useEffect(() => {
		dologout()
	}, [])

	return (
		<>
			<h1>Logging out.</h1>
			<p>Redirecting to login page...</p>
		</>
	)
}
