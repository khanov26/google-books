import React, { ChangeEventHandler, FormEventHandler } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import {
  changeCategory,
  changeOrderBy,
  changeQueryTerm,
  fetchBooks,
} from '../../store/books/bookSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './styles.scss';

const Search = () => {
  const dispatch = useAppDispatch();
  const { category, orderBy, queryTerm } = useAppSelector(
    (state) => state.books
  );

  const handleQueryTermChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch(changeQueryTerm(event.target.value));
  };

  const handleCategoryChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    dispatch(changeCategory(event.target.value));
    if (queryTerm) {
      dispatch(fetchBooks());
    }
  };

  const handleOrderByChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    dispatch(changeOrderBy(event.target.value));
    if (queryTerm) {
      dispatch(fetchBooks());
    }
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(fetchBooks());
  };

  return (
    <div className="search">
      <div className="search__row">
        <form action="" className="search__form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="search__field"
            value={queryTerm}
            onChange={handleQueryTermChange}
          />
          <button className="search__button">
            <SearchIcon />
          </button>
        </form>
      </div>

      <div className="search__row search__options">
        <div className="search__option">
          <label htmlFor="categories" className="search__optionLabel">
            Categories
          </label>
          <select
            className="search__optionValue"
            id="categories"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">all</option>
            <option value="art">art</option>
            <option value="biography">biography</option>
            <option value="computers">computers</option>
            <option value="history">history</option>
            <option value="medical">medical</option>
            <option value="poetry">poetry</option>
          </select>
        </div>

        <div className="search__option">
          <label htmlFor="sorting" className="search__optionLabel">
            Sorting by
          </label>
          <select
            className="search__optionValue"
            id="sorting"
            value={orderBy}
            onChange={handleOrderByChange}
          >
            <option value="relevance">relevance</option>
            <option value="newest">newest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Search;
