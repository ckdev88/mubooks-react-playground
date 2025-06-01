import { HashLink } from "react-router-hash-link"
import { cleanAnchor } from "../helpers/cleanInput"
const BooksWithoutStarsList = ({
    bwst,
    year,
}: { bwst: BooksWithoutStars; year: number }) => {
    return bwst.map((b) => {
        const refer: string = "finished" + `#${cleanAnchor(b.title_short)}_${b.id}`
        return (
            <li key={"bwst" + year + b.id}>
                <HashLink className="a-text italic" to={`/${refer}`}>
                    {b.title_short}
                </HashLink>
                <br />
            </li>
        )
    })
}
export default BooksWithoutStarsList
