import { useContext, useState } from 'react'
import { AppContext } from '../App'
import { useNavigate, NavLink } from 'react-router-dom'

const NavWrapper = () => {
	const navigate = useNavigate()
	const { userIsLoggedIn, navTitle } = useContext(AppContext)

	const [nav0Expanded, setNav0Expanded] = useState(false)

	function toggleNav0() {
		setNav0Expanded(!nav0Expanded)
	}
	function goSearch() {
		setNav0Expanded(false)
		navigate('/search')
	}

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
					className={nav0Expanded ? 'expanded nav-collapsable' : 'collapsed nav-collapsable'}
					aria-expanded={nav0Expanded ? 'true' : 'false'}
				>
					<ul>
						<li>
							<NavLink to={'/dashboard'} onClick={toggleNav0}>
								Dashboard
							</NavLink>
						</li>
						<li>
							<NavLink to={'/search'} onClick={toggleNav0}>
								Search
							</NavLink>
						</li>
						<li>
							<NavLink to={'/add-book'} onClick={toggleNav0}>
								Add book
							</NavLink>
						</li>
						<li>
							<NavLink to={'/wishlist'} onClick={toggleNav0}>
								Wishlist
							</NavLink>
						</li>
						<li>
							<NavLink to={'/reading'} onClick={toggleNav0}>
								Reading
							</NavLink>
						</li>
						<li>
							<NavLink to={'/finished'} onClick={toggleNav0}>
								Finished
							</NavLink>
						</li>
						<li>
							<NavLink to={'/favorites'} onClick={toggleNav0}>
								Favorites
							</NavLink>
						</li>
						<li>
							<NavLink to={'/saved-books'} onClick={toggleNav0}>
								Saved books
							</NavLink>
						</li>
						<li>
							<NavLink to={'/quoted-books'} onClick={toggleNav0}>
								Quoted
							</NavLink>
						</li>
						<li>
							<NavLink to={'/tropes'} onClick={toggleNav0}>
								Tropes
							</NavLink>
						</li>
						<li>
							<NavLink to={'/statistics'} onClick={toggleNav0}>
								Statistics
							</NavLink>
						</li>
						<li>
							<NavLink to={'/clear-my-books'} onClick={toggleNav0}>
								Clear My Books
							</NavLink>
						</li>
						<li>
							<div className="history">
								<button>&lt;</button>
								<button>&gt;</button>
							</div>
						</li>
					</ul>
					<ul>
						<li>
							<NavLink to={'/account/profile'} onClick={toggleNav0}>
								{/*
								 <svg
									width="800px"
									height="800px"
									viewBox="0 0 20 20"
									version="1.1"
									xmlns="http://www.w3.org/2000/svg"
									id="nav-icon-profile"
								>
									<g
										id="nav-icon-profile-group"
										stroke="none"
										strokeWidth="1"
										fill="none"
										fillRule="evenodd"
									>
										<g transform="translate(-140.000000, -2159.000000)" fill="#000000">
											<g id="icon-profile" transform="translate(56.000000, 160.000000)">
												<path
													d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598"
													id="nav-icon-profile-path"
												></path>
											</g>
										</g>
									</g>
								</svg>&nbsp;
							   */}
								Profile
							</NavLink>
						</li>
						<li>
							<NavLink to={'/account/logout'} onClick={toggleNav0}>
								Logout
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</>
	)
}
export default NavWrapper
