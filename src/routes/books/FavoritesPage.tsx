import { useContext, useEffect } from "react"
import BooksOverviewPage from "./BooksOverviewPage"
import { AppContext } from "../../App"
import { Link } from "react-router-dom"
import Heading from "../../components/ui/Heading"
import { motion } from "motion/react"

const pageTitle: string = "Favorites"
const currentPage: Page = "favorites"
const booklist = 4

const FavoritesPage = () => {
    const { userMyBooks, setPageName, GLOBALS } = useContext(AppContext)
    // biome-ignore lint/correctness/useExhaustiveDependencies: <TODO OPTIMIZE>
    useEffect(() => {
        setPageName(currentPage)
    }, [])
    let hasbooks = false
    if (userMyBooks.filter((book) => book.list === booklist).length > 0) hasbooks = true

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
                icon={"icon-favorites.svg"}
                sub="Beloved and adored books"
            />
            {!hasbooks && (
                <>
                    <h4>No books marked as favorite yet.</h4>
                    <p>
                        Select and mark your favorite book from{" "}
                        <Link to="/finished">your finished books</Link> add to this list.
                    </p>
                </>
            )}
            <BooksOverviewPage page={currentPage} booklist={booklist} />
        </motion.div>
    )
}
export default FavoritesPage
