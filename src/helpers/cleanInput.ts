// TODO: this can be made faster by assigning the uppercase ASCII code, for ultimate optimization
function cleanInput(input: string, capfirst: boolean = false): string {
	input.trim()
	let returnvalue: string
	if (capfirst) returnvalue = input[0].toUpperCase() + input.slice(1)
	else returnvalue = input
	return returnvalue
}
export { cleanInput }
