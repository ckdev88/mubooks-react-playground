// TODO: design & copywrite confirmation email
// TODO: design & copywrite password reset email
// TODO: check global state of auth

import { useContext } from "react"
import { AppContext } from "../../App"

const CheckMailPasswordPage = () => {
	const { usermail } = useContext(AppContext)
	const recipientAddress = usermail
	return (
		<>
			<h1>Check your email</h1>
			<p>
				You should receive an email on <strong><u>{recipientAddress}</u></strong> containing a link to reset your password, click it.
			</p>
		</>
	)
}
export default CheckMailPasswordPage
