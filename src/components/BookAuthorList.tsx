export default function BookAuthorList(book: Book) {
	if(book.author_name!==undefined) console.log(book.author_name)
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
