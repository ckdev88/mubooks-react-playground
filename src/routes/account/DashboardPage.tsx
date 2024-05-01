import { useContext, useEffect } from 'react'
import QuoteCard from '../../components/QuoteCard'
import Reading from '../../components/dashboard/Reading'
import Saved from '../../components/dashboard/Saved'
import Finished from '../../components/dashboard/Finished'
import Favorites from '../../components/dashboard/Favorites'
import Wishlist from '../../components/dashboard/Wishlist'
import { AppContext } from '../../App'
import { localStorageKey } from '../../../utils/supabase'
import { useNavigate } from 'react-router-dom'

export default function DashboardPage() {
	const { username } = useContext(AppContext)
	const navigate = useNavigate()
	useEffect(() => {
		if (localStorage.getItem(localStorageKey) === null) {
			navigate('/account/login')
		}
	}, [])

	return (
		<>
			<div className="textwrapper">
				<h1>
					Hi, {username}
					<sub>MuBOOKS is your reading journal.</sub>
				</h1>
			</div>
			<QuoteCard />
			<Reading />
			<Wishlist />
			<Favorites />
			<Finished />
			<Saved />
		</>
	)
}
/* <Tropes /> <Stats /> <Explore /> */
