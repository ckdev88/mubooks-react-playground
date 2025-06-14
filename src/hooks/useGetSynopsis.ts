import { useEffect, useState } from 'react'
const useGetSynopsis = (
	book_id: Book['id'],
	book_cover_edition_key: Book['cover_edition_key'],
	synopsisPages: string[],
	currentPage: string
): string => {
	// NOTE set synoposisON to false when archive/OpenLibrary is unavailable
	const synoposisON = true

	const [synopsis, setSynopsis] = useState<string>('')

	useEffect(() => {
		if (!synoposisON) return

		const fetchSynopsis = async (book_id: string): Promise<void> => {
			const fetchSynopsisPromise = fetch(`https://openlibrary.org/works/${book_id}.json`)
			fetchSynopsisPromise
				.then((response) => {
					if (!response.ok) throw new Error(`Error ${response.status}`)
					return response.json()
				})
				.then((data) => {
					if (data.description && data.description.length > 2) setSynopsis(data.description)
					else if (data.description?.value !== undefined && data.description?.value.length > 2)
						setSynopsis(data.description.value)
					else if (book_cover_edition_key !== undefined) fetchSynopsis2(book_cover_edition_key)
				})
				.catch((error) => {
					// NOTE: may also throw error when OL is simply unavailable, due to hack or something
					console.error('Failed to fetch synopsis:', error)
				})
		}

		const fetchSynopsis2 = async (book_id: string): Promise<void> => {
			const fetchSynopsisPromise = fetch('https://openlibrary.org/books/' + book_id + '.json')
			fetchSynopsisPromise
				.then((response) => {
					if (!response.ok) throw new Error(`Error ${response.status}`)
					return response.json()
				})
				.then((data) => setSynopsis(data.description))
				.catch((error) => {
					console.error('Failed to fetch synopsis 2:', error)
				})
		}
		if (synopsisPages.includes(currentPage) === true) fetchSynopsis(book_id)
	}, [])

	return synopsis
}

export default useGetSynopsis
