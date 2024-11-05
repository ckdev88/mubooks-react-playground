import { useState } from 'react'
const SearchTropes = ({ book_id, tropes }: { book_id: Book['id']; tropes: BookTropes }) => {
	const [showMore, setShowMore] = useState(false)

	function showMoreToggle() {
		setShowMore(!showMore)
	}

	if (tropes === undefined) return
	return (
		<div className="tropes clr mb0">
			{tropes.map((trope, index) => {
				if (showMore) {
					return (
						<div className="trope badge" key={'trope' + book_id + index}>
							{trope}
						</div>
					)
				} else if (index < 5) {
					return (
						<div className="trope badge" key={'trope' + book_id + index}>
							{trope}
						</div>
					)
				}
			})}
			<div className="trope_more">
				<button onClick={() => showMoreToggle()} className="btn-sm mb0">
					{showMore ? '<' : '...'}
				</button>
			</div>
		</div>
	)
}
export default SearchTropes
