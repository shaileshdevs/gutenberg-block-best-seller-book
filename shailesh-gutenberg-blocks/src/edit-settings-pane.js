import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	BaseControl
} from '@wordpress/components';

import GenreSelection from './GenreSelection.js';

/**
 * The SettingsPane contains a panel with block's settings.
 * It needs block's attributes to be proxied make use of
 * attributes property and setAttributes setter.
 *
 * @param {Object} props       Block properties
 * @param {Object} props.props Block properties.
 *
 * @return {WPElement} Element to render.
 */
export default function SettingsPane( { props } ) {
	return (
		<InspectorControls>
			<PanelBody
				className="best-seller-book-settings-panel-body"
				title={ __( 'Block Options', 'shailesh-gutenberg-blocks' ) }
			>
				<label>GENRE</label>
				<GenreSelection {...{props}} />
				<p>Select a genre.</p>
			</PanelBody>
		</InspectorControls>
	);
}
