import { cleanAnchor } from '../helpers/cleanInput'
const BooksWithoutPagesList = ({arr}:{arr: string[]}) => {
	return arr.map((bookTitle: string, index: number) => {
		const key = 'Nopagesfor' + index + cleanAnchor(bookTitle)
		return <li key={key}>{bookTitle}</li>
	})
}
export default BooksWithoutPagesList
