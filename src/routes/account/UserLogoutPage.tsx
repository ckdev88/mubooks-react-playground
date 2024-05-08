import { useContext, useEffect } from 'react'
import { AppContext } from '../../App'

export default function UserLogoutPage() {
	const { setUserIsLoggedIn } = useContext(AppContext)
	useEffect(() => setUserIsLoggedIn(false), [])

	return (
		<>
			<h1>Logging out.</h1>
			<p>Redirecting to login page...</p>
		</>
	)
}
