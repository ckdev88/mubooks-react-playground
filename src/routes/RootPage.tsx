import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { localStorageKey } from '../../utils/supabase'
import { useContext } from 'react'
import { AppContext } from '../App'
import { getUrlParamVal } from '../Helpers'
import { supabase } from '../../utils/supabase'

const RootPage = () => {
	let navigateTo: string
	const url: string = window.location.href

	const checkApiError = (): boolean => {
		if (getUrlParamVal(url, 'error', true)) return true
		return false
	}
	const apiErrors = (): ApiError => {
		let apiErr: ApiError = {
			error: getUrlParamVal(url, 'error', true),
			error_code: getUrlParamVal(url, 'error_code', true),
			error_description: getUrlParamVal(url, 'error_description', true),
		}
		return apiErr
	}

	async function loginwithtoken() {
		const accessToken = getUrlParamVal(url, 'access_token', true)
		const refreshToken = getUrlParamVal(url, 'refresh_token', true)

		const { error } = await supabase.auth.setSession({
			// data,error
			access_token: accessToken,
			refresh_token: refreshToken,
		})
		if (error) {
			console.log('Error logging in with token:', error.message)
		}
	}
	loginwithtoken()

	const { setUsermail, setUserIsLoggedIn, userIsLoggedIn } = useContext(AppContext)
	let loggedin: boolean = false
	const navigate = useNavigate()

	if (!checkApiError()) {
		navigateTo = '/account/login'
		if (loggedin) navigateTo = '/dashboard'
		if (getUrlParamVal(url, 'type') === 'recovery') navigateTo = '/auth/resetpassword'
	} else {
		navigateTo = '/error?error_description=' + apiErrors().error_description
	}

	const userInLs = JSON.parse(localStorage.getItem(localStorageKey) as string)

	if (userInLs?.user?.aud === 'authenticated') {
		loggedin = true
		setUserIsLoggedIn(true)
	}


	useEffect(() => {
		if (loggedin) {
			setUsermail(userInLs.user.email)
			navigate(navigateTo)
		} else {
			if (userIsLoggedIn) {
				setUserIsLoggedIn(true)
			} 
			setTimeout(() => {
				if (getUrlParamVal(url, 'type') === 'recover') navigateTo = '/auth/resetpassword'
			}, 1500)
			navigate(navigateTo)
		}
	}, [loggedin, navigate, setUsermail, userInLs])

	return (
		<>
			<main id="main" className="textwrapper">
				<div className="textwrapper">
					Redirecting to wherever you should be right now... <br />
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
