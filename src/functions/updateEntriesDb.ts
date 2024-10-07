import { supabase } from '../../utils/supabase'

// very much alike ./src/functions/updateTropesDb.ts
async function updateEntriesDb(newArr: Books, userid: string): Promise<string> {
	let msg: string = ''
	const { error } = await supabase
		.from('user_entries')
		.update({
			json: newArr,
			testdata: 'updated book specific tropes',
		})
		.eq('user_id', userid)
		.select('*')
	if (error) msg = error.message
	else msg = 'Updated.'
	return msg
}

export default updateEntriesDb
