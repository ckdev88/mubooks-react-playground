import { useNavigate } from 'react-router-dom'
import Heading from '../../components/ui/Heading'
const AuthConfirm = () => {
	const navigate = useNavigate()
	setTimeout(() => {
		navigate('/account/login')
	}, 2000)
	return (
		<>
			<Heading text="Your account is confirmed" sub="You can now log in." />
			<p>Redirecting to the login screen...</p>
		</>
	)
}
export default AuthConfirm
