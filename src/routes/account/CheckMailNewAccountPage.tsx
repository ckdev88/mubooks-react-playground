// TODO: design & copywrite confirmation email
// TODO: check global state of auth

import { useContext } from "react"
import { AppContext } from "../../App"

const CheckMailNewAccountPage = () => {
	const {usermail} = useContext(AppContext)
	const recipientAddress = usermail
	return (
		<>
			<h1>Check your email</h1>
			<p>
				You should receive an email on <strong><u>{recipientAddress}</u></strong> containing a link to verify your account, click it.
			</p>
		</>
	)
}
export default CheckMailNewAccountPage
