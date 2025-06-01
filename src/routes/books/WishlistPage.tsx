import { useContext } from "react"
import BooksOverviewPage from "./BooksOverviewPage"
import { AppContext } from "../../App"
import { Link } from "react-router-dom"
import Heading from "../../components/ui/Heading"
import { motion } from "motion/react"

const pageTitle = "Mu Wishlist"
const currentPage = "wishlist"
const booklist = 1

const WishlistPage = () => {
    const { userMyBooks, GLOBALS } = useContext(AppContext)
    let hasbooks = false
    if (userMyBooks.filter((book) => book.list === booklist).length > 0) hasbooks = true // OPTIMIZE: this is a bit meh

    return (
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: GLOBALS.pageAnimationDuration,
                delay: GLOBALS.pageAnimationDelay,
            }}
            animate={{ opacity: 1 }}
        >
            <Heading
                text={pageTitle}
                icon={"icon-wishlist.svg"}
                sub="All the books I will read soon"
            />
            {!hasbooks && (
                <>
                    <h4>No books here yet.</h4>
                    <p>
                        Want to add a book to your wishlist?
                        <br />
                        <Link to="/search">Search</Link> or{" "}
                        <Link to="/addbook">Add a book yourself</Link>.
                        <br />
                        <br />
                        <Link to="/reading">See my reading list.</Link>
                        <br />
                    </p>
                </>
            )}
            <BooksOverviewPage page={currentPage} booklist={booklist} />
        </motion.div>
    )
}
export default WishlistPage
