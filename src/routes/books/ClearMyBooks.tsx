import { useContext } from 'react'
import { AppContext } from '../../App'
// import { MyBooksUpdate } from '../../helpers/MyBooksHelpers'
import { supabase } from '../../../utils/supabase'

export default function ClearMyBooks() {
	const { setUserMyBooks, setPopupNotification, userid } = useContext(AppContext)
	async function clearbooksyes(): Promise<void> {
		let msg: string
		setUserMyBooks([])
		const { error } = await supabase.from('user_entries').update({ json: [] }).eq('user_id', userid).select()
		if (error) {
			msg = 'Error, data was not changed'
			console.log('error:', error)
		} else msg = 'Updated Mu Books.'

		setPopupNotification(msg)
	}

	return <button onClick={() => clearbooksyes()}>Clear my books</button>
}
