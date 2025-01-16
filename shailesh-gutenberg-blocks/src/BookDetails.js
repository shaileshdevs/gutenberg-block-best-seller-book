import { useEffect } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

import logo from "../images/penguine-logo.svg";

const BookDetails = ( { props } ) => {
    const { attributes, setAttributes } = props;
    const { selectedGenre, bestSellerLabel } = attributes;
    
    // Fetch best-selling book when genre is selected.
    useEffect(() => {
        if (selectedGenre) {
            async function fetchBestSellingBook() {
                try {
                    const response = await fetch(
                        `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.UK/works/views/uk-list-display?api_key=7fqge2qgxcdrwqbcgeywwdj2&catUri=${selectedGenre}&catSetId=PW&&sort=weeklySales&dir=desc&rows=15`,
                        {
                            method: 'GET',
                            credentials: 'omit',
                            headers: { 'Content-Type': 'application/json' }
                        }
                    );
                    const responseData = await response.json();
                    const book         = responseData?.data?.works[0];

                    const linkData  = book?.affiliateLinks.find( (linkData) => "amazon" === linkData?.affiliateType );
                    const amazonUrl = linkData ? linkData?.url : '';
            
                    console.log('shvsh book')
                    console.log( book );

                    const tempBestSellingBook = {
                        title: book.title,
                        author_1: {
                            name: book?.authors?.[0]?.authorDisplay,
                            url: book?.authors?.[0]?.seoFriendlyUrl ? "https://www.penguin.co.uk" + book.authors[0].seoFriendlyUrl: ""
                        },
                        author_2: {
                            name: book?.authors?.[1]?.authorDisplay,
                            url: book?.authors?.[1]?.seoFriendlyUrl ? "https://www.penguin.co.uk" + book.authors[1].seoFriendlyUrl: ""
                        },
                        coverImageUrl: book.coverUrls.medium.coverUrl,
                        amazonUrl: amazonUrl,
                        penguineBookUrl: "https://www.penguin.co.uk/" + book?.seoFriendlyUrl
                    };

                    setAttributes({ bestSellingBook: tempBestSellingBook });
                } catch (error) {
                    console.error('Error fetching best-selling book:', error);
                }
            }
            fetchBestSellingBook();
        }
    }, [selectedGenre]);

    if ( ! attributes?.selectedGenre ) {
        return '';
    }

    const { title, author, coverImageUrl, author_1, author_2 } = attributes?.bestSellingBook;

    return (
        <div className="book-card">
            <RichText
                className="header"
                tagName="h2"
                placeholder="Bestsellers"
                value={ bestSellerLabel }
                onChange={ ( bestSellerLabel ) => setAttributes( { bestSellerLabel } ) }
            />            
 
            <div className="content">
                <a href="#">
                    <img 
                        src={coverImageUrl}
                        alt={title}
                        className="book-cover"
                    />
                </a>
                
                <h2 className="title">{title}</h2>
                
                <p className="author">
                    {
                        <a href="#">{author_1.name}</a>
                    }
                    {
                        author_2?.name ? (
                            <>
                                ,<br />{author_2.name}
                            </>
                        ) : ""
                    }
                </p>

                <a href="#">
                    <button className="buy-button">BUY FROM AMAZON</button>
                </a>

                <div className="publisher-logo-wrapper">
                    <hr className="line left-line" />
                    <img
                        src={logo}
                        alt="Publisher logo"
                        width={40}
                        height={40}
                        className="publisher-logo"
                    />
                    <hr className="line right-line" />
                </div>
            </div>
        </div>
    )
}

export default BookDetails;
