import { useEffect, useContext } from 'react'
import { supabase } from '../../../utils/supabase'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import { localStorageKey } from '../../../utils/supabase'

const LoadLibrary = () => {
	const navigate = useNavigate()
	if (localStorage.getItem(localStorageKey) === null) navigate('/account/login')

	const { setUserMyBooks } = useContext(AppContext)
	async function getEntries() {
		console.log('uh')
		await supabase
			.from('user_entries')
			.select('json')
			.then((res) => {
				if (res.data) setUserMyBooks(res.data[0].json)
			})
			.then(() => navigate('/dashboard'))
	}
	useEffect(() => {
		getEntries()
	}, [])

	return (
		<>
			<h1>Logging in.</h1>
			<p>Loading your library...</p>
		</>
	)
}
export default LoadLibrary
