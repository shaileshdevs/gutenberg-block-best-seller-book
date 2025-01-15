import logo from "../images/penguine-logo.svg";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	RichText
} from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function Save( props ) {
	const blockProps = useBlockProps.save();
	const { attributes, setAttributes } = props;
	const { selectedGenre, bestSellerLabel, bestSellingBook } = attributes;

	// Check if the required attributes exist
	if (!selectedGenre || !bestSellingBook) {
		return null;
	}

    const { title, author, coverImageUrl, author_1, author_2, amazonUrl, penguineBookUrl } = bestSellingBook;

	return (
		<div {...blockProps}>
			<div className="book-card">
				<RichText.Content
					className="header"
					tagName="h2"
					value={ bestSellerLabel }
				/>
				
				<div className="content">
					<a href={penguineBookUrl} target="_blank">
						<img 
							src={coverImageUrl}
							alt={title}
							// width={200}
							// height={300}
							className="book-cover"
						/>
					</a>
					
					<h2 className="title">{title}</h2>
					
					<p className="author">
						{
							<a href={author_1?.url} target="_blank">{author_1.name}</a>
						}
						{
							author_2?.name ? (
								<>
									,<br />{author_2.name}
								</>
							) : ""
						}
					</p>

					<a href={amazonUrl} target="_blank">
						<button className="buy-button">BUY FROM AMAZON</button>
					</a>

					<img
						src={logo}
						alt="Penguin logo"
						width={40}
						height={40}
						className="publisher-logo"
					/>
				</div>
			</div>
		</div>
	);
}
