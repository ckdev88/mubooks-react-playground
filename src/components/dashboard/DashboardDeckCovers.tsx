import BookSummary from "../BookSummary"
import BookSummaryCover from "../BookSummaryCover"
import { Link } from "react-router-dom"
import { shuffleArray } from "../../Helpers"
import { cleanAnchor } from "../../helpers/cleanInput"

function DashboardDeckCovers({ booksarr, page }: { booksarr: Books; page: Page }) {
    if (booksarr.length === 1) {
        return booksarr.map((book: Book) => {
            return (
                <BookSummary
                    book={book}
                    key={`BookSummary${book.id}`}
                    currentPage="dashboard"
                    refer={page}
                />
            )
        })
    }
    if (page === "favorites" || page === "savedbooks") shuffleArray(booksarr as [])
    if (page === "finished")
        booksarr.sort((a, b) => Number(b.date_finished) - Number(a.date_finished))

    let slicedArr = booksarr.slice(-6)
    if (page === "finished" || page === "savedbooks") slicedArr = booksarr.slice(0, 6)

    let containerClasses = "deck-container"
    if (booksarr.length < 4) containerClasses += " spread shadeSub"
    else {
        containerClasses += " stack"
        if (booksarr.length > 5) containerClasses += " shade"
    }

    return (
        <div className={containerClasses}>
            {slicedArr.map((book: Book, index: number) => {
                let marginLeft = 0
                if (index > 0 && booksarr.length > 3) marginLeft = -20.01
                const marginLeftStyle: string = `${marginLeft}%`
                let extraArticleClass = ""
                if (booksarr.length > 3) extraArticleClass += " fl"
                if (booksarr.length < 6) extraArticleClass += " shade"
                const articleClassNames = `book-cover${extraArticleClass}`
                const bookAnchor: string = `${cleanAnchor(book.title_short)}_${book.id}`

                return (
                    <article
                        className={articleClassNames}
                        key={`deck_${page}_books${book.id}`}
                        style={{
                            zIndex: 10 - index,
                            marginLeft: marginLeftStyle,
                        }}
                    >
                        <Link to={"/" + page + "#" + bookAnchor}>
                            <BookSummaryCover
                                book_cover={book.cover}
                                book_cover_redir={book.cover_redir}
                            />
                        </Link>
                    </article>
                )
            })}
        </div>
    )
}
export default DashboardDeckCovers
