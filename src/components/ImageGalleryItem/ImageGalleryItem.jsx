import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  item: { webformatURL, largeImageURL, tags },
  createLargeImage,
}) => {
  const onClickImage = () => {
    createLargeImage(largeImageURL);
  };
  return (
    <div>
      <li className={css.ImageGalleryItem}>
        <img src={webformatURL} alt={tags} onClick={onClickImage} />
      </li>
    </div>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  createLargeImage: PropTypes.func.isRequired,
};
