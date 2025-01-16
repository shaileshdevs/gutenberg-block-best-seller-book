# Gutenberg Block: Best Seller Book

This WordPress plugin introduces a custom Gutenberg block that allows Editors to dynamically display the best-selling book in a selected genre. The block integrates with the Biblio REST API to fetch genre and book data, providing an interactive and seamless experience.

## Features

- **Genre Selection**:
  - Editors can select a genre using a combined dropdown and search field.
  - The dropdown options are prepopulated using data from the Biblio REST API.

- **Dynamic Book Display**:
  - On genre selection, the block fetches and displays the best-selling book for that genre in real-time.
  - The book display is styled to match its appearance on the front end, ensuring a consistent editing experience.

- **Sidebar Editing**:
  - Editors can switch genres through the block's settings in the sidebar as well.
  - Changing the genre updates the displayed book dynamically.

## API Integration

This plugin leverages the Biblio REST API for fetching data. The following endpoints are used:

1. **Fetching Genre List**:
   - **Endpoint**:  
     `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.UK/categories`
   - **Parameters**:
     - `rows`: Number of results to return (limit to 15).
     - `catSetId`: Set to `PW` to focus on relevant web-only categories.

2. **Fetching Best-Selling Book for a Genre**:
   - **Endpoint**:  
     `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.UK/works/views/uk-list-display`
   - **Parameters**:
     - `rows`: Number of results to return.
     - `catUri`: The unique ID for the genre selected.

## Installation

1. Clone this repository to your system:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Move the folder `shailesh-gutenberg-blocks` to your WordPress installation's `wp-content/plugins` directory.
2. Activate the plugin via the WordPress admin dashboard.
3. Add the block to any post or page and start displaying the best-selling books by genre.

## The following files are being used for all plugin functionalities
```
├── build
│   ├── block.json
│   ├── index.asset.php
│   ├── index.css
│   ├── index.js
│   └── style-index.css
├── images
│   └── penguine-logo.svg
└── shailesh-gutenberg-blocks.php
```

<hr />
<h4>Steps</h4>
<hr />

*Step 1 - Go to Post/ Page Edit Page*

*Step 2 - Search the Gutenberg block Best Seller and include it in the Post*

*Step 3 - Add and Configure block.

*Step 4 - That's it. View Your Best Seller Book on the Post*
![Best Seller Book on Post](best-seller-book-on-post.png "Best Seller Book Gutenberg Block")
