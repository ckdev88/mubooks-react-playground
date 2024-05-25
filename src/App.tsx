// TODO: Add to reading in searchpage
import { supabase } from '../utils/supabase'
import './functions/miscEventListeners.ts'
import { useEffect } from 'react'
import AddBookPage from './routes/books/AddBookPage'
import AuthConfirm from './routes/auth/Confirm.tsx'
import CheckMailNewAccountPage from './routes/account/CheckMailNewAccountPage'
import CheckMailPasswordPage from './routes/account/CheckMailPasswordPage'
import ClearMyBooks from './routes/books/ClearMyBooks'
import DashboardPage from './routes/account/DashboardPage'
import FavoritesPage from './routes/books/FavoritesPage'
import FinishedPage from './routes/books/FinishedPage'
import NavWrapper from './components/NavWrapper'
import ReadingPage from './routes/books/ReadingPage'
import RootPage from './routes/RootPage'
import SavedBooksPage from './routes/books/SavedBooksPage'
import SearchPage from './routes/books/SearchPage'
import UserLoginPage from './routes/account/UserLoginPage'
import UserLogoutPage from './routes/account/UserLogoutPage'
import UserProfilePage from './routes/account/UserProfilePage'
import WishlistPage from './routes/books/WishlistPage'
import { Routes, Route } from 'react-router-dom'
import { createContext, useState } from 'react'
import { localStorageKey } from '../utils/supabase'
import LoadLibrary from './routes/books/LoadLibrary.tsx'

export const AppContext = createContext<AppContextType>({} as AppContextType)

const App = () => {
	let userIsLoggedInInitVal: boolean
	if (localStorage.getItem(localStorageKey)) userIsLoggedInInitVal = true
	else userIsLoggedInInitVal = false

	const [username, setUsername] = useState<string>('')
	const [usermail, setUsermail] = useState<string>('')
	const [userid, setUserid] = useState<string>('')
	const [userMyBooks, setUserMyBooks] = useState<Books>([])
	const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(userIsLoggedInInitVal)
	const [popupNotification, setPopupNotification] = useState<string>('')
	const [popupNotificationShow, setPopupNotificationShow] = useState<boolean>(false)
	const [initialMyBooksSet, setInitialMyBooksSet] = useState<boolean>(false)

	// add persistency to userMyBooks state throughout page refreshes
	const csMyBooks = async () => {
		let booksArr: Books
		const res = await supabase.from('user_entries').select('json')
		if (res.data) {
			setInitialMyBooksSet(true)
			booksArr = res.data[0].json
			setUserMyBooks(booksArr)
			return booksArr
		}
	}

	useEffect(() => {
		if (userIsLoggedIn === true && userMyBooks.length < 1) csMyBooks()
	}, [userIsLoggedIn, initialMyBooksSet, userMyBooks.length])
	// /add persistency to userMyBooks state throughout page refreshes

	if (username === '' && localStorage.getItem(localStorageKey))
		setUsername(JSON.parse(localStorage.getItem(localStorageKey) as string).user.user_metadata.screenname)

	if (userid === '' && localStorage.getItem(localStorageKey))
		setUserid(JSON.parse(localStorage.getItem(localStorageKey) as string).user.id)

	if (userIsLoggedIn) document.getElementsByTagName('html')[0].classList.add('loggedin')
	else document.getElementsByTagName('html')[0].classList.remove('loggedin')

	function popper() {
		let ret: string
		if (popupNotification) ret = popupNotification
		else ret = ''
		setTimeout(() => setPopupNotification(''), 1000)
		return <>{ret}</>
	}

	return (
		<>
			<AppContext.Provider
				value={{
					username,
					setUsername,
					usermail,
					setUsermail,
					userid,
					setUserid,
					userMyBooks,
					setUserMyBooks,
					userIsLoggedIn,
					setUserIsLoggedIn,
					popupNotification,
					setPopupNotification,
					popupNotificationShow,
					setPopupNotificationShow,
				}}
			>
				{userIsLoggedIn && (
					<header id="header">
						<NavWrapper />
					</header>
				)}
				<main id="main" className="textwrapper">
					<div id="popupNotification" className={popupNotification ? 'show' : 'hide'}>
						{popupNotification && <>{popper()}</>}
					</div>
					<Routes>
						<Route path="/*" Component={RootPage} />
						<Route path="/account/login" Component={UserLoginPage} />
						<Route path="/account/forgotpassword" Component={CheckMailPasswordPage} />
						<Route path="/account/logout" Component={UserLogoutPage} />
						<Route path="/auth/confirm" Component={AuthConfirm} />
						<Route path="/account/new" Component={CheckMailNewAccountPage} />
						{userIsLoggedIn && (
							<>
								<Route path="/account/profile" Component={UserProfilePage} />
								<Route path="/account/*" Component={UserLoginPage} />
								<Route path="/dashboard" Component={DashboardPage} />
								<Route path="/search" Component={SearchPage} />
								<Route path="/add-book" Component={AddBookPage} />
								<Route path="/saved-books" Component={SavedBooksPage} />
								<Route path="/wishlist" Component={WishlistPage} />
								<Route path="/reading" Component={ReadingPage} />
								<Route path="/finished" Component={FinishedPage} />
								<Route path="/favorites" Component={FavoritesPage} />
								<Route path="/clear-my-books" Component={ClearMyBooks} />
								<Route path="/loadlibrary" Component={LoadLibrary} />
							</>
						)}
					</Routes>
				</main>
			</AppContext.Provider>
		</>
	)
}
export default App
