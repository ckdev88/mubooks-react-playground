import { supabase } from '../../utils/supabase'

const UserLogin = async (user: User) => {
	let { data, error } = await supabase.auth.signInWithPassword({
		email: user.email,
		password: user.password,
	})
	return { error, data }
}
export default UserLogin
