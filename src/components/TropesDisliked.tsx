import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import { cleanIndexKey, cleanInput } from '../helpers/cleanInput'
import { supabase } from '../../utils/supabase'
import BtnInsideCaret from './ui/BtnInsideCaret'
import { TropesPageContext } from '../routes/books/TropesPage'

const TropesDisliked = () => {
	const { setDislikedTropes, dislikedTropes, dislikedTropesLowercase } =
		useContext(TropesPageContext)
	const { setPopupNotification, userid } = useContext(AppContext)
	const [showForm, setShowForm] = useState<boolean>(false)
	const tropesDb = async () => {
		const res = await supabase.from('user_entries').select('tropes_disliked')
		if (res.data) setDislikedTropes(res.data[0].tropes_disliked)
	}

	useEffect(() => {
		tropesDb()
	}, [])

	useEffect(() => {
		if (showForm === true) document.getElementById('trope_add_disliked')?.focus()
	}, [showForm])

	async function processDislikedTropeAddForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		let tropeDisliked: string
		if (e.currentTarget.trope_add_disliked.value !== undefined) {
			tropeDisliked = cleanInput(e.currentTarget.trope_add_disliked.value, false)
			if (tropeDisliked.length < 2 || dislikedTropesLowercase.includes(tropeDisliked.toLowerCase()))
				return

			const newArr = [...dislikedTropes, tropeDisliked]
			updateTropes(newArr)

			e.currentTarget.trope_add_disliked.value = ''
			e.currentTarget.trope_add_disliked.focus()
		}
	}
	async function updateTropes(newArr: string[]) {
		setDislikedTropes(newArr)
		let msg: string
		const { error } = await supabase
			.from('user_entries')
			.update({
				tropes_disliked: newArr,
				testdata: 'updated tropes',
			})
			.eq('user_id', userid)
			.select('*')
		if (error) msg = error.message
		else msg = 'Updated tropes.'
		setPopupNotification(msg)
	}

	function removeTrope(trope: string) {
		const newArr = dislikedTropes.filter((t) => t !== trope)
		updateTropes(newArr)
	}

	const TropesList = ({ tropes }: { tropes: BookTropes }) => {
		return (
			<ul className="tropes clr mb0">
				{tropes.map((trope, index) => (
					<li className="trope badge cred" key={cleanIndexKey(trope, index)}>
						{trope}
						<button className="btn-x" onClick={() => removeTrope(trope)}>
							x
						</button>
					</li>
				))}
				<li className="trope_add">
					<button
						className={showForm ? 'btn-sm mb0 active' : 'btn-sm mb0'}
						onClick={() => setShowForm(!showForm)}
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
				<TropesList tropes={dislikedTropes} />
				{showForm && (
					<>
						<form className="single-small-form clr" onSubmit={processDislikedTropeAddForm}>
							<input
								type="text"
								name="trope_add_disliked"
								id="trope_add_disliked"
								placeholder="Add a trope..."
							/>
							<BtnInsideCaret />
						</form>
						<button className="btn-text btn-text-cancel" onClick={() => setShowForm(false)}>
							Cancel
						</button>
					</>
				)}
			</div>
		</>
	)
}
export default TropesDisliked
