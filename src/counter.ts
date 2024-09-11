export function setupCounter(el: HTMLButtonElement): void {
	let counter = 0
	const setCounter = (count: number) => {
		counter = count
		el.innerHTML = `count is ${counter}`
	}
	el.addEventListener('click', () => setCounter(counter + 1))
	setCounter(0)
}
