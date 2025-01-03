// TODO account_emails: when making an account on an emailaddress that already exists, send an email to that address, need to figure out text for that
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useCallback } from 'react'
import { localStorageKey } from '../../utils/supabase'
import { useContext } from 'react'
import { AppContext } from '../App'
import { getUrlParamVal } from '../Helpers'
import { supabase } from '../../utils/supabase'

const url: string = window.location.href
const accessToken: string = getUrlParamVal(url, 'access_token', true)
const refreshToken: string = getUrlParamVal(url, 'refresh_token', true)

const RootPage = () => {
	const { setPopupNotification, setPopupNotificationShow } = useContext(AppContext)
	const checkApiErrorCallback = useCallback(function checkApiError(): boolean {
		if (getUrlParamVal(url, 'error', true)) return true
		return false
	}, [])

	const apiErrorsCallback = useCallback(function apiErrors(): ApiError {
		const apiErr: ApiError = {
			error: getUrlParamVal(url, 'error', true),
			error_code: getUrlParamVal(url, 'error_code', true),
			error_description: getUrlParamVal(url, 'error_description', true),
		}
		return apiErr
	}, [])

	async function loginwithtoken(accessToken: string, refreshToken: string) {
		const { error } = await supabase.auth.setSession({
			// data,error
			access_token: accessToken,
			refresh_token: refreshToken,
		})
		if (error) console.log('Error logging in with token:', error.message)
	}
	if (accessToken !== '' && refreshToken !== '') loginwithtoken(accessToken, refreshToken)

	const { setUsermail, setUserIsLoggedIn, userIsLoggedIn } = useContext(AppContext)
	const navigate = useNavigate()

	const userInLs = JSON.parse(localStorage.getItem(localStorageKey) as string)

	useEffect(() => {
		let navigateTo: string
		let loggedin: boolean = false
		if (userInLs?.user?.aud === 'authenticated') {
			loggedin = true
			setUserIsLoggedIn(true)
		}
		if (!checkApiErrorCallback()) {
			if (loggedin) navigateTo = '/dashboard'
			else {
				if (getUrlParamVal(url, 'type') === 'recovery') navigateTo = '/auth/resetpassword'
				else navigateTo = '/account/login' // main redirection on account related error
			}
		} else navigateTo = '/error?error_description=' + apiErrorsCallback().error_description

		if (loggedin) {
			setUsermail(userInLs.user.email)
			setPopupNotification('Logged in, redirecting')
			setPopupNotificationShow(true)
			navigate(navigateTo)
		} else {
			if (userIsLoggedIn) setUserIsLoggedIn(true)
			setTimeout(() => {
				if (getUrlParamVal(url, 'type') === 'recover') { // TODO cleanup: is this ever used? recover / recovery
					navigateTo = '/auth/resetpassword'
				}
			}, 1500)
			navigate(navigateTo)
		}
	}, [
		navigate,
		setUsermail,
		userInLs,
		apiErrorsCallback,
		checkApiErrorCallback,
		setUserIsLoggedIn,
		userIsLoggedIn,
		setPopupNotification,
		setPopupNotificationShow,
	])

	return (
		<>
			<main id="main">
				<div>
					Redirecting to wherever you should be right now... <br />
					<a href="/dashboard">dashboard</a>
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
