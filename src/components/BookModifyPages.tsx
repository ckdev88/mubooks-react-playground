import { useContext, useEffect } from "react"
import { IsModdingPagesContext } from "./BookPages"
import BtnInsideCaret from "./ui/BtnInsideCaret"
import useChangePages from "../hooks/useChangePages"

const BookModifyPages = ({
    book_id,
    book_number_of_pages_median,
}: {
    book_id: Book["id"]
    book_number_of_pages_median: Book["number_of_pages_median"]
}) => {
    const { isModding, setIsModding } = useContext(IsModdingPagesContext)
    const [processForm] = useChangePages(book_id)

    const input = {
        form_class: "single-small-form wm6",
        type: "number",
        name: "pagesAmount",
        id: "pages_" + book_id,
        default: book_number_of_pages_median,
        placeholder: "0",
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

export default BookModifyPages
