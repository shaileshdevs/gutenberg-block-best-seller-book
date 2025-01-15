import { useState, useEffect, useRef } from '@wordpress/element';

const GenreSelection = ( { props } ) => {
	const { attributes, setAttributes } = props;
	const { selectedGenre } = attributes;
	
	const [ genres, setGenres ] = useState([]);
	const selectRef = useRef(null);

	// Populate Genres in dropdown.
	useEffect(() => {
		// Fetch genres from the Biblio REST API
		async function fetchGenres() {
			try {
				const response = await fetch(
					'https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.UK/categories?api_key=7fqge2qgxcdrwqbcgeywwdj2&catSetId=PW&rows=15',
					{
						method: 'GET',
						credentials: 'omit',
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);

				const responseData = await response.json();

				const genresData = responseData.data.categories.map( ( categoryData ) => {
					return {
						id: categoryData.catUri,
						name: categoryData.menuText
					};
				});

				setGenres(genresData);
			} catch (error) {
				console.error('Error fetching genres:', error);
			}
		}

		fetchGenres();
	}, []); // Only run once on mount

	// Handle genre selection.
	const handleGenreChange = (e) => {
		const genreId = e.target.value;
		const genre = genres.find((g) => g.id === genreId);
		const genreName = genre ? genre.name : '';

		setAttributes({ selectedGenre: genreId });
		setAttributes({ genreName: genreName });
	};

	// Initialize Select2 and set default value based on selectedGenre
	useEffect(() => {
		// Only initialize Select2 after genres are loaded
		if (selectRef.current && genres.length > 0) {
			// Initialize Select2 if not already initialized
			if (!jQuery(selectRef.current).hasClass('select2-hidden-accessible')) {
				jQuery(selectRef.current).select2({
					placeholder: 'Search for a genre...',
					data: genres.map((genre) => ({
						id: genre.id,
						text: genre.name,
					})),
				});
			}

			// Set the default selected value if selectedGenre is available
			if (selectedGenre) {
				jQuery(selectRef.current).val(selectedGenre).trigger('change');
			}

			// Handle genre change event
			jQuery(selectRef.current).on('change', handleGenreChange);
		}

		// Cleanup to destroy Select2 instance on unmount
		return () => {
			if (selectRef.current) {
				// Only destroy Select2 if it has been initialized
				if (jQuery(selectRef.current).hasClass('select2-hidden-accessible')) {
					jQuery(selectRef.current).select2('destroy');
				}
			}
		};
	}, [genres, selectedGenre]); // Re-run if genres or selectedGenre changes

	return (
		<select ref={selectRef} style={{ width: '100%' }}>
			<option value="">{selectedGenre ? selectedGenre : 'Select a genre'}</option>
		</select>
	);
};

export default GenreSelection;