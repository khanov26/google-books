import React, { FC } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import './styles.scss';

const BookPage: FC = () => {
  const { id } = useParams();
  const book = useAppSelector((state) =>
    state.books.items.find((book) => book.id === id)
  );

  if (!book) {
    return <Navigate to="/" />;
  }

  return (
    <section className="bookPage">
      <div className="container">
        <Link to="/" className="backLink">
          ← Back
        </Link>

        <div className="bookInfo">
          <div className="bookInfo__text">
            <div className="bookInfo__label">Title</div>
            <div className="bookInfo__value">{book.title}</div>

            {book.description && (
              <>
                <div className="bookInfo__label">Description</div>
                <div className="bookInfo__value">{book.description}</div>
              </>
            )}

            {book.categories.length > 0 && (
              <>
                <div className="bookInfo__label">Categories</div>
                <div className="bookInfo__value">
                  {book.categories.join(', ')}
                </div>
              </>
            )}

            {book.authors.length > 0 && (
              <>
                <div className="bookInfo__label">Authors</div>
                <div className="bookInfo__value">{book.authors.join(', ')}</div>
              </>
            )}
          </div>

          <div className="bookInfo__cover">
            {book.coverImage && (
              <img
                src={book.coverImage}
                alt=""
                className="bookInfo__coverImage"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookPage;
