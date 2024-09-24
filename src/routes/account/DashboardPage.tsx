import { useContext, useEffect } from 'react'
import QuoteCard from '../../components/QuoteCard'
import { AppContext } from '../../App'
import { localStorageKey } from '../../../utils/supabase'
import { useNavigate } from 'react-router-dom'
import DashboardDeck from '../../components/dashboard/DashboardDeck'

const pageTitle = 'Mu Dashboard'

export default function DashboardPage() {
	const { setNavTitle } = useContext(AppContext)

	useEffect(() => {
		setNavTitle(pageTitle)
	}, [setNavTitle])

	const navigate = useNavigate()
	useEffect(() => {
		if (localStorage.getItem(localStorageKey) === null) {
			// tijdelijk uit
			// navigate('/account/login')
		}
	}, [navigate])

	return (
		<>
			<QuoteCard />
			<DashboardDeck
				page="reading"
				title="What I&lsquo;m reading now"
				noBooksText="Already reading a book? Let's add it here."
			/>
			<DashboardDeck page="wishlist" title="Mu Wishlist" noBooksText="Next in line." />
			<DashboardDeck page="favorites" title="Mu Favorites" noBooksText="Only the best ones here" />
			<DashboardDeck page="finished" title="Mu Finished books" noBooksText="Only the best ones here" />
			<DashboardDeck page="savedbooks" title="All of Mu Books" noBooksText="Let&lsquo;s start saving books." />
		</>
	)
}
/* <Tropes /> <Stats /> <Explore /> */
