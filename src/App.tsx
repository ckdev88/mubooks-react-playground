// TODO check if setPopupNotificationShow is still used or useful
import { supabase } from '../utils/supabase'
import './functions/miscEventListeners.ts'
import { useEffect } from 'react'
import AuthConfirm from './routes/auth/Confirm'
import ResetPasswordPage from './routes/auth/ResetPasswordPage'
import CheckMailNewAccountPage from './routes/account/CheckMailNewAccountPage'
import CheckMailPasswordPage from './routes/account/CheckMailPasswordPage'
import DashboardPage from './routes/account/DashboardPage'
import ErrorPage from './routes/ErrorPage'
import FavoritesPage from './routes/books/FavoritesPage'
import FinishedPage from './routes/books/FinishedPage'
import NavWrapper from './components/NavWrapper'
import QuotedPage from './routes/books/QuotedPage'
import ReadingPage from './routes/books/ReadingPage'
import RootPage from './routes/RootPage'
import SavedBooksPage from './routes/books/SavedBooksPage'
import SearchPage from './routes/books/SearchPage'
import StatisticsPage from './routes/books/StatisticsPage'
import TropesPage from './routes/books/TropesPage'
import UserLoginPage from './routes/account/UserLoginPage'
import UserLogoutPage from './routes/account/UserLogoutPage'
import UserProfilePage from './routes/account/UserProfilePage'
import WishlistPage from './routes/books/WishlistPage'
import ClearMyBooks from './routes/books/ClearMyBooks'
import { Routes, Route } from 'react-router-dom'
import { createContext, useState } from 'react'
import { localStorageKey } from '../utils/supabase'
import { timestampConverter } from './helpers/convertDate.ts'
import AddBookPage from './routes/books/AddBookPage'
import PopupNotification from './components/ui/PopupNotification'

export const AppContext = createContext<AppContextType>({} as AppContextType)

const todaysDateInput = timestampConverter(Date.now(), 'input')
const todaysDateDigit = Number(timestampConverter(Date.now(), 'digit'))
const bgColorLight: string = '#f4f1ea'
const bgColorDark: string = '#152129'

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
	const [bookFilter, setBookFilter] = useState<string>('')
	const [darkTheme, setDarkTheme] = useState<undefined | boolean>(undefined)
	const [bodyBgColor, setBodyBgColor] = useState<string>(darkTheme ? bgColorDark : bgColorLight)

	// Settings
	const settingsHeadingIconsEnabled = false
	const settingsSynopsisEnabled = false

	/* NOTE
	 * 3 kinds of settings?
	 * - user settings, like theme (light|dark)
	 * - global settings, like icons true|false ?
	 * - admin settings, like
	 *   - synopsisOL
	 *   - coverHotlinkOl
	 */

	// add persistency to userMyBooks state throughout page refreshes
	const persistentMyBooks = async () => {
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
		if (userIsLoggedIn === true && userMyBooks.length < 1) persistentMyBooks()
	}, [userIsLoggedIn, initialMyBooksSet, userMyBooks.length])
	// /add persistency to userMyBooks state throughout page refreshes

	if (username === '' && localStorage.getItem(localStorageKey))
		setUsername(JSON.parse(localStorage.getItem(localStorageKey) as string).user.user_metadata.screenname)

	if (darkTheme === undefined && localStorage.getItem(localStorageKey)) {
		const dtInitVal = JSON.parse(localStorage.getItem(localStorageKey) as string).user.user_metadata.darktheme
		if (dtInitVal !== undefined) setDarkTheme(dtInitVal)
	}

	if (userid === '' && localStorage.getItem(localStorageKey))
		setUserid(JSON.parse(localStorage.getItem(localStorageKey) as string).user.id)

	if (userIsLoggedIn) document.getElementsByTagName('html')[0].classList.add('loggedin')
	else document.getElementsByTagName('html')[0].classList.remove('loggedin')

	useEffect(() => {
		const htmlNode = document.getElementsByTagName('html')[0]
		if (darkTheme === true) {
			if (!htmlNode.classList.contains('dark-mode')) htmlNode.classList.add('dark-mode')
			setBodyBgColor(bgColorDark)
		} else {
			htmlNode.classList.remove('dark-mode')
			setBodyBgColor(bgColorLight)
		}
	}, [darkTheme])

	// TODO react19: when react19 official is released & eslint updated: refactor <AppContext.Provider... to AppContext...
	return (
		<AppContext.Provider
			value={{
				popupNotification,
				popupNotificationShow,
				bookFilter,
				setBookFilter,
				setPopupNotification,
				setPopupNotificationShow,
				setUserIsLoggedIn,
				setUserMyBooks,
				setUserid,
				setUsermail,
				setUsername,
				todaysDateInput,
				todaysDateDigit,
				userIsLoggedIn,
				userMyBooks,
				userid,
				usermail,
				username,
				setDarkTheme,
				darkTheme,
				bodyBgColor,
				settingsHeadingIconsEnabled,
				settingsSynopsisEnabled,
			}}
		>
			{userIsLoggedIn && (
				<header id="header" className="shade">
					<NavWrapper />
				</header>
			)}
			<main id="main" className="main">
				<PopupNotification />
				<Routes>
					<Route path="/*" element={<RootPage />} />
					<Route path="/error" element={<ErrorPage />} />
					<Route path="/account/login" element={<UserLoginPage />} />
					<Route path="/account/logout" element={<UserLogoutPage />} />
					<Route path="/auth/confirm" element={<AuthConfirm />} />
					{!userIsLoggedIn && (
						<>
							<Route path="/auth/resetpassword" element={<ResetPasswordPage />} />
							<Route path="/account/forgotpassword" element={<CheckMailPasswordPage />} />
						</>
					)}
					<Route path="/account/new" element={<CheckMailNewAccountPage />} />
					{userIsLoggedIn && (
						<>
							<Route path="/account/profile" element={<UserProfilePage />} />
							<Route path="/account/*" element={<UserLoginPage />} />
							<Route path="/dashboard" element={<DashboardPage />} />
							<Route path="/search" element={<SearchPage />} />
							<Route path="/addbook" element={<AddBookPage />} />
							<Route path="/savedbooks" element={<SavedBooksPage />} />
							<Route path="/wishlist" element={<WishlistPage />} />
							<Route path="/reading" element={<ReadingPage />} />
							<Route path="/finished" element={<FinishedPage />} />
							<Route path="/favorites" element={<FavoritesPage />} />
							<Route path="/quoted" element={<QuotedPage />} />
							<Route path="/tropes" element={<TropesPage />} />
							<Route path="/statistics" element={<StatisticsPage />} />
							<Route path="/clear-my-books" element={<ClearMyBooks />} />
						</>
					)}
				</Routes>
			</main>
		</AppContext.Provider>
	)
}
export default App
