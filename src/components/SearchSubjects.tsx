import { useState } from "react"
import BaseBadge from "./ui/BaseBadge"
import { cleanIndexKey } from "../helpers/cleanInput"

const SearchSubjects = ({
    book_id,
    subjects,
}: { book_id: Book["id"]; subjects: BookSubjects }) => {
    const [showMore, setShowMore] = useState(false)

    function showMoreToggle() {
        setShowMore(!showMore)
    }

    if (subjects === undefined) return
    return (
        <div className="subjects">
            {subjects.map((subject, index) => {
                const key = cleanIndexKey("subject" + book_id, index)
                if (showMore === true) {
                    return <BaseBadge key={key} type="subject" text={subject} />
                }
                if (!showMore && index < 5) {
                    return <BaseBadge key={key} type="subject" text={subject} />
                }
            })}
            <button
                type="button"
                onClick={() => showMoreToggle()}
                className="btn-text diblock"
            >
                {showMore ? "<" : "..."}
            </button>
        </div>
    )
}
export default SearchSubjects
