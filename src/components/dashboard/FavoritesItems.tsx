// import { ref } from 'vue'
// import { useMuBooksStore } from '../../stores/MuBooksStore'
// const muBooksStore = useMuBooksStore()
//
// let hasbooks = false
// let books = []

// if (muBooksStore.getFavorites !== false) {
// 	books = ref(muBooksStore.getFavorites.slice(0, 4))
// 	if (books.value.length > 0) hasbooks = true
// }
/*
	<main v-if="hasbooks" className="favorites deck">
		<div className="deck-container">
			<article
				className="book-cover"
				v-for="(book, index) in books"
				:key="index"
				@click="$router.push({ name: 'favorites' })"
				:style="index ? 'z-index:' + (10 - index) : 'z-index:10'"
			>
				<div>
					<img :src="book.img" :alt="book.ti" />
				</div>
			</article>
		</div>
	</main>
*/

export default function FavoritesItems() {
	return (
		<>
			<main className="toadd">
				<aside>
					<button><img src="img/icon-favorites.png" /></button>
				</aside>
				Only the best ones here.
			</main>
		</>
	)
}
