import { useEffect, useContext } from 'react'
import { supabase } from '../../../utils/supabase'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import { localStorageKey } from '../../../utils/supabase'

const LoadLibrary = () => {
	const navigate = useNavigate()
	if (localStorage.getItem(localStorageKey) === null) navigate('/account/login')

	const { setUserMyBooks, userid } = useContext(AppContext)

	async function MyBooksInsertFirst(): Promise<void> {
		const { data } = await supabase.from('user_entries').select('json').eq('user_id', userid)
		if (data && data.length < 1) {
			const { error } = await supabase
				.from('user_entries')
				.insert([{ json: [], user_id: userid }])
				.select()
			if (error) console.log(error.message)
		}
		return
	}

	async function getEntries() {
		await supabase
			.from('user_entries')
			.select('json')
			.then((res) => {
				if (res.data && res.data[0].json) setUserMyBooks(res.data[0].json)
			})
			.then(() => navigate('/dashboard'))
	}

	useEffect(() => {
		MyBooksInsertFirstCheck().then(() => getEntries())
	}, [])

	return (
		<>
			<h1>Logging in.</h1>
			<p>Loading your library...</p>
		</>
	)
}
export default LoadLibrary
