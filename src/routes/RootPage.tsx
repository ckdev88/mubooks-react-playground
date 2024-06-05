import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { localStorageKey } from '../../utils/supabase'
import { useContext } from 'react'
import { AppContext } from '../App'
import { getUrlParamVal } from '../Helpers'

const RootPage = () => {
	const { setUsermail, setUserIsLoggedIn, userIsLoggedIn } = useContext(AppContext)
	let loggedin: boolean = false
	const navigate = useNavigate()

	const userInLs = JSON.parse(localStorage.getItem(localStorageKey) as string)
	console.log('userInLs:', userInLs)
	console.log('localStorageKey', localStorageKey)
	if (userInLs?.user?.aud === 'authenticated') {
		loggedin = true
		setUserIsLoggedIn(true)
	}

	// TODO: cause not being able to fix resetpassword page?
	console.log('zijn we hier?')
	let navigateTo: string = '/account/login'

	if (loggedin) {
		if (getUrlParamVal(window.location.href, 'type') === 'recover') navigateTo = '/auth/resetpassword'
		navigateTo = '/dashboard'
	}

	useEffect(() => {
		const userInLs2 = JSON.parse(localStorage.getItem(localStorageKey) as string)
		console.log('userInLs2:', userInLs2)
		console.log('localStorageKey', localStorageKey)

		if (loggedin) {
			console.log('effect logged in in RootPage')
			setUsermail(userInLs.user.email)
			navigate(navigateTo)
		} else {
			if (userIsLoggedIn) {
				console.log('we zijn logged in zegt userIsLoggedIn')
				setUserIsLoggedIn(true)
			} else console.log('oh toch niet')
			console.log('effect logged in else in RootPage')
			console.log('wacht even...')
			setTimeout(() => {
				console.log('windowlochref', window.location.href)
				const userInLs2 = JSON.parse(localStorage.getItem(localStorageKey) as string)
				console.log('userInLs233:', userInLs2)
				console.log('localStorageKey', localStorageKey)
				if (getUrlParamVal(window.location.href, 'type') === 'recover') navigateTo = '/auth/resetpassword'
				console.log('en then navigate to ', navigateTo)
			}, 1500)
			// navigate(navigateTo)
		}
	}, [loggedin, navigateTo, navigate, setUsermail, userInLs])

	return (
		<>
			<main id="main" className="textwrapper">
				<div className="textwrapper">
					Redirecting to wherever you should be right now... <br />
					<Link to={navigateTo}>Click here</Link> if you're not redirected automatically. or{' '}
					<a href="https://ckdev88.github.io/mubooks/#/dashboard">dashboard</a>
					<br />
					<Link to="/auth/resetpassword">password reset page</Link>
				</div>
			</main>
		</>
	)
}
/*
https://ckdev88.github.io/mubooks/#error=access_denied&error_code=403&error_description=Email+link+is+invalid+or+has+expired
*/
export default RootPage
