import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

export const ImageGallery = ({ hits, createLargeImage }) => {
  return (
    hits && (
      <ul className={css.gallery}>
        {hits.map(item => (
          <ImageGalleryItem
            key={item.id}
            item={item}
            createLargeImage={createLargeImage}
          />
        ))}
        {/* Набір <li> із зображеннями  */}
      </ul>
    )
  );
};

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

// id -
// webformatURL -
// largeImageURL
