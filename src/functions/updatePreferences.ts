import { supabase } from "../../utils/supabase"
async function updatePreferences(darkTheme = false): Promise<void> {
    const { error } = await supabase.auth.updateUser({
        data: { darktheme: darkTheme },
    })
    if (error) console.error(error.message)
}
export default updatePreferences
