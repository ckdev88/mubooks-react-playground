import { supabase } from "../../utils/supabase"

async function updateTropesDb(
    newArr: BookTropes,
    userid: string,
    field: "tropes_liked" | "tropes_disliked",
): Promise<string> {
    let msg = ""
    if (field === "tropes_liked") {
        const { error } = await supabase
            .from("user_entries")
            .update({
                tropes_liked: newArr,
                testdata: "updated tropes",
            })
            .eq("user_id", userid)
            .select("*")
        if (error) msg = error.message
        else msg = "Updated tropes."
    } else if (field === "tropes_disliked") {
        const { error } = await supabase
            .from("user_entries")
            .update({
                tropes_disliked: newArr,
                testdata: "updated tropes",
            })
            .eq("user_id", userid)
            .select("*")
        if (error) msg = error.message
        else msg = "Updated tropes."
    }
    return msg
}

export default updateTropesDb
