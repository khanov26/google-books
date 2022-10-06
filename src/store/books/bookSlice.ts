import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BooksState, FetchBooksItem, FetchBooksResponse } from './types';
import { Book } from '../../types/book';
import { RootState } from '..';

const MAX_QUANTITY = 30;

const initialState: BooksState = {
  loading: false,
  items: [],
  error: null,
  areThereMore: false,
  category: '',
  orderBy: 'relevance',
  queryTerm: '',
  startIndex: 0,
};

export const fetchBooks = createAsyncThunk<
  FetchBooksResponse,
  void,
  { state: RootState }
>('books/fetch', async (_, { getState }) => {
  return fetchBooksHelper(getState);
});

export const loadMore = createAsyncThunk<
  FetchBooksResponse,
  void,
  { state: RootState }
>('books/loadMore', async (_, { getState }) => {
  return fetchBooksHelper(getState);
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    changeOrderBy: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload;
    },
    changeQueryTerm: (state, action: PayloadAction<string>) => {
      state.queryTerm = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.startIndex = 0;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.totalItems = action.payload.totalItems;
        if (action.payload.items) {
          state.items = action.payload.items.map(mapResponseToBook);
          state.areThereMore = state.totalItems > state.items.length;
        } else {
          state.items = [];
        }
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? '';
      })
      .addCase(loadMore.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.startIndex += MAX_QUANTITY;
      })
      .addCase(loadMore.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.items) {
          const newBooks = action.payload.items.map(mapResponseToBook);
          state.items.push(...newBooks);
        } 
        if (
          !action.payload.items ||
          action.payload.items.length < MAX_QUANTITY
        ) {
          state.areThereMore = false;
        }
      })
      .addCase(loadMore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? '';
      });
  },
});

export const { changeCategory, changeOrderBy, changeQueryTerm } =
  booksSlice.actions;

export default booksSlice.reducer;

function mapResponseToBook(book: FetchBooksItem): Book {
  return {
    id: book.id,
    title: book.volumeInfo.title,
    description: book.volumeInfo.description ?? '',
    authors: book.volumeInfo.authors ?? [],
    categories: book.volumeInfo.categories ?? [],
    coverImage: book.volumeInfo.imageLinks?.thumbnail ?? '',
  };
}

async function fetchBooksHelper(getState: () => RootState) {
  const state = getState();
  const { category, orderBy, queryTerm, startIndex } = state.books;
  const url = getSearchUrl({ category, orderBy, queryTerm, startIndex });
  const response = await fetch(url);
  if (!response.ok) {
    const errorMessage = await response.text();
    return Promise.reject(errorMessage);
  }

  return await response.json();
}

function getSearchUrl({
  category,
  orderBy,
  queryTerm,
  startIndex,
}: {
  category: string;
  orderBy: string;
  queryTerm: string;
  startIndex: number;
}) {
  let query = queryTerm;
  if (category) {
    query += `+subject:${category}`;
  }

  const key = process.env.REACT_APP_KEY || '';

  const searchParams = new URLSearchParams({
    q: query,
    orderBy,
    startIndex: String(startIndex),
    maxResults: String(MAX_QUANTITY),
    key,
  });

  const url = new URL('https://www.googleapis.com/books/v1/volumes');
  url.search = searchParams.toString();

  return url;
}
