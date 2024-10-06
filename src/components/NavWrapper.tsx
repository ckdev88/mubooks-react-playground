import { useContext, useState } from 'react'
import { AppContext } from '../App'
import { useNavigate, NavLink } from 'react-router-dom'

const titleMap = new Map()
titleMap.set('dashboard', 'Dashboard')
titleMap.set('search', 'Search')
titleMap.set('wishlist', 'Wishlist')
titleMap.set('reading', 'Currently reading')
titleMap.set('finished', 'Finished books')
titleMap.set('favorites', 'Favorite books')
titleMap.set('savedbooks', 'Saved books')
titleMap.set('quoted', 'Favorite quotes')
titleMap.set('tropes', 'Tropes')
titleMap.set('statistics', 'Stats')
titleMap.set('account/profile', 'Profile')
titleMap.set('account/login', 'Log in')
titleMap.set('account/logout', 'Log out')
titleMap.set('auth/confirm', 'Account confirmed')
titleMap.set('addbook', 'Add a book')

const NavWrapper = () => {
	const navigate = useNavigate()
	const { userIsLoggedIn } = useContext(AppContext)

	const [nav0Expanded, setNav0Expanded] = useState(false)

	function toggleNav0() {
		setNav0Expanded(!nav0Expanded)
	}

	function goSearch() {
		setNav0Expanded(false)
		navigate('/search')
	}

	const navTitle = titleMap.get(location.pathname.slice(1))
	document.title = 'Mu '+navTitle

	if (userIsLoggedIn === false) return <></>
	return (
		<>
			<div className={nav0Expanded ? 'anyexpanded' : 'allcollapsed'}>
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
					<h1 id="navTitle">{navTitle}</h1>
					<div style={{ display: 'flex', alignContent: 'center' }}>
						<button className="toggleZoekNav" onClick={() => goSearch()}>
							<span className="alt">Search</span>
							<svg
								className="zoekIconSvg"
								viewBox="0 0 149.84702 148.5"
								version="1.1"
								id="nav-icon-loep"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g id="nav-icon-loep-path">
									<path
										id="loep-rect1"
										transform="rotate(-45)"
										d="m -3.2461977,126.12067 h 8.3973866 c 3.5534027,0 6.4140841,2.86068 6.4140841,6.41408 v 65.15062 c 0,3.55341 -2.8606814,6.41409 -6.4140841,6.41409 h -8.3973866 c -3.5534028,0 -6.4140844,-2.86068 -6.4140844,-6.41409 v -65.15062 c 0,-3.5534 2.8606816,-6.41408 6.4140844,-6.41408 z"
									/>
									<path
										id="nav-icon-loep-stroke"
										d="M 103.48977,56.050812 A 47.438957,47.438957 0 0 1 56.050812,103.48977 47.438957,47.438957 0 0 1 8.6118546,56.050812 47.438957,47.438957 0 0 1 56.050812,8.6118546 47.438957,47.438957 0 0 1 103.48977,56.050812 Z"
									/>
								</g>
							</svg>
						</button>
					</div>
				</nav>
				<nav
					id="nav0"
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-start',
						alignContent: 'space-around',
						alignItems: 'flex-start',
						gap: '.25rem',
					}}
					className={nav0Expanded ? 'expanded nav-collapsable' : 'collapsed nav-collapsable'}
					aria-expanded={nav0Expanded ? 'true' : 'false'}
				>
					<NavLink to={'/dashboard'} onClick={toggleNav0}>
						Dashboard
					</NavLink>
					<NavLink to={'/search'} onClick={toggleNav0}>
						Search
					</NavLink>
					<NavLink to={'/wishlist'} onClick={toggleNav0}>
						Wishlist
					</NavLink>
					<NavLink to={'/reading'} onClick={toggleNav0}>
						Reading
					</NavLink>
					<NavLink to={'/finished'} onClick={toggleNav0}>
						Finished
					</NavLink>
					<NavLink to={'/favorites'} onClick={toggleNav0}>
						Favorites
					</NavLink>
					<NavLink to={'/savedbooks'} onClick={toggleNav0}>
						Saved books
					</NavLink>
					<NavLink to={'/quoted'} onClick={toggleNav0}>
						Quoted
					</NavLink>
					<NavLink to={'/tropes'} onClick={toggleNav0}>
						Tropes
					</NavLink>
					<NavLink to={'/statistics'} onClick={toggleNav0}>
						Statistics
					</NavLink>
					{/*
					<NavLink to={'/clear-my-books'} onClick={toggleNav0}>
						Clear My Books
					</NavLink>
					*/}
					<hr
						style={{
							width: '80%',
							borderWidth: '1px 0 0',
							borderStyle: 'solid',
							borderColor: 'rgba(255,255,255,.2)',
							boxShadow: 'none',
							height: '1px',
						}}
					/>
					<NavLink to={'/account/profile'} onClick={toggleNav0}>
						Profile
					</NavLink>
					<NavLink to={'/account/logout'} onClick={toggleNav0}>
						Logout
					</NavLink>
				</nav>
			</div>
		</>
	)
}
export default NavWrapper
