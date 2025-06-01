function cleanInput(input: string, capfirst = false): string {
    const inputString = input.trim()
    if (inputString.length < 1) return ""
    let returnvalue: string

    let charc0 = inputString.charCodeAt(0)
    if (capfirst && charc0 > 96 && charc0 < 123) {
        charc0 -= 32
        returnvalue = String.fromCharCode(charc0) + inputString.slice(1)
    } else returnvalue = inputString
    return returnvalue
}

function cleanAnchor(input: string, dashes = true, snake = false): string {
    if (input.length < 1) return ""
    let returnvalue = ""

    let c: number
    for (let i = 0; i < input.length; i++) {
        c = input.charCodeAt(i)
        // change to hyphen if not part of alphanumerical ... 48=0, 57=9, 65=A, 90=Z, 97=a, 122=z
        if (input[i] === "?") break
        if (c < 48 || (c > 57 && c < 65) || (c > 90 && c < 97) || c > 122) {
            if (dashes) returnvalue += "-"
            else if (snake) returnvalue += "_"
        } else returnvalue += input[i]
    }
    return returnvalue
}

/**
 * Take in a text and an index number, clean it and return a string to be used as (part of) unique key.
 * Example:
 *     input: "There's a b#213 here", index: 420
 *     returns string "Theresab213here420"
 */
function cleanIndexKey(input: string, index: number): string {
    let returnvalue = ""
    for (let i = 0; i < input.length; i++) {
        if (isAlphanum(input[i])) returnvalue += input[i]
    }
    if (returnvalue === "") {
        returnvalue += Math.floor(Math.random() * 10000).toString()
    }
    returnvalue += index

    return returnvalue
}

function isAlphanum(char: string | number): boolean {
    if (typeof char === "number") return true
    const c = char.charCodeAt(0)
    if (
        (c > 47 && c < 58) || // 0-9
        (c > 64 && c < 91) || // A-Z
        // (c > 90 && c < 97) || // [\]^_`
        (c > 96 && c < 123) // a-z
    ) {
        return true
    }
    return false
}

function cleanSigns(sin: string) {
    const signs = [";", "/", "?", ":", "@", "&", "=", "+", "$", ",", "#"]
    let out = ""
    let dospace = false
    for (let i = 0; i < sin.length; i++) {
        dospace = false
        for (let j = 0; j < signs.length; j++) {
            if (sin[i] === signs[j]) {
                dospace = true
                break
            }
        }
        if (dospace) out += " "
        else out += sin[i]
    }
    return out
}

export { cleanInput, cleanAnchor, cleanIndexKey, cleanSigns }
