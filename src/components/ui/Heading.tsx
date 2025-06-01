// OPTIMIZE themes_icons: apply smart way of determining light or dark icon based on current theme, currently turned off via GLOBALS.headingIconsEnabled=false
import { useContext } from "react"
import { AppContext } from "../../App"
interface HeadingProps {
    el?: "h1" | "h2" | "adder-header"
    text: string
    icon?: string
    sub?: string
}
const Heading = ({ el = "h1", text, icon, sub }: HeadingProps) => {
    if (icon) {
        const { GLOBALS } = useContext(AppContext)
        if (GLOBALS.headingIconsEnabled && icon) {
            return (
                <div className={el + " " + `${el}-with-icon`}>
                    <div>
                        {text}{" "}
                        {icon && <img src={`/img/${icon}`} alt="" className="h1-icon" />}
                    </div>
                    {sub && el !== "adder-header" && <sub>{sub}</sub>}
                    {el === "adder-header" && <span>›</span>}
                </div>
            )
        }
    }
    return (
        <div className={el}>
            {text}
            {sub && el !== "adder-header" && <sub>{sub}</sub>}
            {el === "adder-header" && <span>›</span>}
        </div>
    )
}
export default Heading
