import { Link } from "react-router-dom"
import DashboardDeckItems from "./DashboardDeckItems"
import Heading from "../ui/Heading"

const DashboardDeck = ({
    page,
    title,
    noBooksText,
    icon,
}: {
    page: Page
    title: string
    noBooksText: string
    icon: string
}) => {
    return (
        <article className="adder">
            <Link to={"/" + page}>
                <Heading text={title} icon={icon} el="adder-header" />
            </Link>
            <DashboardDeckItems page={page} noBooksText={noBooksText} />
        </article>
    )
}
export default DashboardDeck
