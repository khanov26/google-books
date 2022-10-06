import React, { FC } from 'react';
import { Book } from '../../types/book';
import {Link} from 'react-router-dom';
import './styles.scss';

interface Props {
  book: Book;
}

const SingleBook: FC<Props> = ({ book }) => {
  const category = book.categories.length > 0 ? book.categories[0] : null;

  return (
    <Link to={`/book/${book.id}`} className="book">
      <div className="book__cover">
        {book.coverImage && (
          <img
            src={book.coverImage}
            alt={book.title}
            className="book__coverImage"
          />
        )}
      </div>
      <div className="book__category">{category}</div>

      <h4 className="book__title">{book.title}</h4>

      <div className="book__authors">{book.authors.join(', ')}</div>
    </Link>
  );
};

export default SingleBook;
