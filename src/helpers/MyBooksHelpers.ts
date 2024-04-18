import { supabase } from '../../utils/supabase'

const MyBooksUpdate = async (myBooksNew: string) => {
	localStorage.setItem('MyBooks', myBooksNew)
	await supabase.auth.updateUser({
		data: { MyBooks: myBooksNew },
	})
}

export { MyBooksUpdate }
