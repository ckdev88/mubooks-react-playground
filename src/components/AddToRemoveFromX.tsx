import AddBookToXButton from './AddBookToXButton'
import RemoveBookFromXButton from './RemoveBookFromXButton'
import { useState } from 'react'

const AddToRemoveFromX = ({
	book,
	currentPage,
	limit,
}: {
	book: Book
	currentPage: Page
	limit: 0 | 1 | 2 | 3 | 4
}) => {
	// limit 01234, 0 = no limit, so do all, otherwise just 1 of 1234 (wishlist, reading, saved, favorited)
	const [showHiddenMarks, setShowHiddenMarks] = useState<boolean>(false)

	if (limit > 0) {
		if (limit === 4 && book.list > 2) {
			return (
				<>
					{book.list === limit ? (
						<RemoveBookFromXButton
							book_id={book.id}
							book_title_short={book.title_short}
							book_list={limit}
							targetList={book.list}
							icon={true}
						/>
					) : (
						<AddBookToXButton
							book_id={book.id}
							book_list={book.list}
							book_title={book.title}
							book_title_short={book.title_short}
							book_author_key={book.author_key}
							book_author_name={book.author_name}
							book_cover={book.cover}
							book_cover_edition_key={book.cover_edition_key}
							book_first_publish_year={book.first_publish_year}
							book_img={book.img}
							book_number_of_pages_median={book.number_of_pages_median}
							targetList={limit}
							icon={true}
						/>
					)}
				</>
			)
		}
	} else {
		return (
			<>
				{!book.list && (
					<AddBookToXButton
						book_id={book.id}
						book_list={book.list}
						book_title={book.title}
						book_title_short={book.title_short}
						book_author_key={book.author_key}
						book_author_name={book.author_name}
						book_cover={book.cover}
						book_cover_edition_key={book.cover_edition_key}
						book_first_publish_year={book.first_publish_year}
						book_img={book.img}
						book_number_of_pages_median={book.number_of_pages_median}
						targetList={1}
						icon={true}
					/>
				)}

				{(book.list === 1 || (currentPage === 'search' && (book.list < 2 || !book.list))) && (
					<AddBookToXButton
						book_id={book.id}
						book_list={book.list}
						book_title={book.title}
						book_title_short={book.title_short}
						book_author_key={book.author_key}
						book_author_name={book.author_name}
						book_cover={book.cover}
						book_cover_edition_key={book.cover_edition_key}
						book_first_publish_year={book.first_publish_year}
						book_img={book.img}
						book_number_of_pages_median={book.number_of_pages_median}
						targetList={2}
						icon={true}
						button_title="Start reading"
					/>
				)}

				{(book.list === 2 || (currentPage === 'search' && book.list < 3)) && (
					<AddBookToXButton
						book_id={book.id}
						book_list={book.list}
						book_title={book.title}
						book_title_short={book.title_short}
						book_author_key={book.author_key}
						book_author_name={book.author_name}
						book_cover={book.cover}
						book_cover_edition_key={book.cover_edition_key}
						book_first_publish_year={book.first_publish_year}
						book_img={book.img}
						book_number_of_pages_median={book.number_of_pages_median}
						targetList={3}
						icon={true}
						button_title="Finish reading"
					/>
				)}

				{(book.list === 3 || (currentPage === 'search' && book.list !== 4)) && (
					<AddBookToXButton
						book_id={book.id}
						book_list={book.list}
						book_title={book.title}
						book_title_short={book.title_short}
						book_author_key={book.author_key}
						book_author_name={book.author_name}
						book_cover={book.cover}
						book_cover_edition_key={book.cover_edition_key}
						book_first_publish_year={book.first_publish_year}
						book_img={book.img}
						book_number_of_pages_median={book.number_of_pages_median}
						targetList={4}
						icon={true}
						button_title="Mark as favorite"
					/>
				)}

				{currentPage !== 'dashboard' && (
					<>
						<button className="btn-icon" onClick={() => setShowHiddenMarks(!showHiddenMarks)}>
							<span className="icon icon-dots"></span>
						</button>
					</>
				)}
				<div className={showHiddenMarks ? 'marks' : 'marks dnone'}>
					{book.list === 1 && (
						<RemoveBookFromXButton
							book_id={book.id}
							book_list={book.list}
							book_title_short={book.title_short}
							targetList={1}
							icon={true}
						/>
					)}

					{book.list === 2 && (
						<RemoveBookFromXButton
							book_id={book.id}
							book_list={book.list}
							book_title_short={book.title_short}
							targetList={book.list}
							icon={true}
						/>
					)}

					{(book.list === 3 || book.list === 4) && (
						<RemoveBookFromXButton
							book_id={book.id}
							book_list={book.list}
							book_title_short={book.title_short}
							targetList={3}
							icon={true}
						/>
					)}

					{book.list === 4 && (
						<RemoveBookFromXButton
							book_id={book.id}
							book_list={book.list}
							book_title_short={book.title_short}
							targetList={4}
							icon={true}
						/>
					)}
				</div>

				{
					//  else {
					// 	return (
					// 		<>
					// 			{currentPage !== 'search' ? (
					// 				book.list === 4 ? (
					// 					<>
					// 						<RemoveBookFromXButton
					// 							book_id={book.id}
					// 							book_title_short={book.title_short}
					// 							book_list={book.list}
					// 							targetList={book.list}
					// 							icon={true}
					// 						/>
					// 					</>
					// 				) : (
					// 					book.list === 3 && (
					// 						<AddBookToXButton
					// 							book_id={book.id}
					// 							book_list={book.list}
					// 							book_title={book.title}
					// 							book_title_short={book.title_short}
					// 							book_author_key={book.author_key}
					// 							book_author_name={book.author_name}
					// 							book_cover={book.cover}
					// 							book_cover_edition_key={book.cover_edition_key}
					// 							book_first_publish_year={book.first_publish_year}
					// 							book_img={book.img}
					// 							book_number_of_pages_median={book.number_of_pages_median}
					// 							targetList={4}
					// 							icon={true}
					// 						/>
					// 					)
					// 				)
					// 			) : (
					// 				''
					// 			)}
					// 			{!book.list && (
					// 				<AddBookToXButton
					// 					book_id={book.id}
					// 					book_list={book.list}
					// 					book_title={book.title}
					// 					book_title_short={book.title_short}
					// 					book_author_key={book.author_key}
					// 					book_author_name={book.author_name}
					// 					book_cover={book.cover}
					// 					book_cover_edition_key={book.cover_edition_key}
					// 					book_first_publish_year={book.first_publish_year}
					// 					book_img={book.img}
					// 					book_number_of_pages_median={book.number_of_pages_median}
					// 					targetList={1}
					// 					icon={true}
					// 				/>
					// 			)}
					// 			{
					// 				// 	currentPage !== 'reading' && currentPage !== 'dashboard' && (
					// 				// 	<button className="btn-icon" onClick={() => setShowHiddenMarks(!showHiddenMarks)}>
					// 				// 		<span className="icon icon-dots"></span>
					// 				// 	</button>
					// 				// )
					// 			}
					// 			<div
					// 				className={
					// 					// showHiddenMarks || currentPage === 'reading' ? 'marks dblock' : 'marks dnone'
					// 					'marks dblock'
					// 				}
					// 			>
					// 				{!book.list && (
					// 					<AddBookToXButton
					// 						book_id={book.id}
					// 						book_list={book.list}
					// 						book_title={book.title}
					// 						book_title_short={book.title_short}
					// 						book_author_key={book.author_key}
					// 						book_author_name={book.author_name}
					// 						book_cover={book.cover}
					// 						book_cover_edition_key={book.cover_edition_key}
					// 						book_first_publish_year={book.first_publish_year}
					// 						book_img={book.img}
					// 						book_number_of_pages_median={book.number_of_pages_median}
					// 						targetList={1}
					// 						icon={true}
					// 					/>
					// 				)}
					// 				{(book.list === 1 ||
					// 					((currentPage === 'search' || currentPage === 'dashboard') &&
					// 						(book.list < 2 || !book.list))) && (
					// 					<>
					// 						asd
					// 						<AddBookToXButton
					// 							book_id={book.id}
					// 							book_list={book.list}
					// 							book_title={book.title}
					// 							book_title_short={book.title_short}
					// 							book_author_key={book.author_key}
					// 							book_author_name={book.author_name}
					// 							book_cover={book.cover}
					// 							book_cover_edition_key={book.cover_edition_key}
					// 							book_first_publish_year={book.first_publish_year}
					// 							book_img={book.img}
					// 							book_number_of_pages_median={book.number_of_pages_median}
					// 							targetList={2}
					// 							icon={true}
					// 						/>
					// 					</>
					// 				)}
					// 				{currentPage !== 'search' &&
					// 					(book.list === 2 || (book.list !== 3 && book.list !== 4 && book.list > 1)) && (
					// 						<>
					// 							<AddBookToXButton
					// 								book_id={book.id}
					// 								book_list={book.list}
					// 								book_title={book.title}
					// 								book_title_short={book.title_short}
					// 								book_author_key={book.author_key}
					// 								book_author_name={book.author_name}
					// 								book_cover={book.cover}
					// 								book_cover_edition_key={book.cover_edition_key}
					// 								book_first_publish_year={book.first_publish_year}
					// 								book_img={book.img}
					// 								book_number_of_pages_median={book.number_of_pages_median}
					// 								targetList={3}
					// 								icon={true}
					// 							/>
					// 						</>
					// 					)}
					// 				{(book.list === 3 || (currentPage === 'search' && book.list !== 4)) && (
					// 					<AddBookToXButton
					// 						book_id={book.id}
					// 						book_list={book.list}
					// 						book_title={book.title}
					// 						book_title_short={book.title_short}
					// 						book_author_key={book.author_key}
					// 						book_author_name={book.author_name}
					// 						book_cover={book.cover}
					// 						book_cover_edition_key={book.cover_edition_key}
					// 						book_first_publish_year={book.first_publish_year}
					// 						book_img={book.img}
					// 						book_number_of_pages_median={book.number_of_pages_median}
					// 						targetList={4}
					// 						icon={true}
					// 					/>
					// 				)}
					// 				{book.list === 1 && (currentPage === 'wishlist' || currentPage === 'savedbooks') && (
					// 					<RemoveBookFromXButton
					// 						book_id={book.id}
					// 						book_list={book.list}
					// 						book_title_short={book.title_short}
					// 						targetList={1}
					// 						icon={true}
					// 					/>
					// 				)}
					// 				{book.list === 2 && currentPage !== 'wishlist' && (
					// 					<RemoveBookFromXButton
					// 						book_id={book.id}
					// 						book_list={book.list}
					// 						book_title_short={book.title_short}
					// 						targetList={book.list}
					// 						icon={true}
					// 					/>
					// 				)}
					// 				{(book.list > 3 || book.list === 4) &&
					// 					(currentPage === 'savedbooks' || currentPage === 'finished') && (
					// 						<RemoveBookFromXButton
					// 							book_id={book.id}
					// 							book_list={book.list}
					// 							book_title_short={book.title_short}
					// 							targetList={3}
					// 							icon={true}
					// 						/>
					// 					)}
					// 				{book.list === 4 && (
					// 					<>
					// 						<RemoveBookFromXButton
					// 							book_id={book.id}
					// 							book_list={book.list}
					// 							book_title_short={book.title_short}
					// 							targetList={4}
					// 							icon={true}
					// 						/>
					// 					</>
					// 				)}
					// 			</div>
					// 			<div className={showHiddenMarks || currentPage === 'reading' ? 'marks dblock' : 'marks dnone'}>
					// 				{!book.list && (
					// 					<AddBookToXButton
					// 						book_id={book.id}
					// 						book_list={book.list}
					// 						book_title={book.title}
					// 						book_title_short={book.title_short}
					// 						book_author_key={book.author_key}
					// 						book_author_name={book.author_name}
					// 						book_cover={book.cover}
					// 						book_cover_edition_key={book.cover_edition_key}
					// 						book_first_publish_year={book.first_publish_year}
					// 						book_img={book.img}
					// 						book_number_of_pages_median={book.number_of_pages_median}
					// 						targetList={1}
					// 						icon={true}
					// 					/>
					// 				)}
					// 				{(book.list === 1 || (currentPage === 'search' && (book.list < 2 || !book.list))) && (
					// 					<AddBookToXButton
					// 						book_id={book.id}
					// 						book_list={book.list}
					// 						book_title={book.title}
					// 						book_title_short={book.title_short}
					// 						book_author_key={book.author_key}
					// 						book_author_name={book.author_name}
					// 						book_cover={book.cover}
					// 						book_cover_edition_key={book.cover_edition_key}
					// 						book_first_publish_year={book.first_publish_year}
					// 						book_img={book.img}
					// 						book_number_of_pages_median={book.number_of_pages_median}
					// 						targetList={2}
					// 						icon={true}
					// 					/>
					// 				)}
					// 				{(book.list === 2 || (currentPage === 'search' && book.list !== 3 && book.list !== 4)) && (
					// 					<>
					// 						<AddBookToXButton
					// 							book_id={book.id}
					// 							book_list={book.list}
					// 							book_title={book.title}
					// 							book_title_short={book.title_short}
					// 							book_author_key={book.author_key}
					// 							book_author_name={book.author_name}
					// 							book_cover={book.cover}
					// 							book_cover_edition_key={book.cover_edition_key}
					// 							book_first_publish_year={book.first_publish_year}
					// 							book_img={book.img}
					// 							book_number_of_pages_median={book.number_of_pages_median}
					// 							targetList={3}
					// 							icon={true}
					// 						/>
					// 					</>
					// 				)}
					// 				{(book.list === 3 || (currentPage === 'search' && book.list !== 4)) && (
					// 					<AddBookToXButton
					// 						book_id={book.id}
					// 						book_list={book.list}
					// 						book_title={book.title}
					// 						book_title_short={book.title_short}
					// 						book_author_key={book.author_key}
					// 						book_author_name={book.author_name}
					// 						book_cover={book.cover}
					// 						book_cover_edition_key={book.cover_edition_key}
					// 						book_first_publish_year={book.first_publish_year}
					// 						book_img={book.img}
					// 						book_number_of_pages_median={book.number_of_pages_median}
					// 						targetList={4}
					// 						icon={true}
					// 					/>
					// 				)}
					// 				{book.list === 1 && (
					// 					<RemoveBookFromXButton
					// 						book_id={book.id}
					// 						book_list={book.list}
					// 						book_title_short={book.title_short}
					// 						targetList={1}
					// 						icon={true}
					// 					/>
					// 				)}
					// 				{book.list === 2 && currentPage !== 'dashboard' && (
					// 					<RemoveBookFromXButton
					// 						book_id={book.id}
					// 						book_list={book.list}
					// 						book_title_short={book.title_short}
					// 						targetList={book.list}
					// 						icon={true}
					// 					/>
					// 				)}
					// 				{(book.list === 3 || book.list === 4) && (
					// 					<RemoveBookFromXButton
					// 						book_id={book.id}
					// 						book_list={book.list}
					// 						book_title_short={book.title_short}
					// 						targetList={3}
					// 						icon={true}
					// 					/>
					// 				)}
					// 				{book.list === 4 && (
					// 					<RemoveBookFromXButton
					// 						book_id={book.id}
					// 						book_list={book.list}
					// 						book_title_short={book.title_short}
					// 						targetList={4}
					// 						icon={true}
					// 					/>
					// 				)}
					// 			</div>
					// 		</>
					// 	)
					// }
				}
			</>
		)
	}
}
export default AddToRemoveFromX
