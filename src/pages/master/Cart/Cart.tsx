import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect } from "react";

import {
  fetchBasket,
  removeFromCart,
  addToCart,
} from "../../../redux/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBasket());
  }, [dispatch]);

  // Handle removing an item from the cart
  const handleRemoveFromCart = (id: string | number) => {
    dispatch(removeFromCart({ book: id }));
  };

  // Handle adding an item to the cart
  const handleAddToCart = (id: string | number) => {
    dispatch(addToCart({ book: id, quantity: 1 }));
  };

  // Get cart-related data from the Redux store
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );

  const items = useSelector((state: RootState) => state.cart.items);
  const cartStatus = useSelector((state: RootState) => state.cart.status);

  // Handle loading and error states
  if (cartStatus === "loading") {
    return <p>Loading cart items...</p>;
  }

  if (cartStatus === "failed") {
    return <p>Error: Failed to load cart items.</p>;
  }

  if (items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <p>Total Items: {totalQuantity}</p>
      <ul>
        {items.map((item, index) => {
          // Check if book is an object or ID and handle accordingly
          const bookId =
            typeof item.book === "object" ? item.book._id : item.book;
          const bookTitle = typeof item.book === "object" ? item.book.price : 0; // Fallback if book object is missing

          return (
            <li key={item._id}>
              <h1 className="text-2xl font-bold">Book no {index + 1}</h1>
              <div className="flex flex-row justify-between">
                <p>Book ID: {bookId}</p>
                <p>Title: {bookTitle}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleRemoveFromCart(bookId)}>
                  Delete
                </button>
                <button onClick={() => handleAddToCart(bookId)}>Add</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
