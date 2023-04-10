import { Component } from 'react';
// import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleSearch = ({ currentTarget: { value } }) => {
    this.setState({ search: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.search.trim() === '') {
      return toast.error('Сформуйте запит для пошуку');
    }
    this.props.createSearchText(this.state.search);
    // console.log(this.state);
    // console.log(this.props);
    this.setState({ search: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <input
            className={css.input}
            type="text"
            name=" search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.handleSearch}
          />
          <button type="submit" className={css.btn}>
            <BsSearch size="25" />
            <span className={css.label}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}

// Searchbar.propTypes = {
//   HandleSubmit: PropTypes.func.isRequired,
//   handleSearch: PropTypes.func.isRequired,
//   value: PropTypes.string.isRequired,
//   onSubmit: PropTypes.func.isRequired,
// };
