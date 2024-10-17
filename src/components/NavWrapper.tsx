import { useContext, useState } from 'react'
import { AppContext } from '../App'
import { useNavigate, NavLink } from 'react-router-dom'
import updatePreferences from '../functions/updatePreferences'

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
	const { userIsLoggedIn, darkTheme, setDarkTheme } = useContext(AppContext)

	const [nav0Expanded, setNav0Expanded] = useState(false)

	function toggleNav0() {
		setNav0Expanded(!nav0Expanded)
	}

	function goSearch() {
		setNav0Expanded(false)
		navigate('/search')
	}

	const navTitle = titleMap.get(location.pathname.slice(1))
	document.title = 'Mu ' + navTitle

	if (userIsLoggedIn === false) return <></>
	return (
		<>
			<div className={nav0Expanded ? 'anyexpanded' : 'allcollapsed'}>
				<nav id="navIcons">
					<button id="toggleNavBurger" className={nav0Expanded ? 'expanded' : 'collapsed'} onClick={toggleNav0}>
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
					<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
						<NavLink to={'/dashboard'} onClick={toggleNav0}>
							Dashboard
						</NavLink>
						<NavLink to={'/add-book'} onClick={toggleNav0}>
							Add book
						</NavLink>
					</div>

					<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
						<NavLink to={'/wishlist'} onClick={toggleNav0}>
							Wishlist
						</NavLink>
						<NavLink to={'/quoted'} onClick={toggleNav0}>
							Quoted
						</NavLink>
					</div>

					<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
						<NavLink to={'/reading'} onClick={toggleNav0}>
							Reading
						</NavLink>
						<NavLink to={'/tropes'} onClick={toggleNav0}>
							Tropes
						</NavLink>
					</div>

					<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
						<NavLink to={'/finished'} onClick={toggleNav0}>
							Finished
						</NavLink>
						<NavLink to={'/statistics'} onClick={toggleNav0}>
							Statistics
						</NavLink>
					</div>

					<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
						<NavLink to={'/favorites'} onClick={toggleNav0}>
							Favorites
						</NavLink>
						<NavLink to={'/account/profile'} onClick={toggleNav0}>
							Profile
						</NavLink>
					</div>

					<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
						<NavLink to={'/savedbooks'} onClick={toggleNav0}>
							Saved books
						</NavLink>
						<NavLink to={'/account/logout'} onClick={toggleNav0}>
							Logout
						</NavLink>
					</div>
					{/*
					 */}
					<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
						<NavLink to={'/clear-my-books'} onClick={toggleNav0}>
							Clear My Books
						</NavLink>

						<button
							id="accessibility-darkmode"
							onClick={() => {
								setDarkTheme(!darkTheme)
								updatePreferences(!darkTheme)
							}}
							className={darkTheme ? 'active' : ''}
						>
							<svg
								id="sun-svg"
								width="25"
								height="24"
								viewBox="0 0 25 24"
								fill="white"
								xmlns="http://www.w3.org/2000/svg"
								className="nav-accessibility-light_mode light"
							>
								<path d="M12.979 9C14.6319 9 15.9843 10.35 15.9843 12C15.9843 13.65 14.6319 15 12.979 15C11.3261 15 9.97368 13.65 9.97368 12C9.97368 10.35 11.3261 9 12.979 9ZM12.979 7C10.2141 7 7.97013 9.24 7.97013 12C7.97013 14.76 10.2141 17 12.979 17C15.7439 17 17.9879 14.76 17.9879 12C17.9879 9.24 15.7439 7 12.979 7ZM2.96125 13H4.9648C5.51578 13 5.96658 12.55 5.96658 12C5.96658 11.45 5.51578 11 4.9648 11H2.96125C2.41027 11 1.95947 11.45 1.95947 12C1.95947 12.55 2.41027 13 2.96125 13ZM20.9932 13H22.9968C23.5478 13 23.9985 12.55 23.9985 12C23.9985 11.45 23.5478 11 22.9968 11H20.9932C20.4422 11 19.9914 11.45 19.9914 12C19.9914 12.55 20.4422 13 20.9932 13ZM11.9772 2V4C11.9772 4.55 12.428 5 12.979 5C13.53 5 13.9808 4.55 13.9808 4V2C13.9808 1.45 13.53 1 12.979 1C12.428 1 11.9772 1.45 11.9772 2ZM11.9772 20V22C11.9772 22.55 12.428 23 12.979 23C13.53 23 13.9808 22.55 13.9808 22V20C13.9808 19.45 13.53 19 12.979 19C12.428 19 11.9772 19.45 11.9772 20ZM6.95834 4.58C6.56764 4.19 5.92651 4.19 5.54583 4.58C5.15514 4.97 5.15514 5.61 5.54583 5.99L6.60771 7.05C6.99841 7.44 7.63954 7.44 8.02022 7.05C8.40089 6.66 8.41091 6.02 8.02022 5.64L6.95834 4.58ZM19.3503 16.95C18.9596 16.56 18.3185 16.56 17.9378 16.95C17.5471 17.34 17.5471 17.98 17.9378 18.36L18.9997 19.42C19.3904 19.81 20.0315 19.81 20.4122 19.42C20.8029 19.03 20.8029 18.39 20.4122 18.01L19.3503 16.95ZM20.4122 5.99C20.8029 5.6 20.8029 4.96 20.4122 4.58C20.0215 4.19 19.3804 4.19 18.9997 4.58L17.9378 5.64C17.5471 6.03 17.5471 6.67 17.9378 7.05C18.3285 7.43 18.9696 7.44 19.3503 7.05L20.4122 5.99ZM8.02022 18.36C8.41091 17.97 8.41091 17.33 8.02022 16.95C7.62953 16.56 6.98839 16.56 6.60771 16.95L5.54583 18.01C5.15514 18.4 5.15514 19.04 5.54583 19.42C5.93652 19.8 6.57766 19.81 6.95834 19.42L8.02022 18.36Z"></path>
							</svg>
							<svg
								id="moon-svg"
								width="25"
								height="24"
								viewBox="0 0 25 24"
								fill="white"
								xmlns="http://www.w3.org/2000/svg"
								className="nav-accessibility-dark_mode light"
							>
								<path d="M10.3442 5.51C10.1639 6.15 10.0737 6.82 10.0737 7.5C10.0737 11.58 13.3996 14.9 17.4869 14.9C18.1681 14.9 18.8393 14.81 19.4804 14.63C18.4386 17.19 15.9141 19 12.9789 19C9.11202 19 5.96644 15.86 5.96644 12C5.96644 9.07 7.77966 6.55 10.3442 5.51ZM12.9789 3C8.00005 3 3.96289 7.03 3.96289 12C3.96289 16.97 8.00005 21 12.9789 21C17.9577 21 21.9949 16.97 21.9949 12C21.9949 11.54 21.9548 11.08 21.8947 10.64C20.9129 12.01 19.3101 12.9 17.4869 12.9C14.5016 12.9 12.0773 10.48 12.0773 7.5C12.0773 5.69 12.9689 4.08 14.3413 3.1C13.9005 3.04 13.4397 3 12.9789 3Z"></path>
							</svg>
						</button>
					</div>
					{/*
					 */}
				</nav>
			</div>
		</>
	)
}
export default NavWrapper
