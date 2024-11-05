/* when splitting, basically became a copy of TropesPrefs.tsx, comment for now
import { useState, useContext } from 'react'
import { TropesPageContext } from '../routes/books/TropesPage'
import { cleanIndexKey } from '../helpers/cleanInput'
import { AppContext } from '../App'
import updateTropesDb from '../functions/updateTropesDb'
import BtnInsideCaret from './ui/BtnInsideCaret'
import { cleanInput } from '../helpers/cleanInput'

const TropesList = ({ tropes, field }: { tropes: BookTropes; field: 'tropes_liked' | 'tropes_disliked' }) => {
	const {
		setLikedTropes,
		likedTropes,
		likedTropesLowercase,
		setDislikedTropes,
		dislikedTropes,
		dislikedTropesLowercase,
	} = useContext(TropesPageContext)
	const { setPopupNotification, userid } = useContext(AppContext)
	let tropesLowercase: BookTropes
	let tropesArr: BookTropes
	const [showForm, setShowForm] = useState<boolean>(false)
	if (field === 'tropes_liked') {
		tropesLowercase = likedTropesLowercase
		tropesArr = likedTropes
	} else if (field === 'tropes_disliked') {
		tropesLowercase = dislikedTropesLowercase
		tropesArr = dislikedTropes
	}
	async function updateTropes(newArr: BookTropes, field: 'tropes_liked' | 'tropes_disliked') {
		if (field === 'tropes_liked') setLikedTropes(newArr)
		else if (field === 'tropes_disliked') setDislikedTropes(newArr)
		const msg = await updateTropesDb(newArr, userid, field)
		setPopupNotification(msg)
	}
	function removeTrope(trope: string, field: 'tropes_liked' | 'tropes_disliked') {
		let newArr: BookTropes = []
		if (field === 'tropes_liked') newArr = likedTropes.filter((t) => t.toLowerCase() !== trope.toLowerCase())
		if (field === 'tropes_disliked') newArr = dislikedTropes.filter((t) => t.toLowerCase() !== trope.toLowerCase())
		updateTropes(newArr, field)
	}
	async function processForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const tropeToAdd: string = cleanInput(e.currentTarget.trope_add.value, false)
		if (tropeToAdd !== undefined && tropeToAdd.length > 2) {
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

	return (
		<div className="tropes">
			{tropes.map((trope, index) => (
				<div
					className={field === 'tropes_liked' ? 'trope badge cgreen' : 'trope badge cred'}
					key={cleanIndexKey(trope, index)}
				>
					{trope}
					<button className="btn-x" onClick={() => removeTrope(trope, field)}>
						x
					</button>
				</div>
			))}
			<li className="trope_add">
				<button className={showForm ? 'btn-sm mb0 active' : 'btn-sm mb0'} onClick={() => setShowForm(!showForm)}>
					{tropes.length > 0 ? <>+</> : <>Add tropes</>}
				</button>
			</li>

				{showForm && (
					<>
						<form className="single-small-form clr" onSubmit={processForm}>
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
	)
}
export default TropesList
*/
