// TODO: add remove method
import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import { cleanIndexKey, cleanInput } from '../helpers/cleanInput'
import { supabase } from '../../utils/supabase'

const TropesDisliked = () => {
	const { setNavTitle, setPopupNotification, userid } = useContext(AppContext)
	const [showLikedDislikedTropesForm, setShowLikedTropesForm] = useState<boolean>(false)
	const [likedDislikedTropes, setLikedDislikedTropes] = useState<BookTropes>([])
	const tropesDb = async () => {
		const res = await supabase.from('user_entries').select('tropes_disliked')
		if (res.data) {
			setLikedDislikedTropes(res.data[0].tropes_disliked)
		}
	}
	useEffect(() => {
		tropesDb()
	}, [setNavTitle])

	useEffect(() => {
		if (showLikedDislikedTropesForm === true) document.getElementById('trope_add_disliked')?.focus()
	}, [showLikedDislikedTropesForm])

	async function processLikedDislikedTropeAddForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		let tropeLikedDisliked: string
		if (e.currentTarget.trope_add_disliked.value !== undefined) {
			tropeLikedDisliked = cleanInput(e.currentTarget.trope_add_disliked.value, false)
			setLikedDislikedTropes([...likedDislikedTropes, tropeLikedDisliked])
			e.currentTarget.trope_add_disliked.value = ''
			e.currentTarget.trope_add_disliked.focus()
			let msg: string
			const { error } = await supabase
				.from('user_entries')
				.update({
					tropes_disliked: [...likedDislikedTropes, tropeLikedDisliked],
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
		if (likedDislikedTropes.length === 0) setShowLikedTropesForm(true)
	}, [likedDislikedTropes])

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
						className={showLikedDislikedTropesForm ? 'btn-sm mb0 active' : 'btn-sm mb0'}
						onClick={() => setShowLikedTropesForm(!showLikedDislikedTropesForm)}
					>
						{tropes.length > 0 ? <>+</> : <>Add tropes</>}
					</button>
				</li>
			</ul>
		)
	}
	return (
		<>
			<h2>Dislike</h2>
			<div>
				{likedDislikedTropes && likedDislikedTropes.length > 0 && <TropesList tropes={likedDislikedTropes} />}
				{showLikedDislikedTropesForm && (
					<>
						<form className="single-small-form clr" onSubmit={processLikedDislikedTropeAddForm}>
							<input
								type="text"
								name="trope_add_disliked"
								id="trope_add_disliked"
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
export default TropesDisliked
