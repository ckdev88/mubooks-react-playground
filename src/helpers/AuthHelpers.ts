import { supabase } from '../../utils/supabase'

const UserSignup = async (user: User) => {
	const { data, error } = await supabase.auth.signUp({
		email: user.email,
		password: user.password,
		options: {
			data: { screenname: user.screenname, MyBooks: '[]' },
		},
	})
	return { error, data }
}

const UserLogin = async (user: User) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: user.email,
		password: user.password,
	})
	return { error, data }
}

const UserGetData = async () => {
	const { data, error } = await supabase.auth.getUser()
	return { data, error }
}

const UserUpdate = async (form_username: string, form_usermail: string, form_userpass: string) => {
	if (form_userpass !== '') {
		const { error } = await supabase.auth.updateUser({
			email: form_usermail,
			password: form_userpass,
			data: { screenname: form_username },
		})
		return { error }
		// if(error){return error}
		// else afterUpdateSb(form_username, form_usermail)
	} else {
		const { error } = await supabase.auth.updateUser({
			email: form_usermail,
			data: { screenname: form_username },
		})
		// TODO: use error to show to user
		// if(error){return error}
		return { error }
		// else afterUpdateSb(form_username, form_usermail)
	}
}

const UserLogout = async () => {
	let { error } = await supabase.auth.signOut()
	if (error === null) {
		console.log('logged out')
	} else {
		return error
	}
	return error
}
export { UserSignup, UserLogin, UserGetData, UserUpdate, UserLogout }
