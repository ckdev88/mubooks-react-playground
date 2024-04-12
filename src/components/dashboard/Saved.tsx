import { Link } from 'react-router-dom'
import SavedItems from './SavedItems'
export default function Saved() {
	// TODO: for now Link encapsulates all, when items get individual links, decrease its size
	return (
		<>
			<article className="adder">
				<Link to="/saved-books">
					<header>
						All of Mu Books<span>›</span>
					</header>
					<SavedItems />
				</Link>
			</article>
		</>
	)
}
