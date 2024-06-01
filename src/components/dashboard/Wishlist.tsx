import WishlistItems from './WishlistItems'
import { Link } from 'react-router-dom'

export default function Wishlist() {
	return (
		<>
			<article className="adder">
				<Link to="/wishlist">
				<header className="adder-header">
						Mu Wishlist<span>›</span>
					</header>
				</Link>
				<WishlistItems />
			</article>
		</>
	)
}
