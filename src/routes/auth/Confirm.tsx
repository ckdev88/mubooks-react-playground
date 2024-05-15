import { useNavigate } from 'react-router-dom'
const AuthConfirm = () => {
	const navigate = useNavigate()
	setTimeout(() => {
		navigate('/account/login')
	}, 2000)
	return (
		<>
			<h1>
				Your account is confirmed <sub>You can now log in.</sub>
			</h1>
			<p>Redirecting to the login screen...</p>
		</>
	)
}
export default AuthConfirm
