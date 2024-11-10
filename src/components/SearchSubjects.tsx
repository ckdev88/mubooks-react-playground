import { useState } from 'react'
const SearchSubjects = ({ book_id, subjects }: { book_id: Book['id']; subjects: BookSubjects }) => {
	const [showMore, setShowMore] = useState(false)

	function showMoreToggle() {
		setShowMore(!showMore)
	}

	if (subjects === undefined) return
	return (
		<div className="subjects">
			{subjects.map((subject, index) => {
				if (showMore) {
					return (
						<div className="subject badge" key={'subject' + book_id + index}>
							{subject}
						</div>
					)
				} else if (index < 5) {
					return (
						<div className="subject badge" key={'subject' + book_id + index}>
							{subject}
						</div>
					)
				}
			})}
			<button onClick={() => showMoreToggle()} className="btn-text diblock">
				{showMore ? '<' : '...'}
			</button>
		</div>
	)
}
export default SearchSubjects
