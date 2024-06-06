// TODO: add remove method
// TODO: collapse 'add a trope'-from on page load and tropes length > 0
import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import { cleanIndexKey, cleanInput } from '../helpers/cleanInput'
import { supabase } from '../../utils/supabase'

const TropesLiked = () => {
	const { setNavTitle, setPopupNotification, userid } = useContext(AppContext)
	const [showLikedTropesForm, setShowLikedTropesForm] = useState<boolean>(false)
	const [likedTropes, setLikedTropes] = useState<BookTropes>([])
	const tropesDb = async () => {
		const res = await supabase.from('user_entries').select('tropes_liked')
		if (res.data) {
			setLikedTropes(res.data[0].tropes_liked)
		}
	}
	useEffect(() => {
		tropesDb()
	}, [setNavTitle])

	useEffect(() => {
		if (showLikedTropesForm === true) document.getElementById('trope_add_liked')?.focus()
	}, [showLikedTropesForm])

	async function processLikedTropeAddForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		let tropeLiked: string
		if (e.currentTarget.trope_add_liked.value !== undefined) {
			tropeLiked = cleanInput(e.currentTarget.trope_add_liked.value, false)
			setLikedTropes([...likedTropes, tropeLiked])
			e.currentTarget.trope_add_liked.value = ''
			e.currentTarget.trope_add_liked.focus()
			let msg: string
			const { error } = await supabase
				.from('user_entries')
				.update({
					tropes_liked: [...likedTropes, tropeLiked],
					testdata: 'updated from tropes: Add liked trope',
				})
				.eq('user_id', userid)
				.select('*')
			if (error) msg = error.message
			else msg = 'Updated liked tropes.'
			setPopupNotification(msg)
		}
	}

	const cancelSubmit = (): void => {
		console.log('cancel')
		setShowLikedTropesForm(false)
	}
	useEffect(() => {
		if (likedTropes.length === 0) setShowLikedTropesForm(true)
	}, [likedTropes])

	const TropesList = ({ tropes }: { tropes: BookTropes }) => {
		if (tropes === undefined) return
		return (
			<ul className="tropes clr mb0">
				{tropes.map((trope, index) => (
					<li className="trope badge" key={cleanIndexKey(trope, index)}>
						{trope}
					</li>
				))}
				<li className="trope_add">
					<button
						className={showLikedTropesForm ? 'btn-sm mb0 active' : 'btn-sm mb0'}
						onClick={() => setShowLikedTropesForm(!showLikedTropesForm)}
					>
						{tropes.length > 0 ? <>+</> : <>Add tropes</>}
					</button>
				</li>
			</ul>
		)
	}
	return (
		<>
			<h2>Like</h2>
			<div>
				{likedTropes && likedTropes.length > 0 && <TropesList tropes={likedTropes} />}
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
						<button className="btn-text btn-text-cancel" onClick={() => cancelSubmit()}>
							Cancel
						</button>
					</>
				)}
			</div>
		</>
	)
}
export default TropesLiked
