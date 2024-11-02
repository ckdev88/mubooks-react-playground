import { HashLink } from 'react-router-hash-link'
import { cleanAnchor } from '../helpers/cleanInput'
const BooksWithoutPagesList = ({ bwp, year }: { bwp: BooksWithoutPages; year: number }) => {
	return bwp.map((b) => {
		const refer: string = 'finished' + `#${cleanAnchor(b.title_short)}_${b.id}`
		return (
			<li key={'bwp' + year + b.id}>
				<HashLink className="a-text italic" to={`/${refer}`}>
					{b.title_short}
				</HashLink>
				<br />
			</li>
		)
	})
}
export default BooksWithoutPagesList
