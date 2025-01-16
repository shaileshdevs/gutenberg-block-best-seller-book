<?php
/**
 * Plugin Name:       Shailesh Gutenberg Block Best Seller Book
 * Description:       Gutenber blocks to ease your tasks.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Shailesh
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       shailesh-gutenberg-blocks
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_shailesh_gutenberg_blocks_block_init() {
    if ( current_user_can( 'edit_others_posts' ) ) {
        register_block_type( __DIR__ . '/build' );

        add_action( 'admin_enqueue_scripts', 'enqueue_select2_assets' );
    }
}

add_action( 'init', 'create_block_shailesh_gutenberg_blocks_block_init' );

function enqueue_select2_assets() {
    wp_enqueue_script( 'jquery');
    wp_enqueue_script( 'select2', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.1.0-rc.0/js/select2.min.js', [ 'jquery' ], '4.1.0', true );
    wp_enqueue_style( 'select2-css', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.1.0-rc.0/css/select2.min.css', [], '4.1.0' );
}
