/* TODO be able to add more than 1 quote, implications db & field type: string -> array, 'add extra quote' when
 isModding, on showing, pick a random quote of the array, quotes page don't know how to visualize this yet
 */
import { useContext, useEffect } from "react"
import { IsModdingReviewContext } from "./BookSummaryReview"
import BtnInsideCaret from "./ui/BtnInsideCaret"
import useChangeReview from "../hooks/useChangeReview"

const BookModifyReview = ({
    book_id,
    o_key,
    review_text,
}: {
    book_id: Book["id"]
    o_key: "review_text" | "review_fav_quote"
    review_text: Book["review_text"]
}) => {
    const { isModding, setIsModding } = useContext(IsModdingReviewContext)
    const [processForm] = useChangeReview(book_id, o_key)

    const input = {
        form_class: "single-small-form clr",
        type: "text",
        name: "review_text",
        id:
            o_key === "review_fav_quote"
                ? "review_fav_quote_" + book_id
                : "review_text_" + book_id,
        default: review_text,
        placeholder:
            o_key === "review_fav_quote" ? "Add your favorite quote" : "Add review",
        cancel_class: "btn-text btn-text-cancel",
    }

    useEffect(() => {
        if (isModding) document.getElementById(input.id)?.focus()
    }, [isModding, input.id])

    return (
        <>
            <form className={input.form_class} onSubmit={processForm}>
                <input
                    type={input.type}
                    name={input.name}
                    id={input.id}
                    defaultValue={input.default}
                    placeholder={input.placeholder}
                    autoComplete="off"
                    min={input.type === "number" ? "0" : undefined}
                />
                <BtnInsideCaret />
            </form>
            {isModding && (
                <button
                    type="button"
                    className={input.cancel_class}
                    onClick={() => setIsModding(false)}
                >
                    Cancel
                </button>
            )}
        </>
    )
}

export default BookModifyReview
