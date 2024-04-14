import NavWrapper from '../components/NavWrapper'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { localStorageKey } from '../../utils/supabase'

const RootPage = () => {
	let loggedin: boolean = false
	const navigate = useNavigate()

	if (JSON.parse(localStorage.getItem(localStorageKey) as string)?.user?.aud === 'authenticated')
		loggedin = true

	let navigateTo: string = '/account/login'
	if (loggedin) navigateTo = '/dashboard'

	useEffect(() => {
		if (loggedin) navigate(navigateTo)
		else navigate(navigateTo)
	}, [])

	return (
		<>
			<header id="header">
				<NavWrapper />
			</header>
			<main id="main" className="textwrapper">
				<div className="textwrapper">
					Redirecting to wherever you should be right now...
					<br />
					<Link to={navigateTo}>Click here</Link> if you're not redirected automatically.
				</div>
			</main>
		</>
	)
}
export default RootPage
