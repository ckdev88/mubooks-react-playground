import { useContext } from 'react'
import QuoteCard from '../../components/QuoteCard'
import Reading from '../../components/dashboard/Reading'
import Saved from '../../components/dashboard/Saved'
import Finished from '../../components/dashboard/Finished'
import Favorites from '../../components/dashboard/Favorites'
import Wishlist from '../../components/dashboard/Wishlist'
import { AppContext } from '../../App'

const DashboardPage = () => {
	const { username } = useContext(AppContext)

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
export default DashboardPage
/* <Tropes /> <Stats /> <Explore /> */
