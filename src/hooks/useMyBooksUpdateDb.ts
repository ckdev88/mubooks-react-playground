import { supabase } from '../../utils/supabase'

interface UseMyBooksUpdateDbProps {
	myBooksNew: Books
	userid: string
	setPopupNotification: React.Dispatch<React.SetStateAction<string>>
	book_id: Book['id']
	msg: string
}

const useMyBooksUpdateDb = ({
	myBooksNew,
	userid,
	setPopupNotification,
	book_id,
	msg,
}: UseMyBooksUpdateDbProps): (() => Promise<void>) => {
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
