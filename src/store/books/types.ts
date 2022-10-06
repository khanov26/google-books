import { Book } from '../../types/book';

export interface BooksState {
  loading: boolean;
  items: Book[];
  totalItems?: number;
  error: string | null;
  areThereMore: boolean;
  queryTerm: string;
  category: string;
  orderBy: string;
  startIndex: number;
}

export interface FetchBooksItem {
  id: string;
  volumeInfo: {
    title: string;
    description?: string;
    authors?: string[];
    categories?: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
}

export interface FetchBooksResponse {
  totalItems: number;
  items?: FetchBooksItem[];
}
