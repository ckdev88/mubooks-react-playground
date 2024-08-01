import { Link, useNavigate, useCallback } from 'react-router-dom'
import { useEffect } from 'react'
import { localStorageKey } from '../../utils/supabase'
import { useContext } from 'react'
import { AppContext } from '../App'
import { getUrlParamVal } from '../Helpers'
import { supabase } from '../../utils/supabase'

const RootPage = () => {
	const url: string = window.location.href

	const checkApiErrorCallback = useCallback(
		function checkApiError(): boolean {
			if (getUrlParamVal(url, 'error', true)) return true
			return false
		},
		[url]
	)

	const apiErrorsCallback = useCallback(
		function apiErrors(): ApiError {
			const apiErr: ApiError = {
				error: getUrlParamVal(url, 'error', true),
				error_code: getUrlParamVal(url, 'error_code', true),
				error_description: getUrlParamVal(url, 'error_description', true),
			}
			return apiErr
		},
		[url]
	)

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
	const navigate = useNavigate()

	const userInLs = JSON.parse(localStorage.getItem(localStorageKey) as string)

	useEffect(() => {
		let navigateTo: string
		let loggedin: boolean = false
		if (userInLs?.user?.aud === 'authenticated') {
			loggedin = true
			setUserIsLoggedIn(true)
			console.log(userInLs.user)
		}
		if (!checkApiErrorCallback()) {
			if (loggedin) navigateTo = '/dashboard'
			else navigateTo = '/account/login'
			if (getUrlParamVal(url, 'type') === 'recovery') navigateTo = '/auth/resetpassword'
		} else {
			navigateTo = '/error?error_description=' + apiErrorsCallback().error_description
		}
		if (loggedin) {
			setUsermail(userInLs.user.email)
			console.log('loggedin jawel!')
			navigate(navigateTo)
		} else {
			if (userIsLoggedIn) {
				console.log('userIsLoggedIn jazekers')
				setUserIsLoggedIn(true)
			}
			setTimeout(() => {
				if (getUrlParamVal(url, 'type') === 'recover') navigateTo = '/auth/resetpassword'
			}, 1500)
			navigate(navigateTo)
		}
	}, [navigate, setUsermail, userInLs, apiErrorsCallback, checkApiErrorCallback, setUserIsLoggedIn, url, userIsLoggedIn])

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
