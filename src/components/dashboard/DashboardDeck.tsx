import { Link } from 'react-router-dom'
import DashboardDeckItems from './DashboardDeckItems'

const DashboardDeck = ({ page, title, noBooksText }: { page: Page; title: string; noBooksText: string }) => {
	return (
		<>
			<article className="adder">
				<Link to={'/' + page}>
					<header className="adder-header">
						{title} <span>›</span>
					</header>
				</Link>
				<DashboardDeckItems page={page} noBooksText={noBooksText} />
			</article>
		</>
	)
}
export default DashboardDeck
