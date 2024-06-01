import { Link } from 'react-router-dom'
import ReadingItems from './ReadingItems'

export default function Reading() {
	return (
		<>
			<article className="adder">
				<Link to="/reading">
					<header className="adder-header">
						What I'm reading now <span>›</span>
					</header>
				</Link>
				<ReadingItems />
			</article>
		</>
	)
}
