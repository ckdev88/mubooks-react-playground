import { Link } from 'react-router-dom'
import DashboardItems from './DashboardItems'

export default function Finished() {
	return (
		<>
			<article className="adder">
				<Link to="/finished">
					<header className="adder-header">
						Mu Finished books<span>›</span>
					</header>
				</Link>
				<DashboardItems page="finished" noBooksText="Books I finished reading." />
			</article>
		</>
	)
}
