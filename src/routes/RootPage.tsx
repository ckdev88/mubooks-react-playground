import NavWrapper from '../components/NavWrapper'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const RootPage = (loggedin: boolean) => {
	const navigate = useNavigate()

	useEffect(() => {
		if (loggedin) navigate('/dashboard')
		else navigate('/account/login')
	}, [])

	return (
		<>
			<header id="header"><NavWrapper /></header>
			<main id="main">Redirecting to wherever you should be right now.</main>
			<footer id="footer">Y'know?</footer>
		</>
	)
}
export default RootPage
