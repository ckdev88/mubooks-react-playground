import { useContext } from "react"
import { AppContext } from "../App"
import useMyBooksUpdateDb from "./useMyBooksUpdateDb"
import { cleanInput } from "../helpers/cleanInput"
import { IsModdingPagesContext } from "../components/BookPages"

const useChangePages = (
    book_id: Book["id"],
): [(e: React.FormEvent<HTMLFormElement>) => void] => {
    const { userMyBooks } = useContext(AppContext)
    const { setIsModding, setNumberOfPages } = useContext(IsModdingPagesContext)

    const msg: string = "Updated pages amount"
    const updateMyBooksDb = useMyBooksUpdateDb({
        myBooksNew: userMyBooks,
        book_id,
        msg,
    })

    function processForm(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        const newval: number = Number(cleanInput(e.currentTarget.pagesAmount.value))
        if (newval !== undefined && newval > -1) updatePages(newval)
    }

    function updatePages(newvalue: Book["number_of_pages_median"]): void {
        const myBooks: Books = userMyBooks
        for (let i = 0; i < myBooks.length; i++) {
            if (myBooks[i].id === book_id) {
                myBooks[i].number_of_pages_median = newvalue
                setNumberOfPages(newvalue)
                break
            }
        }
        updateMyBooksDb()
        setIsModding(false)
    }
    return [processForm]
}

export default useChangePages
