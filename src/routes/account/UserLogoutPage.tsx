import { useContext, useEffect } from 'react'
import { AppContext } from '../../App'
import { supabase } from '../../../utils/supabase'
import { useNavigate } from 'react-router-dom'

export default function UserLogoutPage() {
	const { setUserIsLoggedIn } = useContext(AppContext)
	const navigate = useNavigate()

	useEffect(() => {
		const doLogout = async () => {
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
		doLogout()
	}, [setUserIsLoggedIn, navigate])

	return (
		<>
			<div className="h1">Logging out.</div>
			<p>Redirecting to login page...</p>
		</>
	)
}
