const getListName = (listId: BookList): string => {
	if (listId === 1) return 'wishlist'
	else if (listId === 2) return 'reading'
	else if (listId === 3) return 'finished'
	else return 'favorite'
}
export default getListName
