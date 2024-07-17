const getListName = (listId: BookList): string => {
	if (listId === 1) return 'wishlist'
	else if (listId === 2) return 'reading'
	else if (listId === 3) return 'finished'
	else if (listId === 4) return 'favorite'
	else {
		console.error('No list name? There must be something wrong...')
		return 'none'
	}
}
export default getListName
