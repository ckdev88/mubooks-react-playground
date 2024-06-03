const SearchTropes = (bookid: Id, tropes: BookTropes) => {
	if (tropes === undefined) return
	return (
		<ul className="tropes clr mb0">
			{tropes.map((trope, index) => (
				<li className="trope badge" key={'trope' + bookid + index}>
					{trope}
				</li>
			))}
		</ul>
	)
}
export default SearchTropes
