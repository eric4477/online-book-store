import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { masterUrls } from "../constants/URL_END_POINTS";

interface CartItem {
  book: string; // Book ID
  quantity: number;
}

interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  status: "idle",
  error: null,
  totalQuantity: 0,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { rejectWithValue }) => {
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
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async Thunk for removing an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (item, { rejectWithValue }) => {
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
      console.log(response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
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
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

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

      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
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
        state.items = [...action.payload.data.items];
        console.log(action.payload);
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

        state.items = [...action.payload.data.items];
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
        state.items = action.payload.items;

        state.totalQuantity = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      })

      .addCase(fetchBasket.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
