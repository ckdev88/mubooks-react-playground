import { createContext, useEffect, useState } from 'react'
import TropesInMyBooks from '../../components/TropesInMyBooks'
import TropesPrefs from '../../components/TropesPrefs'

export const TropesPageContext = createContext<TropesPageContextType>({} as TropesPageContextType)

const currentPage = 'tropes'

const TropesPage = () => {
	const [likedTropes, setLikedTropes] = useState<BookTropes>([])
	const [dislikedTropes, setDislikedTropes] = useState<BookTropes>([])
	const [dislikedTropesLowercase, setDislikedTropesLowercase] = useState(
		dislikedTropes.map((trope) => trope.toLowerCase())
	)
	const [likedTropesLowercase, setLikedTropesLowercase] = useState(likedTropes.map((trope) => trope.toLowerCase()))

	useEffect(() => {
		setLikedTropesLowercase(likedTropes.map((t) => t.toLowerCase()))
	}, [likedTropes])

	useEffect(() => {
		setDislikedTropesLowercase(dislikedTropes.map((t) => t.toLowerCase()))
	}, [dislikedTropes])

	return (
		<TropesPageContext.Provider
			value={{
				setLikedTropes,
				likedTropes,
				dislikedTropes,
				setDislikedTropes,
				likedTropesLowercase,
				dislikedTropesLowercase,
			}}
		>
			<>
				<h1>My Tropes</h1>
				<TropesPrefs field="tropes_liked" />
				<TropesPrefs field="tropes_disliked" />
				<br/>
				<hr />
				<TropesInMyBooks page={currentPage} />
			</>
		</TropesPageContext.Provider>
	)
}

export default TropesPage
