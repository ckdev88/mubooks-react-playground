import useMyBooksUpdateDb from "./useMyBooksUpdateDb"

const useClearBooks = (): void => {
    const myBooksNewEmpty: [] = []
    const book_id = null
    const msg = "Books cleared!"
    const updateMyBooksDb = useMyBooksUpdateDb({
        myBooksNew: myBooksNewEmpty,
        book_id,
        msg,
    })
    updateMyBooksDb()
}

export default useClearBooks
