import { useContext } from 'react'
import { AppContext } from '../App'
const BooksOverviewFilterSort = () => {
	const { setBookFilter, bookFilter } = useContext(AppContext)

	function updateBookFilter(e: React.ChangeEvent<HTMLInputElement>): void {
		e.preventDefault()
		const searchTerm = e.target.value.toLowerCase()
		if (searchTerm.length > 0) setBookFilter(searchTerm)
		else setBookFilter('')
	}

	function cancelFilter() {
		setBookFilter('')
	}

	function noSubmit(e: React.FormEvent<HTMLFormElement>) {
		document.getElementById('booksoverview-filter')?.blur()
		e.preventDefault()
	}

	return (
		<div id="booksoverview-filter-sort">
			<form className="single-small-form" onSubmit={noSubmit} id="filterForm">
				<input
					type="text"
					onChange={updateBookFilter}
					id="booksoverview-filter"
					value={bookFilter}
					placeholder="Filter on book title"
				/>
			</form>
			{bookFilter.length > 0 && (
				<button className="btn-text btn-text-cancel" onClick={cancelFilter}>
					Reset filter
				</button>
			)}
		</div>
	)
}
export default BooksOverviewFilterSort
