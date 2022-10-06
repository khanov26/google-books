import React, { FC } from 'react'
import Alert from '../../components/Alert';
import BooksList from '../../components/BooksList';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import LoadButton from '../../components/LoadButton';
import { loadMore } from '../../store/books/bookSlice';
import './styles.scss';

const MainPage: FC = () => {
  const dispatch = useAppDispatch();

  const {
    loading,
    items: books,
    error,
    totalItems,
    areThereMore
  } = useAppSelector((state) => state.books);

  const handleLoadMoreClick = () => {
    dispatch(loadMore());
  };

  return (
    <>
      <Header />
      <section className="searchResult">
        <div className="container">
          {totalItems !== undefined && (
            <h5 className="searchResult__foundNumber">
              Found {totalItems} results
            </h5>
          )}
          <BooksList books={books} />

          {areThereMore && (
            <LoadButton disabled={loading} onClick={handleLoadMoreClick} />
          )}

          {loading && <Loading />}

          {error && <Alert variant="error">{error}</Alert>}
        </div>
      </section>
    </>
  );
}

export default MainPage