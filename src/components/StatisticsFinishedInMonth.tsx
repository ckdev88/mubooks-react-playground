import { useContext } from "react"
import { AppContext } from "../App"
import { HashLink } from "react-router-hash-link"
import { cleanAnchor } from "../helpers/cleanInput"

const StatisticsFinishedInMonth = ({ yearmonth }: { yearmonth: number }) => {
    const { userMyBooks } = useContext(AppContext)
    // OPTIMIZE instead of using the whole thing, getting a parameter array of year might be better, not sure yet
    const filteredUserMyBooks: Books = userMyBooks.filter(
        (b) => b.date_finished && Math.floor(b.date_finished / 100) === yearmonth,
    )
    return filteredUserMyBooks.map((b, index) => {
        const refer: string = "/finished" + `#${cleanAnchor(b.title_short)}_${b.id}`
        const key = "sfim" + yearmonth + index
        return (
            <li key={key}>
                <HashLink to={refer} className="a-text">
                    {b.title_short}
                </HashLink>
            </li>
        )
    })
}
export default StatisticsFinishedInMonth
