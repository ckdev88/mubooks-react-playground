import { useContext } from "react"
import { AppContext } from "../App"
import useMyBooksUpdateDb from "./useMyBooksUpdateDb"
import { cleanInput } from "../helpers/cleanInput"
import { IsModdingReviewContext } from "../components/BookSummaryReview"

const useChangeReview = (
    book_id: Book["id"],
    o_key: "review_text" | "review_fav_quote",
): [(e: React.FormEvent<HTMLFormElement>) => void] => {
    const { userMyBooks } = useContext(AppContext)
    const { setIsModding, setReviewText } = useContext(IsModdingReviewContext)

    const msg: string = "Updated review"
    const updateMyBooksDb = useMyBooksUpdateDb({
        myBooksNew: userMyBooks,
        book_id,
        msg,
    })

    function processForm(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        const newval: string = cleanInput(e.currentTarget.review_text.value.trim(), true)
        if (newval !== undefined) updateReviewText(newval)
    }

    function updateReviewText(newvalue: Book["review_text"]): void {
        for (let i = 0; i < userMyBooks.length; i++) {
            if (userMyBooks[i].id === book_id) {
                if (o_key === "review_text") userMyBooks[i].review_text = newvalue
                else if (o_key === "review_fav_quote")
                    userMyBooks[i].review_fav_quote = newvalue
                setReviewText(newvalue)
                break
            }
        }
        updateMyBooksDb()
        setIsModding(false)
    }
    return [processForm]
}

export default useChangeReview
