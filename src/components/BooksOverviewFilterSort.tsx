import { useContext } from 'react'
import { BooksOverviewFilterContext } from '../routes/books/BooksOverviewPage'
const BooksOverviewFilterSort = () => {
	const { setBooksFilter, booksFilter } = useContext(BooksOverviewFilterContext)

	function updateBooksFilter(e: React.ChangeEvent<HTMLInputElement>): void {
		e.preventDefault()
		const searchTerm = e.target.value.toLowerCase()
		if (searchTerm.length > 0) setBooksFilter(searchTerm)
		else setBooksFilter('')
	}

	function cancelFilter() {
		setBooksFilter('')
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
					onChange={updateBooksFilter}
					id="booksoverview-filter"
					value={booksFilter}
					placeholder="Filter on book title"
				/>
			</form>
			{booksFilter.length > 0 && (
				<button className="btn-text btn-text-cancel" onClick={() => cancelFilter()}>
					Reset filter
				</button>
			)}
		</div>
	)
}
export default BooksOverviewFilterSort
