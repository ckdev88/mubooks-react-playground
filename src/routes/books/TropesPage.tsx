import { createContext, useEffect, useState } from "react"
import TropesInMyBooks from "../../components/TropesInMyBooks"
import TropesPrefs from "../../components/TropesPrefs"
import Heading from "../../components/ui/Heading"
import { motion } from "motion/react"

export const TropesPageContext = createContext<TropesPageContextType>(
    {} as TropesPageContextType,
)

const currentPage = "tropes"

const TropesPage = () => {
    const [likedTropes, setLikedTropes] = useState<BookTropes>([])
    const [dislikedTropes, setDislikedTropes] = useState<BookTropes>([])
    const [dislikedTropesLowercase, setDislikedTropesLowercase] = useState(
        dislikedTropes.map((trope) => trope.toLowerCase()),
    )
    const [likedTropesLowercase, setLikedTropesLowercase] = useState(
        likedTropes.map((trope) => trope.toLowerCase()),
    )
    const [tropesInMyBooksArr, setTropesInMyBooksArr] = useState<Books>([])
    useEffect(() => {
        setLikedTropesLowercase(likedTropes.map((t) => t.toLowerCase()))
    }, [likedTropes])

    useEffect(() => {
        setDislikedTropesLowercase(dislikedTropes.map((t) => t.toLowerCase()))
    }, [dislikedTropes])

    return (
        <TropesPageContext.Provider
            value={{
                setLikedTropes,
                likedTropes,
                dislikedTropes,
                setDislikedTropes,
                likedTropesLowercase,
                dislikedTropesLowercase,
                tropesInMyBooksArr,
                setTropesInMyBooksArr,
            }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                animate={{ opacity: 1, transition: { duration: 2 } }}
            >
                <Heading text="My Tropes" icon="icon-tropes.svg" />
                <TropesPrefs field="tropes_liked" />
                <TropesPrefs field="tropes_disliked" />
                <TropesInMyBooks page={currentPage} />
            </motion.div>
        </TropesPageContext.Provider>
    )
}

export default TropesPage
