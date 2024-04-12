import { Link } from 'react-router-dom'
import FinishedItems from './FinishedItems'

export default function Finished() {
	return (
		<>
			<article className="adder">
				<Link to="/finished">
					<header>
						Mu Finished books<span>›</span>
					</header>
				</Link>
				<FinishedItems />
			</article>
		</>
	)
}
