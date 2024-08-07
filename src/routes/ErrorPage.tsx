import { useEffect } from 'react'
import { useState } from 'react'
import { getUrlParamVal } from '../Helpers'
import { useNavigate } from 'react-router-dom'
import { cleanSigns } from '../helpers/cleanInput'

const url = window.location.href

const ErrorPage = () => {
	const navigate = useNavigate()
	const [countdown0, setCountdown0] = useState('')
	const [countdown1, setCountdown1] = useState('')
	const [countdown2, setCountdown2] = useState('')
	const [countdown3, setCountdown3] = useState('')

	let errormessage: string = ''
	if (getUrlParamVal(url, 'error_description')) {
		const errormsg = getUrlParamVal(url, 'error_description')
		errormessage = cleanSigns(errormsg)
	}

	useEffect(() => {
		setTimeout(() => {
			setCountdown0('We will redirect you to the login page in ')
		}, 1000)
		setTimeout(() => {
			setCountdown1('3. ')
		}, 2000)
		setTimeout(() => {
			setCountdown2('2. ')
		}, 3000)
		setTimeout(() => {
			setCountdown3('1. ')
		}, 4000)
		setTimeout(() => {
			navigate('/account/login')
		}, 5000)
	}, [navigate])
	return (
		<>
			<h1>Error</h1>
			<h2>{errormessage}</h2>
			<p>
				{countdown0}
				{countdown1}
				{countdown2}
				{countdown3}
			</p>
		</>
	)
}
export default ErrorPage
