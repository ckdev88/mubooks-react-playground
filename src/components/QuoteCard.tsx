import { useContext, useState, useEffect } from "react"
import { AppContext } from "../App"
const QuoteCard = () => {
    const { userMyBooks } = useContext(AppContext)
    const quotedBooks = userMyBooks.filter(
        (book) =>
            book.review_fav_quote &&
            book.review_fav_quote.length > 4 &&
            book.author_name &&
            book.title,
    )
    const [quoteIsActive, setQuoteIsActive] = useState(false)
    const indexnr = Math.floor(Math.random() * quotedBooks.length)

    const [quote, setQuote] = useState<Quote>()
    useEffect(() => {
        if (quotedBooks[indexnr] && quoteIsActive === false) {
            if (quotedBooks[indexnr].review_fav_quote === undefined)
                quotedBooks[indexnr].review_fav_quote = ""
            setQuote({
                title: quotedBooks[indexnr].title,
                quote: quotedBooks[indexnr].review_fav_quote,
                authors: quotedBooks[indexnr].author_name.join(","),
            })
            setQuoteIsActive(true)
        }
    }, [indexnr, quotedBooks, quoteIsActive])

    return (
        <>
            {quote && (
                <article className="quote shade-light dashboard-quote">
                    <main>{quote.quote && `“${quote.quote}”`}</main>
                    <footer>
                        {quote.title}, {quote.authors}
                    </footer>
                </article>
            )}
        </>
    )
}
export default QuoteCard
