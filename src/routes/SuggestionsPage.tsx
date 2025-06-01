import { useContext } from "react"
import SuggestionsForm from "../components/SuggestionsForm"
import { motion } from "motion/react"
import { AppContext } from "../App"

function SuggestionsPage() {
    const { GLOBALS } = useContext(AppContext)
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: GLOBALS.pageAnimationDuration,
                    delay: GLOBALS.pageAnimationDelay,
                }}
                animate={{ opacity: 1 }}
            >
                <SuggestionsForm />
            </motion.div>
        </>
    )
}
export default SuggestionsPage
