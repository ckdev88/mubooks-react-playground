import { useContext } from 'react'
import { supabase } from '../../utils/supabase'
import { AppContext } from '../App'

interface UseMyBooksUpdateDbProps {
	myBooksNew: Books
	book_id: Book['id']
	msg: string
}

const useMyBooksUpdateDb = ({ myBooksNew, book_id, msg }: UseMyBooksUpdateDbProps): (() => Promise<void>) => {
	const { setPopupNotification, userid } = useContext(AppContext)
	const updateMyBooksDb = async (): Promise<void> => {
		const { error } = await supabase
			.from('user_entries')
			.update({ json: myBooksNew, testdata: `${msg} for book: ${book_id}` })
			.eq('user_id', userid)
			.select('*')
		if (error) msg = error.message
		setPopupNotification(msg)
	}
	return updateMyBooksDb
}

export default useMyBooksUpdateDb
