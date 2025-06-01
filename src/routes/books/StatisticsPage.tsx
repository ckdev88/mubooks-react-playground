import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../App"
import getFinishedBooksStatsYears from "../../functions/getFinishedBooksStatsYears"
import StatisticsYear from "../../components/StatisticsYear"
import Heading from "../../components/ui/Heading"
import { motion } from "motion/react"

const StatisticsPage = () => {
    const { userMyBooks, GLOBALS } = useContext(AppContext)
    const [years, setYears] = useState<number[]>([])
    const [hasStats, setHasStats] = useState<boolean>(false)
    useEffect(() => {
        const { yearArr } = getFinishedBooksStatsYears(userMyBooks)
        if (yearArr.length > 0) {
            setYears(yearArr)
            setHasStats(true)
        }
    }, [userMyBooks])

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
            {hasStats ? (
                <>
                    {years.map((y) => {
                        const filteredByYear = userMyBooks.filter(
                            (b) =>
                                b.date_finished !== undefined &&
                                Math.floor(b.date_finished / 10000) === y,
                        )
                        return (
                            <StatisticsYear
                                myBooksArr={filteredByYear}
                                year={y}
                                key={`statisticsPageYear${y}`}
                            />
                        )
                    })}
                </>
            ) : (
                <>
                    <Heading
                        text="Statistics"
                        sub="See more about your book reading journey"
                        icon="icon-statistics.svg"
                    />
                    <p>
                        No stats yet, stats are generated when you finish reading a book
                        and when you rate the book you read.
                    </p>
                </>
            )}
        </motion.div>
    )
}

export default StatisticsPage
