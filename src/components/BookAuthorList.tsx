export default function BookAuthorList(book: Book) {
	return book.author_name.map((author: string, index: number) => {
		const key = book.id + '-' + index
		return (
			<span key={key} id={key}>
				{author}
				<br />
			</span>
		)
	})
}
