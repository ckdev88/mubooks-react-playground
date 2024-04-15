function isUrl(url: string) {
	if (url.slice(0, 8) === 'https://') return true
	return false
}

export { isUrl }
