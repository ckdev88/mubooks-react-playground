import WishlistItems from './WishlistItems'
import { Link } from 'react-router-dom'

export default function Wishlist({ page }: { page: Page }) {
	return (
		<>
			<article className="adder">
				<Link to="/wishlist">
					<header className="adder-header">
						Mu Wishlist<span>›</span>
					</header>
				</Link>
				<WishlistItems page={page} />
			</article>
		</>
	)
}
