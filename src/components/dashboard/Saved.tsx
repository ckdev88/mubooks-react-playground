import { Link } from 'react-router-dom'
import DashboardItems from './DashboardItems'

export default function Saved() {
	return (
		<>
			<article className="adder">
				<Link to="/saved-books">
					<header className="adder-header">
						All of Mu Books<span>›</span>
					</header>
				</Link>
				<DashboardItems page='savedbooks' noBooksText='Let&lsquo;s start saving books.' />
			</article>
		</>
	)
}
