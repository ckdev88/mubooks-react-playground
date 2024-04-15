import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AppContext } from '../App'
import { useNavigate } from 'react-router-dom'

const NavWrapper = () => {
	const navigate = useNavigate()
	const { userIsLoggedIn } = useContext(AppContext)

	const [nav0Expanded, setNav0Expanded] = useState(false)
	const [nav1Expanded, setNav1Expanded] = useState(false)

	function toggleNav0() {
		setNav0Expanded(!nav0Expanded)
		setNav1Expanded(false)
	}
	function toggleNav1() {
		setNav1Expanded(!nav1Expanded)
		setNav0Expanded(false)
	}
	function goSearch() {
		setNav0Expanded(false)
		setNav1Expanded(false)
		navigate('/search')
	}

	if (userIsLoggedIn === false) return <></>
	return (
		<>
			<nav id="navIcons">
				<button
					id="toggleNavBurger"
					className={nav0Expanded ? 'expanded' : 'collapsed'}
					onClick={toggleNav0}
				>
					<div className="burger">
						<div className="burgerbar bar1"></div>
						<div className="burgerbar bar2"></div>
						<div className="burgerbar bar2duplo"></div>
						<div className="burgerbar bar3"></div>
					</div>
				</button>
				<div>
					<button className="toggleZoekNav" onClick={() => goSearch()}>
						<img src='/img/vergrootglas.svg' alt="search" className='zoekIcon'/>
					</button>
					<button
						id="toggleNavProfile"
						className={nav1Expanded ? 'expanded' : 'collapsed'}
						onClick={toggleNav1}
					>
						<div className="profileIcon">
							<div className="profileIcon-head"></div>
							<div className="profileIcon-body"></div>
						</div>
					</button>
				</div>
			</nav>
			<nav
				id="nav0"
				className={nav0Expanded ? 'expanded nav-collapsable' : 'collapsed nav-collapsable'}
				aria-expanded={nav0Expanded ? 'true' : 'false'}
			>
				<ul>
					<li>
						<Link to={'/dashboard'} onClick={toggleNav0}>Dashboard</Link>
						<Link to={'/search'} onClick={toggleNav0}>Search</Link>
						<Link to={'/add-book'} onClick={toggleNav0}>Add book</Link>
						<Link to={'/wishlist'} onClick={toggleNav0}>Wishlist</Link>
						<Link to={'/reading'} onClick={toggleNav0}>Reading</Link>
						<Link to={'/finished'} onClick={toggleNav0}>Finished</Link>
						<Link to={'/favorites'} onClick={toggleNav0}>Favorites</Link>
						<Link to={'/saved-books'} onClick={toggleNav0}>Saved books</Link>
						<Link to={'/clear-my-books'} onClick={toggleNav0}>Clear My Books</Link>
					</li>
				</ul>
				<div className="history">
					<button>&lt;</button>
					<button>&gt;</button>
				</div>
			</nav>
			<nav
				id="nav1"
				className={nav1Expanded ? 'expanded nav-collapsable' : 'collapsed nav-collapsable'}
				aria-expanded={nav1Expanded ? 'true' : 'false'}
			>
				<ul>
					<li>
						<Link to={'/account/profile'} onClick={toggleNav1}>
							Profile
						</Link>
					</li>
					<li>
						<Link to={'/account/logout'} onClick={toggleNav1}>
							Logout
						</Link>
					</li>
				</ul>
			</nav>
		</>
	)
}
export default NavWrapper
