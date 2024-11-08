import { useContext, useEffect } from 'react'
import { useState } from 'react'
import { getUrlParamVal } from '../Helpers'
import { useNavigate } from 'react-router-dom'
import { cleanSigns } from '../helpers/cleanInput'
import HeaderBranding from '../components/HeaderBranding'
import { AppContext } from '../App'

const url = window.location.href

const ErrorPage = () => {
	const { setUserIsLoggedIn } = useContext(AppContext)
	const navigate = useNavigate()
	setUserIsLoggedIn(false)
	const [countdown0, setCountdown0] = useState('')
	const [countdown1, setCountdown1] = useState('')

	let errormessage: string = ''
	if (getUrlParamVal(url, 'error_description')) {
		const errormsg = getUrlParamVal(url, 'error_description')
		errormessage = cleanSigns(errormsg)
	}

	useEffect(() => {
		setCountdown0('We will redirect you to the login page in ')
		setTimeout(() => {
			setCountdown1('3. ')
			setTimeout(() => {
				setCountdown1('3. 2. ')
				setTimeout(() => {
					setCountdown1('3. 2. 1. ')
					setTimeout(() => {
						navigate('/account/login')
					}, 1000)
				}, 1000)
			}, 1000)
		}, 200)
	}, [])

	return (
		<>
			<HeaderBranding />
			<div className="h1">Error</div>
			<h2>{errormessage}</h2>
			<p>
				{countdown0}
				{countdown1}
			</p>
		</>
	)
}
export default ErrorPage
