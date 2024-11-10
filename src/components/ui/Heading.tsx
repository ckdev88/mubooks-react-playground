import { ReactNode } from 'react'

// TODO apply smart way of determining light or dark icon based on current theme
const Heading = ({
	el = 'h1',
	text,
	icon,
	sub,
	span,
}: {
	el?: 'h1' | 'h2' | 'adder-header'
	text: string
	icon?: string
	sub?: ReactNode
	span?: ReactNode
}) => {
	if (icon) {
		return (
			<div className={icon ? el + ' ' + `${el}-with-icon` : el}>
				<div>
					{text} {icon && <img src={`/img/${icon}`} alt="" className="h1-icon" />}
				</div>
				{sub && <sub>{sub}</sub>}
				{span && <span>{span}</span>}
			</div>
		)
	}
	return (
		<div className={el}>
			{text}
			{sub && <sub>{sub}</sub>}
			{span && <span>{span}</span>}
		</div>
	)
}
export default Heading
