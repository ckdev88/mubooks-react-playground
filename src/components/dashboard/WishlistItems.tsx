// import { ref } from 'vue'
// import { useMuBooksStore } from '../../stores/MuBooksStore'
// const muBooksStore = useMuBooksStore()
//
// let hasbooks = false
// let books = []
//
// if (muBooksStore.getWishlist !== false) {
// 	books = ref(muBooksStore.getWishlist.slice(0, 4))
// 	if (books.value.length > 0) hasbooks = true
// }

/*
  <script setup>
import ReadingItem from './ReadingItem.vue'
// check if there are any saved books
// if yes, check if any of saved books are marked as reading
// if yes, router.push to saved books
// if no, router.push to saved books?
// if no, router.push to search

// import { useMuBooksStore } from '../../stores/MuBooksStore'
// const muBooksStore = useMuBooksStore()
// const readingBook = muBooksStore.getReadingBook
// console.log('readingBook:', readingBook)
</script>
<template>
	<article className="adder">
		<header @click="$router.push({ name: 'savedbooks' })">
			What I'm reading now <span>›</span>
		</header>
		<ReadingItem />
	</article>
</template>
			<main onClick={$router.push({ name: 'savedbooks' })} className="toadd">
*/
export default function WishlistItems() {
	return (
		<>
			<main  className="toadd">
				<aside>
					<button>
						<img src="img/icon-wishlist.png" />
					</button>
				</aside>
				Next in line.
			</main>
		</>
	)
}
