import QuoteCard from "../../components/QuoteCard"
// import { localStorageKey } from '../../../utils/supabase'
// import { useNavigate } from 'react-router-dom'
import DashboardDeck from "../../components/dashboard/DashboardDeck"
import { motion } from "motion/react"

export default function DashboardPage() {
    // const navigate = useNavigate()
    // useEffect(() => {
    // 	if (localStorage.getItem(localStorageKey) === null) {
    // 		// tijdelijk uit
    // 		// navigate('/account/login')
    // 	}
    // }, [navigate])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            animate={{ opacity: 1, transition: { duration: 2 } }}
        >
            <QuoteCard />
            <DashboardDeck
                page="reading"
                title="What I&lsquo;m reading now"
                noBooksText="Already reading a book? Let's add it here."
                icon="icon-reading.svg"
            />
            <DashboardDeck
                page="wishlist"
                title="Mu Wishlist"
                noBooksText="Next in line."
                icon="icon-wishlist.svg"
            />
            <DashboardDeck
                page="favorites"
                title="Mu Favorites"
                noBooksText="Only the best ones here"
                icon="icon-favorites.svg"
            />
            <DashboardDeck
                page="finished"
                title="Mu Finished books"
                noBooksText="Only the best ones here"
                icon="icon-finished.svg"
            />
            <DashboardDeck
                page="savedbooks"
                title="All of Mu Books"
                noBooksText="Let&lsquo;s start saving books."
                icon="savedbooks.svg"
            />
        </motion.div>
    )
}
/* <Tropes /> <Stats />  */
