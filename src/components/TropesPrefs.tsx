import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import { cleanIndexKey, cleanInput } from '../helpers/cleanInput'
import { supabase } from '../../utils/supabase'
import BtnInsideCaret from './ui/BtnInsideCaret'
import { TropesPageContext } from '../routes/books/TropesPage'
import updateTropesDb from '../functions/updateTropesDb'

const TropesPrefs = ({ field }: { field: 'tropes_liked' | 'tropes_disliked' }) => {
	const {
		setLikedTropes,
		likedTropes,
		likedTropesLowercase,
		setDislikedTropes,
		dislikedTropes,
		dislikedTropesLowercase,
	} = useContext(TropesPageContext)

	const { setPopupNotification, userid } = useContext(AppContext)
	const [showForm, setShowForm] = useState<boolean>(false)

	const tropesDb = async () => {
		if (field === 'tropes_liked') {
			const res = await supabase.from('user_entries').select('tropes_liked')
			if (res.data) setLikedTropes(res.data[0].tropes_liked)
		} else if (field === 'tropes_disliked') {
			const res = await supabase.from('user_entries').select('tropes_disliked')
			if (res.data) setDislikedTropes(res.data[0].tropes_disliked)
		}
	}
	useEffect(() => {
		tropesDb()
	}, [])

	useEffect(() => {
		if (field === 'tropes_liked' && showForm === true) document.getElementById('trope_add_liked')?.focus()
		if (field === 'tropes_disliked' && showForm === true) document.getElementById('trope_add_disliked')?.focus()
	}, [showForm])

	let tropesLowercase: BookTropes
	let tropesArr: BookTropes
	if (field === 'tropes_liked') {
		tropesLowercase = likedTropesLowercase
		tropesArr = likedTropes
	} else if (field === 'tropes_disliked') {
		tropesLowercase = dislikedTropesLowercase
		tropesArr = dislikedTropes
	}

	async function processTropeAddForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		let tropeToAdd: string
		if (e.currentTarget.trope_add.value !== undefined) {
			tropeToAdd = cleanInput(e.currentTarget.trope_add.value, false)

			if (tropeToAdd.length < 2) return

			if (field === 'tropes_liked') {
				if (dislikedTropesLowercase.includes(tropeToAdd.toLowerCase())) removeTrope(tropeToAdd, 'tropes_disliked')
			} else if (field === 'tropes_disliked') {
				if (likedTropesLowercase.includes(tropeToAdd)) removeTrope(tropeToAdd, 'tropes_liked')
			}
			const indexOfTropeToAdd = tropesLowercase.indexOf(tropeToAdd.toLowerCase())
			if (indexOfTropeToAdd > -1) tropesArr.splice(indexOfTropeToAdd, 1)

			let newArr: BookTropes = []

			newArr = [...tropesArr, tropeToAdd]
			newArr.sort((a, b) => a.localeCompare(b))
			updateTropes(newArr, field)

			e.currentTarget.trope_add.value = ''
			e.currentTarget.trope_add.focus()
		}
	}

	async function updateTropes(newArr: BookTropes, field: 'tropes_liked' | 'tropes_disliked') {
		if (field === 'tropes_liked') setLikedTropes(newArr)
		else if (field === 'tropes_disliked') setDislikedTropes(newArr)
		const msg = await updateTropesDb(newArr, userid, field)
		setPopupNotification(msg)
	}

	async function removeTrope(trope: string, field: 'tropes_liked' | 'tropes_disliked') {
		let newArr: BookTropes = []
		if (field === 'tropes_liked') newArr = likedTropes.filter((t) => t.toLowerCase() !== trope.toLowerCase())
		if (field === 'tropes_disliked') newArr = dislikedTropes.filter((t) => t.toLowerCase() !== trope.toLowerCase())
		updateTropes(newArr, field)
	}

	const TropesList = ({ tropes }: { tropes: BookTropes }) => {
		return (
			<ul className="tropes clr mb0">
				{tropes.map((trope, index) => (
					<li
						className={field === 'tropes_liked' ? 'trope badge cgreen' : 'trope badge cred'}
						key={cleanIndexKey(trope, index)}
					>
						{trope}
						<button className="btn-x" onClick={() => removeTrope(trope, field)}>
							x
						</button>
					</li>
				))}
				<li className="trope_add">
					<button className={showForm ? 'btn-sm mb0 active' : 'btn-sm mb0'} onClick={() => setShowForm(!showForm)}>
						{tropes.length > 0 ? <>+</> : <>Add tropes</>}
					</button>
				</li>
			</ul>
		)
	}

	return (
		<>
			<h2>{field === 'tropes_liked' ? 'Like' : 'Dislike'}</h2>
			<div>
				<TropesList tropes={field === 'tropes_liked' ? likedTropes : dislikedTropes} />
				{showForm && (
					<>
						<form className="single-small-form clr" onSubmit={processTropeAddForm}>
							<input
								type="text"
								name="trope_add"
								id={field === 'tropes_liked' ? 'trope_add_liked' : 'trope_add_disliked'}
								placeholder="Add a trope..."
							/>
							<BtnInsideCaret />
						</form>
						<button className="btn-text btn-text-cancel wauto" onClick={() => setShowForm(false)}>
							Cancel
						</button>
					</>
				)}
			</div>
		</>
	)
}
export default TropesPrefs
