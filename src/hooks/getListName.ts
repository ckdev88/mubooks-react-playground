const getListName = (listId: BookList): string => {
	if (listId === 1) return 'wishlist'
	else if (listId === 2) return 'reading'
	else if (listId === 3) return 'finished'
	else if (listId === 4) return 'favorite'
	else {
		console.error('hmmm, something is wrong here.')
		return 'none'
	}
}
export default getListName
