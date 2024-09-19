import getListName from '../functions/getListName'
import useMyBooksAdd from '../hooks/useMyBooksAdd'

const AddBookToXButton = ({
	book_id,
	book_list,
	book_title,
	book_title_short,
	book_author_key,
	book_author_name,
	book_cover,
	book_cover_edition_key,
	book_first_publish_year,
	book_img,
	book_number_of_pages_median,
	targetList,
	icon = false,
	button_title = '',
	book_rate_stars,
	book_rate_spice,
	book_review_fav_quote,
}: {
	book_id: Book['id']
	book_list: Book['list']
	book_title: Book['title']
	book_title_short: Book['title_short']
	book_author_key: Book['author_key']
	book_author_name: Book['author_name']
	book_cover: Book['cover']
	book_cover_edition_key: Book['cover_edition_key']
	book_first_publish_year: Book['first_publish_year']
	book_img: Book['img']
	book_number_of_pages_median: Book['number_of_pages_median']
	targetList: BookList
	icon: boolean
	button_title?: string
	book_rate_stars: Book['rate_stars']
	book_rate_spice: Book['rate_spice']
	book_review_fav_quote: Book['review_fav_quote']
}) => {
	if (button_title === '') button_title = `Add to ${getListName(targetList)}`

	const book: Book = {
		id: book_id,
		list: book_list,
		title: book_title,
		title_short: book_title_short,
		author_key: book_author_key,
		author_name: book_author_name,
		cover: book_cover,
		cover_edition_key: book_cover_edition_key,
		first_publish_year: book_first_publish_year,
		img: book_img,
		number_of_pages_median: book_number_of_pages_median,
		rate_stars: book_rate_stars,
		rate_spice: book_rate_spice,
		review_fav_quote: book_review_fav_quote,
	}
	const [AddBookToXButtonAct, isLoading] = useMyBooksAdd({ book, targetList })

	const iconClassName = 'icon icon-' + getListName(targetList)

	if (icon && targetList === 4)
		return <span className="icon-heart inactive" onClick={() => AddBookToXButtonAct()}></span>

	return (
		<div className="mark">
			<button className="btn-text" onClick={() => AddBookToXButtonAct()} disabled={isLoading}>
				<span className={iconClassName}></span>
				{button_title}
			</button>
		</div>
	)
}
export default AddBookToXButton
