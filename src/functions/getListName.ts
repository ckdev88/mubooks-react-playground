const getListName = (listId: BookList): string => {
    if (listId === undefined) {
        console.log("aint got no listid, see? ", listId)
        return "nada"
    }
    let listName = "none"
    if (listId === 1) listName = "wishlist"
    else if (listId === 2) listName = "reading"
    else if (listId === 3) listName = "finished"
    else if (listId === 4) listName = "favorite"
    else console.error("No list name? There must be something wrong...", listId)

    return listName
}
export default getListName
