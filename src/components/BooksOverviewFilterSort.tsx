import { useContext } from 'react'
import { AppContext } from '../App'
const BooksOverviewFilterSort = () => {
	const { setLocalBookFilter, localBookFilter } = useContext(AppContext)

	function updateLocalBookFilter(e: React.ChangeEvent<HTMLInputElement>): void {
		const searchTerm = e.target.value.toLowerCase()
		if (searchTerm.length > 0) setLocalBookFilter(searchTerm)
		else setLocalBookFilter('')
	}
	function cancelFilter() {
		setLocalBookFilter('')
	}

	return (
		<div id="booksoverview-filter-sort">
			<form className="single-small-form">
				<input
					type="text"
					onChange={updateLocalBookFilter}
					id="booksoverview-filter"
					value={localBookFilter}
					placeholder="Filter on book title"
				/>
			</form>
			{localBookFilter.length > 0 && (
				<button className="btn-text btn-text-cancel" onClick={cancelFilter}>
					Reset filter
				</button>
			)}
		</div>
	)
}
export default BooksOverviewFilterSort
