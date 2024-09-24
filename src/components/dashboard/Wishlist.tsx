import DashboardItems from './DashboardItems'
import { Link } from 'react-router-dom'

export default function Wishlist() {
	return (
		<>
			<article className="adder">
				<Link to="/wishlist">
					<header className="adder-header">
						Mu Wishlist<span>›</span>
					</header>
				</Link>
				<DashboardItems page="wishlist" noBooksText="Next in line." />
			</article>
		</>
	)
}
