import { useState } from 'react'
const SearchTropes = ({ book_id, tropes }: { book_id: Book['id']; tropes: BookTropes }) => {
	const [showMore, setShowMore] = useState(false)

	function showMoreToggle() {
		setShowMore(!showMore)
	}

	if (tropes === undefined) return
	return (
		<ul className="tropes clr mb0">
			{tropes.map((trope, index) => {
				if (showMore) {
					return (
						<li className="trope badge" key={'trope' + book_id + index}>
							{trope}
						</li>
					)
				} else if (index < 5) {
					return (
						<li className="trope badge" key={'trope' + book_id + index}>
							{trope}
						</li>
					)
				}
			})}
			<li className="trope_more">
				<button onClick={() => showMoreToggle()} className="btn-sm mb0">
					<span>{showMore ? '<' : '...'}</span>
				</button>
			</li>
		</ul>
	)
}
export default SearchTropes
