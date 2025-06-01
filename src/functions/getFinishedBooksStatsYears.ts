const getFinishedBooksStatsYears = (myBooksArr: Books): FinishedBooksStatsYears => {
    const now: Date = new Date()
    const currentYear = now.getFullYear()
    let oldest: number = currentYear * 10000
    const yearSet: Set<number> = new Set()

    myBooksArr.map((b) => {
        if (b.date_finished !== undefined && b.date_finished > 0) {
            if (b.date_finished < oldest) oldest = b.date_finished
            yearSet.add(Math.floor(b.date_finished / 10000))
        }
    })
    const yearArr: FinishedBooksStatsYears["yearArr"] = Array.from(yearSet)
    yearArr.sort((a, b) => b - a)
    return { yearArr, oldest }
}

export default getFinishedBooksStatsYears
