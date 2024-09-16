import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { masterUrls } from "../constants/URL_END_POINTS";
import { Book } from "../interfaces/MasterData";

interface CartItem {
  book: string; // Book ID
  quantity: number;
  _id: string;
}

interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalQuantity: number;
  booksDetails: { [key: string]: Book };
}

const initialState: CartState = {
  items: [],
  status: "idle",
  error: null,
  totalQuantity: 0,
  booksDetails: {},
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    item: {
      book: string | number;
      quantity: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await axios.post(masterUrls.addBook, item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response ? axiosError.response.data : axiosError.message
      );
    }
  }
);

// Async Thunk for removing an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (
    item: {
      book: string | number;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await axios.delete(masterUrls.deleteBook, {
        data: item,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response ? axiosError.response.data : axiosError.message
      );
    }
  }
);
// Async Thunk for updating the quantity of an item in the cart
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    { bookId, quantity }: { bookId: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`{{local}}/api/basket/${bookId}`, {
        items: [
          {
            book: bookId,
            quantity: quantity,
          },
        ],
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        return rejectWithValue(axiosError.response.data);
      }

      return rejectWithValue(axiosError.message);
    }
  }
);

// Async Thunk for fetching cart basket
export const fetchBasket = createAsyncThunk(
  "cart/fetchBasket",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token
      if (!token) {
        throw new Error("No authentication token found.");
      }
      const response = await axios.get(masterUrls.getBasket, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response ? axiosError.response.data : axiosError.message
      );
    }
  }
);

// Async Thunk for fetching single book object
export const fetchSingleBook = createAsyncThunk(
  "books/fetchSingleBook",
  async (bookId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await axios.get(`${masterUrls.getOne}/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response ? axiosError.response.data : axiosError.message
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const validItems = action.payload.data.items.filter(
          (item: CartItem) => item.book && item.quantity > 0
        );

        state.items = [...validItems];

        state.totalQuantity = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.data.items.filter(
          (item: CartItem) => item.quantity > 0
        );

        state.totalQuantity = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex(
          (item) => item.book === action.meta.arg.bookId
        );
        if (index !== -1) {
          state.items[index].quantity = action.meta.arg.quantity;
        }
      })

      .addCase(updateCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchBasket.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBasket.fulfilled, (state, action) => {
        state.status = "succeeded";

        const uniqueItems = action.payload.items
          .filter(
            (item: { book: { _id: string } | string; quantity: number }) =>
              item.book && item.quantity >= 1
          )
          .filter(
            (
              item: { book: { _id: string } | string },
              index: number,
              self: { book: { _id: string } | string }[]
            ) =>
              index ===
              self.findIndex((i: { book: { _id: string } | string }) =>
                typeof i.book === "string"
                  ? i.book ===
                    (typeof item.book === "string" ? item.book : item.book._id)
                  : i.book._id ===
                    (typeof item.book === "string" ? item.book : item.book._id)
              )
          );

        state.items = uniqueItems;

        //calculating the total quantity
        state.totalQuantity = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      })

      .addCase(fetchBasket.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(fetchSingleBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleBook.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Store each book detail by its ID
        state.booksDetails[action.payload._id] = action.payload;
      })
      .addCase(fetchSingleBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
