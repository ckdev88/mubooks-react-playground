import useLogout from '../../hooks/useLogout'

export default function UserLogoutPage() {
	useLogout(1000)
	return (
		<>
			<div className="h1">Logging out.</div>
			<p>
				Redirecting to login page<span className="loader-dots"></span>
			</p>
		</>
	)
}
