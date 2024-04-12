import { Link } from 'react-router-dom'
import SavedItems from './SavedItems'

export default function Saved() {
	return (
		<>
			<article className="adder">
				<Link to="/saved-books">
					<header>
						All of Mu Books<span>›</span>
					</header>
				</Link>
				<SavedItems />
			</article>
		</>
	)
}
