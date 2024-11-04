import { ReactNode } from 'react'

// TODO apply smart way of determining light or dark icon based on current theme
const Heading = ({ text, icon, sub }: { text: string; icon?: string; sub?: ReactNode }) => {
	if (icon) {
		return (
			<hgroup>
				<h1 className={icon ? 'h1-with-icon' : ''}>
					<div>
						{text} {icon && <img src={`/img/${icon}`} alt="" className="h1-icon" />}
					</div>
					{sub && sub}
				</h1>
			</hgroup>
		)
	}
	return (
		<h1>
			{text}
			{sub && sub}
		</h1>
	)
}
export default Heading
