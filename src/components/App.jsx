import { Component } from 'react';
import css from './App.module.css';
import { FetchApi } from 'servises/pixabayAPI';
import { toast, ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from 'components/Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    searchText: '',
    hits: [],
    page: 1,
    totalHits: 0,
    largeImage: '',
    loading: false,
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchText !== this.state.searchText ||
      prevState.page !== this.state.page
    ) {
      // fetch()
      this.FetchImages();
      console.log(prevState.searchText);
      console.log(this.state.searchText);
    }
  }
  FetchImages = async () => {
    const { searchText, page } = this.state;
    this.setState({ loading: true, totalHits: 0 });
    try {
      const { hits, totalHits } = await FetchApi(searchText, page);
      console.log(hits);
      console.log(totalHits);

      this.setState(() => ({
        hits: [...this.state.hits, ...hits],
        totalHits: totalHits,
      }));
    } catch (err) {
      console.log(err);
      toast('Something went wrong...');
      this.setState({ loading: false });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleFormSubmit = search => {
    console.log(search);
    this.setState({ search, hits: [], page: 1 });
  };

  createSearchText = searchText => {
    this.setState({ searchText });
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  createLargeImage = largeImageURL => {
    console.log(largeImageURL);
    this.setState({ largeImage: largeImageURL, showModal: true });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { hits, totalHits, largeImage, showModal, loading } = this.state;
    const { createSearchText, onLoadMore, createLargeImage, toggleModal } =
      this;

    return (
      <div className={css.App}>
        <Searchbar createSearchText={createSearchText} />

        <ImageGallery hits={hits} createLargeImage={createLargeImage} />

        {showModal && (
          <Modal largeImageURL={largeImage} onClick={toggleModal} />
        )}

        {loading && <Loader />}
        {totalHits > 12 && <Button onClick={onLoadMore} />}
        <ToastContainer position="top-center" autoClose={3000} theme="light" />
      </div>
    );
  }
}
