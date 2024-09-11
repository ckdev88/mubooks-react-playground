export default function BookAuthorList({
	book_id,
	book_author_name,
}: {
	book_id: Book['id']
	book_author_name: Book['author_name']
}) {
	if (book_author_name === undefined) return // TODO: add option to change or fill in author(s)
	return book_author_name.map((author: string, index: number) => {
		const spanid = book_id + '-' + index
		return (
			<span key={`bookauthorlist${book_id}${index}`} id={spanid}>
				{author}
				<br />
			</span>
		)
	})
}
