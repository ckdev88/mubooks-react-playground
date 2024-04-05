import { Routes, Route } from 'react-router-dom'
import NavWrapper from './components/NavWrapper'
import { createContext, useState } from 'react'
import CheckMailPasswordPage from './routes/account/CheckMailPasswordPage'
import CheckMailNewAccountPage from './routes/account/CheckMailNewAccountPage'
import UserProfilePage from './routes/account/UserProfilePage'
import UserLogoutPage from './routes/account/UserLogoutPage'
import DashboardPage from './routes/account/DashboardPage'
import SearchPage from './routes/books/SearchPage'
import SavedBooksPage from './routes/books/SavedBooksPage'
import ClearMyBooks from './routes/books/ClearMyBooks'
import UserLoginPage from './routes/account/UserLoginPage'
import WishlistPage from './routes/books/WishlistPage'
import ReadingPage from './routes/books/ReadingPage'
import RootPage from './routes/RootPage'
import { localStorageKey } from '../utils/supabase'

export const AppContext = createContext<AppContextType>({} as AppContextType)

const App = () => {
	let userIsLoggedInInitval: boolean
	if (localStorage.getItem(localStorageKey)) userIsLoggedInInitval = true
	else userIsLoggedInInitval = false

	let userMyBooksInitval: string
	if (localStorage.getItem('MyBooks')) userMyBooksInitval = localStorage.getItem('MyBooks') as string
	else userMyBooksInitval = '[]'

	const [username, setUsername] = useState<string>('')
	const [usermail, setUsermail] = useState<string>('')
	const [userMyBooks, setUserMyBooks] = useState<string>(userMyBooksInitval)
	const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(userIsLoggedInInitval)

	return (
		<>
			<AppContext.Provider
				value={{ username, setUsername, usermail, setUsermail, userMyBooks, setUserMyBooks, userIsLoggedIn, setUserIsLoggedIn }}
			>
				<header id="header">
					<NavWrapper />
				</header>
				<main id="main">
					<Routes>
						<Route path="/" Component={RootPage} />
						<Route path="/account/login" Component={UserLoginPage} />
						<Route path="/account/forgotpassword" Component={CheckMailPasswordPage} />
						<Route path="/account/new" Component={CheckMailNewAccountPage} />
						<Route path="/account/profile" Component={UserProfilePage} />
						<Route path="/account/logout" Component={UserLogoutPage} />
						<Route path="/account/*" Component={UserLoginPage} />
						<Route path="/dashboard" Component={DashboardPage} />
						<Route path="/search" Component={SearchPage} />
						<Route path="/saved-books" Component={SavedBooksPage} />
						<Route path="/wishlist" Component={WishlistPage} />
						<Route path="/reading" Component={ReadingPage} />
						<Route path="/clear-my-books" Component={ClearMyBooks} />
					</Routes>
				</main>
			</AppContext.Provider>
		</>
	)
}
export default App
