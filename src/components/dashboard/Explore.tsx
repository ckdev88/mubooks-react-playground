function goExplore() {
	console.log('go zoek boek')
}
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
