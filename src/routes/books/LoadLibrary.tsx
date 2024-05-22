import { useContext, useState, useEffect } from 'react'
import { supabase } from '../../../utils/supabase'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import { localStorageKey } from '../../../utils/supabase'

const LoadLibrary = () => {
	const navigate = useNavigate()
	if (localStorage.getItem(localStorageKey) === null) navigate('/account/login')

	const { setUserMyBooks, userid } = useContext(AppContext)
	const [isReady, setIsReady] = useState(false)

	const MyBooksInsertFirst = async (): Promise<void> => {
		const { error } = await supabase
			.from('user_entries')
			.insert([{ json: [], user_id: userid, testdata: 'nieuwe user' }])
			.select('*')
		if (error) console.log('error after login:', error.message)
		getEntries()
	}

	const MyBooksInsertFirstCheck = async (): Promise<void> => {
		await supabase
			.from('user_entries')
			.select('json')
			.eq('user_id', userid)
			.then((res) => {
				if (res.data && res.data.length < 1) MyBooksInsertFirst()
				else getEntries()
			})
	}

	const getEntries = async () => {
		await supabase
			.from('user_entries')
			.select('json')
			.eq('user_id', userid)
			.then((res) => {
				if (res.data && res.data[0].json) setUserMyBooks(res.data[0].json)
			})
			.then(() => setIsReady(true))
	}

	MyBooksInsertFirstCheck()

	useEffect(() => {
		if (isReady) navigate('/dashboard')
	}, [isReady, navigate])

	return (
		<>
			<h1>Logging in.</h1>
			<p>Loading your library...</p>
		</>
	)
}
export default LoadLibrary
