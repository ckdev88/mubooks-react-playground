import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../App'
import { cleanIndexKey, cleanInput } from '../../helpers/cleanInput'
import BooksOverviewPage from './BooksOverviewPage'
import TropesInMyBooks from '../../components/TropesInMyBooks'
import { supabase } from '../../../utils/supabase'

const pageTitle = 'Tropes'
const TropesPage = () => {
	const { userMyBooks, setNavTitle, setPopupNotification, userid } = useContext(AppContext)
	const [showLikedTropesForm, setShowLikedTropesForm] = useState<boolean>(false)
	const [showDislikedTropesForm, setShowDislikedTropesForm] = useState<boolean>(false)

	const [likedTropes, setLikedTropes] = useState<string>('')
	const [dislikedTropes, setDislikedTropes] = useState<string>('')
	const tropesDb = async () => {
		const res = await supabase.from('user_entries').select('tropes_like,tropes_dislike')
		if (res.data) {
			if (res.data[0].tropes_like === 'null') setLikedTropes('')
			else setLikedTropes(res.data[0].tropes_like)

			if (res.data[0].tropes_dislike === 'null') setDislikedTropes('')
			else setDislikedTropes(res.data[0].tropes_dislike)
		}
	}

	useEffect(() => {
		if (showLikedTropesForm === true) document.getElementById('trope_add_' + (likedTropes.length + 1))?.focus()
		if (showDislikedTropesForm === true)
			document.getElementById('trope_add_' + (dislikedTropes.length + 1))?.focus()
	}, [showLikedTropesForm, showDislikedTropesForm])

	useEffect(() => {
		setNavTitle(pageTitle)
		tropesDb()
	}, [setNavTitle])
	const [activeTrope, setActiveTrope] = useState<string>('')
	const [tropeBooks, setTropeBooks] = useState<Books>([])
	const tropesSet = new Set<string>()
	userMyBooks.map((book) => {
		if (book.review_tropes) book.review_tropes.map((reviewtrope) => tropesSet.add(reviewtrope))
	})
	const tropesArr = Array.from(tropesSet)

	function showTropeBooks(trope: string) {
		const tropeBooksFiltered = userMyBooks.filter(
			(book: Book) =>
				book.review_tropes !== undefined && book.review_tropes.length > 0 && book.review_tropes.includes(trope)
		)
		setTropeBooks(tropeBooksFiltered)
		setActiveTrope(trope)
	}
	const [isModding, setIsModding] = useState(false)
	console.log(isModding)
	async function removeTrope(trope: string, liked: boolean) {
		setIsModding(true)
		if (liked === true) {
			setLikedTropes(
				likedTropes
					.split(',')
					.filter((likedtrope) => likedtrope !== trope)
					.join(',')
			)

			let msg: string
			const { error } = await supabase
				.from('user_entries')
				.update({ tropes_like: likedTropes, testdata: 'updated from tropes: remove liked trope' })
				.eq('user_id', userid)
				.select('*')
			if (error) msg = error.message
			else msg = 'Updated liked tropes.'
			setPopupNotification(msg)
		}
		if (liked === false) {
			setDislikedTropes(
				dislikedTropes
					.split(',')
					.filter((dislikedtrope) => dislikedtrope !== trope)
					.join(',')
			)
			let msg: string
			const { error } = await supabase
				.from('user_entries')
				.update({ tropes_dislike: dislikedTropes, testdata: 'updated from tropes: remove disliked trope' })
				.eq('user_id', userid)
				.select('*')
			if (error) msg = error.message
			else msg = 'Updated disliked tropes.'
			setPopupNotification(msg)
		}
	}
	async function processLikedTropeAddForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		let tropeLiked: string
		if (e.currentTarget.trope_add_liked.value !== undefined) {
			setIsModding(true)
			tropeLiked = cleanInput(e.currentTarget.trope_add_liked.value, false)
			setLikedTropes(likedTropes + ',' + tropeLiked) // set or array with unique check would be nicer
			e.currentTarget.trope_add_liked.value = ''
			e.currentTarget.trope_add_liked.focus()
		}
		let msg: string
		const { error } = await supabase
			.from('user_entries')
			.update({ tropes_like: likedTropes, testdata: 'updated from tropes: Add liked trope' })
			.eq('user_id', userid)
			.select('*')
		if (error) msg = error.message
		else msg = 'Updated liked tropes.'
		setPopupNotification(msg)
	}

	// TODO: + expand & collapse in harmonie maken
	// TODO: default NULL replacement by nothing
	async function processDislikedTropeAddForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		let tropeDisliked: string
		if (e.currentTarget.trope_add_disliked.value !== undefined) {
			console.log('disliked')
			setIsModding(true)
			tropeDisliked = cleanInput(e.currentTarget.trope_add_disliked.value, false)
			console.log('tropedisliked', tropeDisliked)
			setDislikedTropes(dislikedTropes + ',' + tropeDisliked) // set or array with unique check would be nicer
			e.currentTarget.trope_add_disliked.value = ''
			e.currentTarget.trope_add_disliked.focus()
		}
		let msg: string
		const { error } = await supabase
			.from('user_entries')
			.update({ tropes_dislike: dislikedTropes, testdata: 'updated from tropes: Add disliked trope' })
			.eq('user_id', userid)
			.select('*')
		if (error) msg = error.message
		else msg = 'Updated disliked tropes.'
		console.log(dislikedTropes)
		setPopupNotification(msg)
	}

	const cancelSubmit = (liked: boolean): void => {
		if (liked) setShowLikedTropesForm(false)
		else setShowDislikedTropesForm(false)

		setShowLikedTropesForm(false)
		setShowDislikedTropesForm(false)
		setIsModding(false)
	}

	useEffect(() => {
		if (!likedTropes) setShowLikedTropesForm(true)
		if (!dislikedTropes) setShowDislikedTropesForm(true)
	}, [likedTropes, dislikedTropes])
	const TropesList = ({ tropes, liked }: { tropes: string; liked: string }) => {
		if (tropes === undefined) return
		return (
			<ul className="tropes clr mb0">
				{tropes.split(',').map((trope, index) => (
					<li className="trope badge" key={cleanIndexKey(trope, index)}>
						{trope}
						{liked === 'liked' && (
							<button className="btn-x" onClick={() => removeTrope(trope, true)}>
								X
							</button>
						)}
						{liked === 'disliked' && (
							<button className="btn-x" onClick={() => removeTrope(trope, false)}>
								x
							</button>
						)}
					</li>
				))}
				{!showLikedTropesForm && (
					<li className="trope_add">
						{liked === 'liked' && (
							<button
								className={showLikedTropesForm ? 'btn-sm mb0 active' : 'btn-sm mb0'}
								onClick={() => setShowLikedTropesForm(!showLikedTropesForm)}
							>
								{tropes.length > 0 ? <>+</> : <>Add tropes</>}
							</button>
						)}
						{liked === 'disliked' && (
							<button
								className={showDislikedTropesForm ? 'btn-sm mb0 active' : 'btn-sm mb0'}
								onClick={() => setShowDislikedTropesForm(!showDislikedTropesForm)}
							>
								{tropes.length > 0 ? <>+</> : <>Add tropes</>}
							</button>
						)}
					</li>
				)}
			</ul>
		)
	}

	return (
		<>
			<h1>My Tropes</h1>
			<h2>Like</h2>
			<div>
				{likedTropes && likedTropes.length > 0 && <TropesList tropes={likedTropes} liked="liked" />}
				{showLikedTropesForm && (
					<>
						<form className="single-small-form clr" onSubmit={processLikedTropeAddForm}>
							<input
								type="text"
								name="trope_add_liked"
								id="trope_add_liked"
								placeholder="Add a trope..."
							/>
							<button className="btn-submit-inside-caret-right"></button>
						</form>
						<button className="btn-text btn-text-cancel" onClick={() => cancelSubmit(true)}>
							Cancel
						</button>
					</>
				)}
			</div>
			<h2>Dislike</h2>
			<div>
				{dislikedTropes && dislikedTropes.length > 0 && <TropesList tropes={dislikedTropes} liked="disliked" />}

				{showDislikedTropesForm && (
					<>
						<form className="single-small-form clr" onSubmit={processDislikedTropeAddForm}>
							<input
								type="text"
								name="trope_add_disliked"
								id="trope_add_disliked"
								placeholder="Add a trope..."
							/>
							<button className="btn-submit-inside-caret-right"></button>
						</form>
						<button className="btn-text btn-text-cancel" onClick={() => cancelSubmit(false)}>
							Cancel
						</button>
					</>
				)}
			</div>
			<hr />
			<TropesInMyBooks />
		</>
	)
}

export default TropesPage
