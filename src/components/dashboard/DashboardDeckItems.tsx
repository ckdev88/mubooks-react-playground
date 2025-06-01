import { useContext } from "react"
import { AppContext } from "../../App"
import { HashLink as Link } from "react-router-hash-link"
import DashboardDeckCovers from "./DashboardDeckCovers"

const DashboardDeckItems = ({
    page,
    noBooksText,
}: { page: Page; noBooksText: string }) => {
    let book_list: Book["list"]

    const { userMyBooks, darkTheme } = useContext(AppContext)

    let btnIconAdd = `img/icon-${page}.png`
    if (darkTheme) btnIconAdd = `img/icon-${page}-white.png`
    if (page === "reading") {
        book_list = 2
        btnIconAdd = "img/plus-icon.svg"
    } else if (page === "wishlist") {
        book_list = 1
    } else if (page === "favorites") book_list = 4
    else if (page === "finished") book_list = 3
    else if (page === "savedbooks") {
        btnIconAdd = "img/save-books-icon.png"
    }

    let hasbooks = false
    let booksarr = userMyBooks.filter((book: Book) => book.list === book_list)
    if (page === "savedbooks") booksarr = userMyBooks
    if (booksarr.length > 0) hasbooks = true

    return (
        <>
            {hasbooks ? (
                <main className={page}>
                    <DashboardDeckCovers booksarr={booksarr} page={page} />
                </main>
            ) : (
                <Link to={"/" + page}>
                    <main className="toadd">
                        <aside>
                            <button type="button" className="btn-icon">
                                <img src={btnIconAdd} alt="" />
                            </button>
                        </aside>
                        {noBooksText}
                    </main>
                </Link>
            )}
        </>
    )
}
export default DashboardDeckItems
