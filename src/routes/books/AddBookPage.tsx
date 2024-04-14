import { useState } from "react"

const AddBookPage = () => {
	const [coverImg, setCoverImg] = useState('/img/coverless.png')
	// ab = abbreviation for Add Book
	function processAbForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		console.log(e.currentTarget.abIsbn.value.trim())
		setCoverImg(e.currentTarget.abCover.value.trim())
	}
	let showCover = (<><img src={coverImg} style={{ width: '50%' }} /></>)
	function isUrl(url: string) {
		if (url.slice(0, 8) === 'https://') return true
		return false
	}
	function changeCover(e: React.ChangeEvent<HTMLInputElement>) {
		let url = e.currentTarget.value
		console.log(e.currentTarget.value)
		if (!isUrl(url)) { console.log('is geen url') }
		else {
			console.log('is wel url')
			setCoverImg(e.currentTarget.value.trim())
		}
	}

	return (
		<>
			<h1>Add a book</h1>
			<form onSubmit={processAbForm}>
				<fieldset>
					<label htmlFor="abIsbn">ISBN</label>
					<input type="text" id="abIsbn" name="abIsbn" required />
					<label htmlFor="abTitle">Title</label>
					<input type="text" id="abTitle" name="abTitle" required />
					<label htmlFor="abAuthors">Author(s) <em className="sf">1 author per line</em></label>
					<textarea name="abAuthors" id="abAuthors" />
					<label htmlFor="abCover">Cover URL <em className="sf">starts with https://</em></label>
					<input type="url" name="abCover" id="abCover" onChange={changeCover} />
					{showCover}<br /><br/>
					<label htmlFor="abYearPublished">Year published</label>
					<input type="number" name="abYearPublished" id="abYearPublished" />
					<label htmlFor="abPages">Pages</label>
					<input type="number" name="abPages" id="abPages" />
					<label htmlFor="abTropes">Tropes <em className="sf">one trope per line</em></label>
					<textarea name="abTropes" id="abTropes"></textarea>
					<label htmlFor="abNoteDescription">Personal note or description</label>
					<textarea name="abNoteDescription" id="abNoteDescription"></textarea>
					<button>Add book</button>
				</fieldset>
			</form>
		</>
	)
}
export default AddBookPage
