// import { ref } from 'vue'
// import { useMuBooksStore } from '../../stores/MuBooksStore'
// const muBooksStore = useMuBooksStore()

// let hasbooks = false
// let books = []
//
// if (muBooksStore.getReadingBook !== false) {
// 	books = ref(muBooksStore.getReadingBook)
// 	if (books.value.length > 0) hasbooks = true
// }

/* if hasbooks... 
 *
	<main className="readingnow">
		<article className="book-summary" v-for="(book, index) in books">
			<aside className="cover"><img :src="book.image" /></aside>
			<div className="in-short">
				<h2>{{ book.ti }}</h2>
			</div>
		</article>
	</main>
	*/
export default function ReadingItem(){
	return (
<>
	<main>
		<aside>
			<button><img src="img/plus-icon.svg" /></button>
		</aside>
		If you're already reading a book, let's add it here.
	</main>
</>
)}

