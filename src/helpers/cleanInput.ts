function cleanInput(input: string, capfirst: boolean = false): string {
	input.trim()
	if (input.length < 1) return ''
	let returnvalue: string

	let charc0 = input.charCodeAt(0)
	if (capfirst && charc0 > 96 && charc0 < 123) {
		charc0 -= 32
		returnvalue = String.fromCharCode(charc0) + input.slice(1)
	} else returnvalue = input
	return returnvalue
}

function cleanAnchor(input: string, dashes: boolean = true): string {
	if (input.length < 1) return ''
	let returnvalue = ''

	let c
	for (let i = 0; i < input.length; i++) {
		c = input.charCodeAt(i)
		// change to hyphen if not part of alphanumerical ... 48=0, 57=9, 65=A, 90=Z, 97=a, 122=z
		if (input[i] === '?') break
		if (c < 48 || (c > 57 && c < 65) || (c > 90 && c < 97) || c > 122) {
			if (dashes) returnvalue += '-'
		} else returnvalue += input[i]
	}
	return returnvalue
}

function cleanIndexKey(input: string, index: number): string {
	let returnvalue = ''
	let c
	for (let i = 0; i < input.length; i++) {
		c = input.charCodeAt(i)
		if ((c > 47 && c < 58) || (c > 64 && c < 91) || (c > 90 && c < 97) || (c > 96 && c < 123))
			returnvalue += input[i]
	}
	returnvalue += index

	return returnvalue
}

function cleanSigns(sin: string) {
	const signs = [';', '/', '?', ':', '@', '&', '=', '+', '$', ',', '#']
	let out: string = ''
	let dospace: boolean = false
	for (let i = 0; i < sin.length; i++) {
		dospace = false
		for (let j = 0; j < signs.length; j++) {
			if (sin[i] === signs[j]) {
				dospace = true
				break
			}
		}
		if (dospace) out += ' '
		else out += sin[i]
	}
	return out
}

export { cleanInput, cleanAnchor, cleanIndexKey, cleanSigns }
