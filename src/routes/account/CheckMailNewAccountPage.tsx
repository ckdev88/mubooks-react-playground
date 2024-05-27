// TODO: design & copywrite confirmation email
import { useContext } from "react"
import { AppContext } from "../../App"

const CheckMailNewAccountPage = () => {
	const {usermail} = useContext(AppContext)
	const recipientAddress = usermail
	return (
		<>
			<h1>Check your email</h1>
			<p>
				You should receive an email on <strong><u>{recipientAddress}</u></strong> containing a link to confirm your account, click it.
			</p>
		</>
	)
}
export default CheckMailNewAccountPage
