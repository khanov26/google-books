import React, { FC } from 'react';
import { Book } from '../../types/book';
import SingleBook from '../SingleBook';
import './styles.scss';

interface Props {
  books: Book[];
}

const BooksList: FC<Props> = ({ books }) => {
  return (
    <div className="booksList">
      {books.map((book) => (
        <SingleBook key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BooksList;
