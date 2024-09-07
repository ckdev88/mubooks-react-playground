function sum(n1 = 0, n2 = 0, n3 = 0) {
	return n1 + n2 + n3
}
function sumReduced(...numbers:number[]):number {
	const val= numbers.reduce((total, number) => total + number, 0)
	return val
}
// console.log(sumReduced(2,3,3))
export { sum, sumReduced }
