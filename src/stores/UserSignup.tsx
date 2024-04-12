import { supabase } from '../../utils/supabase'

const UserSignup = async (user: User) => {
	const { data, error } = await supabase.auth.signUp({
		email: user.email,
		password: user.password,
		options: {
			data: { screenname: user.screenname, MyBooks: '[]' },
		},
	})
	return {error,data}
}
export default UserSignup
