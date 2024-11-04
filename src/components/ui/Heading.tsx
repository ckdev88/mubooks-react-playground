const Heading = ({ text, icon }: { text: string; icon?: string }) => {
	return (
		<h1 className={icon ? 'h1-with-icon' : ''}>
			{text}
			{icon && <img src={icon} alt="" className="h1-icon" />}
		</h1>
	)
}
export default Heading
