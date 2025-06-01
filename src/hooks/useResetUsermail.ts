import { useContext } from "react"
import { supabase } from "../../utils/supabase"
import { AppContext } from "../App"

/** re-sets users email address from database if none is available in state */
async function useResetUsermail(): Promise<void> {
    const { usermail, setUsermail } = useContext(AppContext)

    if (usermail !== undefined && usermail !== "") return
    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (user) setUsermail(String(user?.email))
}
export default useResetUsermail
