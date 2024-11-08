import { ReactNode } from 'react'

// TODO apply smart way of determining light or dark icon based on current theme
const Heading = ({ text, icon, sub }: { text: string; icon?: string; sub?: ReactNode }) => {
	if (icon) {
		return (
			<div className={icon ? 'h1 h1-with-icon' : 'h1'}>
				<div>
					{text} {icon && <img src={`/img/${icon}`} alt="" className="h1-icon" />}
				</div>
				{sub && <sub>{sub}</sub>}
			</div>
		)
	}
	return (
		<div className="h1">
			{text}
			{sub && <sub>{sub}</sub>}
		</div>
	)
}
export default Heading
