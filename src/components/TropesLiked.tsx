import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../App'
import { cleanIndexKey, cleanInput } from '../helpers/cleanInput'
import { supabase } from '../../utils/supabase'
import BtnInsideCaret from './ui/BtnInsideCaret'
import { TropesPageContext } from '../routes/books/TropesPage'

const TropesLiked = () => {
	const { setLikedTropes, likedTropes, likedTropesLowercase } = useContext(TropesPageContext)
	const { setPopupNotification, userid } = useContext(AppContext)
	const [showForm, setShowForm] = useState<boolean>(false)
	const tropesDb = async () => {
		const res = await supabase.from('user_entries').select('tropes_liked')
		if (res.data) {
			const lt: BookTropes = res.data[0].tropes_liked
			const ltSet = new Set<string>()
			lt.map((t) => ltSet.add(t.trim().toLowerCase()))
			console.log('ltSet:', ltSet)

			setLikedTropes(res.data[0].tropes_liked)
		}
	}

	useEffect(() => {
		tropesDb()
	}, [])

	useEffect(() => {
		if (showForm === true) document.getElementById('trope_add_liked')?.focus()
	}, [showForm])

	async function processLikedTropeAddForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		let tropeLiked: string
		if (e.currentTarget.trope_add_liked.value !== undefined) {
			tropeLiked = cleanInput(e.currentTarget.trope_add_liked.value, false)

			if (tropeLiked.length < 2 || likedTropesLowercase.includes(tropeLiked.toLowerCase())) return

			const newArr = [...likedTropes, tropeLiked]
			updateTropes(newArr)

			e.currentTarget.trope_add_liked.value = ''
			e.currentTarget.trope_add_liked.focus()
		}
	}

	async function updateTropes(newArr: string[]) {
		setLikedTropes(newArr)
		let msg: string
		const { error } = await supabase
			.from('user_entries')
			.update({
				tropes_liked: newArr,
				testdata: 'updated tropes',
			})
			.eq('user_id', userid)
			.select('*')
		if (error) msg = error.message
		else msg = 'Updated tropes.'
		setPopupNotification(msg)
	}

	function removeTrope(trope: string) {
		const newArr = likedTropes.filter((trp) => trp !== trope)
		updateTropes(newArr)
	}

	const TropesList = ({ tropes }: { tropes: BookTropes }) => {
		return (
			<ul className="tropes clr mb0">
				{tropes.map((trope, index) => (
					<li className="trope badge cgreen" key={cleanIndexKey(trope, index)}>
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
			<h2>Like</h2>
			<div>
				<TropesList tropes={likedTropes} />
				{showForm && (
					<>
						<form className="single-small-form clr" onSubmit={processLikedTropeAddForm}>
							<input type="text" name="trope_add_liked" id="trope_add_liked" placeholder="Add a trope..." />
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
export default TropesLiked
