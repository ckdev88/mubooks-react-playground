import BookAuthorList from "./BookAuthorList"
const BookSummaryTitle = ({
    book_title_short,
    book_first_publish_year,
    currentPage,
    book_author_name,
    book_id,
    style = "normal",
}: {
    book_title_short: Book["title_short"]
    book_first_publish_year: Book["first_publish_year"]
    currentPage: Page
    book_author_name: Book["author_name"]
    book_id: Book["id"]
    style?: "normal" | "quoted"
}) => {
    if (style === "quoted")
        return (
            <div className="tcenter sf2 bi">
                {book_title_short},&nbsp;
                <BookAuthorList book_id={book_id} book_author_name={book_author_name} />
            </div>
        )

    return (
        <div className="h2">
            {book_title_short}{" "}
            {book_first_publish_year &&
                (currentPage === "search" ||
                    currentPage === "addbook" ||
                    currentPage === "wishlist") && <sup>({book_first_publish_year})</sup>}
            <sub>
                <BookAuthorList book_id={book_id} book_author_name={book_author_name} />
            </sub>
        </div>
    )
}
export default BookSummaryTitle
