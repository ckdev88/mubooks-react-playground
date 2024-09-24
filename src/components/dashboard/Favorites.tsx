import { Link } from 'react-router-dom'
import DashboardItems from './DashboardItems'

export default function Favorites() {
	return (
		<>
			<article className="adder">
				<Link to="/favorites">
					<header className="adder-header">
						Mu Favorites<span>›</span>
					</header>
				</Link>
				<DashboardItems page='favorites' noBooksText='Only the best ones here.' />
			</article>
		</>
	)
}
