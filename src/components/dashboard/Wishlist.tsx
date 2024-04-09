import WishlistItems from './WishlistItems'
import { Link } from 'react-router-dom'

export default function Wishlist() {
	return (
		<>
			<article className="adder">
				<Link to="/wishlist">
					<header>
						Mu Wishlist<span>›</span>
					</header>
					<WishlistItems />
				</Link>
			</article>
		</>
	)
}
