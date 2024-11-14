import { supabase } from '../../utils/supabase'
import { useContext, useEffect } from 'react'
import { AppContext } from '../App'
import { useNavigate } from 'react-router-dom'

async function useLogout(delay: number = 0) {
	const { setUserIsLoggedIn } = useContext(AppContext)
	const navigate = useNavigate()

	useEffect(() => {
		supabase.auth
			.signOut()
			.then(() => {
				localStorage.clear()
				setUserIsLoggedIn(false)
			})
			.finally(() => {
				setTimeout(() => {
					navigate('/account/login')
				}, delay)
			})
	}, [setUserIsLoggedIn, navigate, delay])
}

export default useLogout
