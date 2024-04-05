// import { onMounted } from 'vue'
// import { useRouter, RouterLink } from 'vue-router'
// const router = useRouter()

function goExplore() {
	console.log('go zoek boek')
	// router.push({ name: 'explore' })
}
/*
<style scoped>
img {
	margin: 0 auto;
	height: 4rem;
	width: auto;
	display: block;
}
</style>
			<RouterLink to="explore">Find a book</RouterLink>
*/
export default function Explore() {
	return (
		<>
			<article className="adder alt">
				<header>Let's go straight to explore them books!</header>
				<aside>
					<img src="img/explore.png" alt="Explore" onClick={goExplore} />
					Find a book
				</aside>
			</article>
		</>
	)
}
