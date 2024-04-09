import { useContext } from 'react'
import { Link } from 'react-router-dom'
import QuoteCard from '../../components/QuoteCard'
import Reading from '../../components/dashboard/Reading'
import Saved from '../../components/dashboard/Saved'
import Favorites from '../../components/dashboard/Favorites'
import Wishlist from '../../components/dashboard/Wishlist'
import { AppContext } from '../../App'

const DashboardPage = () => {
	const { username } = useContext(AppContext)

	return (
		<>
			<h1>Hi, {username}</h1>
			<p>
				MuBOOKS is your journal for your books. <br />
				<br />
				Let's get started!
			</p>
			<QuoteCard />
			<Reading />
			<Saved />
			<Wishlist />
			<Favorites />
		</>
	)
}
export default DashboardPage
/* <Tropes /> <Stats /> <Explore /> */
