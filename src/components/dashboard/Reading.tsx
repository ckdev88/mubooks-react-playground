import { Link } from 'react-router-dom'
import DashboardItems from './DashboardItems'

export default function Reading() {
	return (
		<>
			<article className="adder">
				<Link to="/reading">
					<header className="adder-header">
						What I'm reading now <span>›</span>
					</header>
				</Link>
				<DashboardItems page="reading" noBooksText="Already reading a book? Let's add it here." />
			</article>
		</>
	)
}
