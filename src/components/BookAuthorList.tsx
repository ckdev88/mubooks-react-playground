export default function BookAuthorList(book: Book) {
	return book.au.map((author, index: number) => {
		const key = book.id + '-' + index
		return (
			<span key={key} id={key}>
				{author}
				<br />
			</span>
		)
	})
}
