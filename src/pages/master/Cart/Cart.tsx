import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useMemo } from "react";
import { fetchSingleBook } from "../../../redux/cartSlice";
import removeIcon from "../../../assets/images/remove-icon.svg";
import bookImg from "../../../assets/images/book-img-6.jpg";
import { useAppDispatch } from "../../../redux/hooks";
import { Elements } from "@stripe/react-stripe-js";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Divider,
  Skeleton,
} from "@mui/material";

import {
  fetchBasket,
  removeFromCart,
  addToCart,
} from "../../../redux/cartSlice";
import PageNavigator from "../../../shared/PageNavigator";
import { setShowLinks, setShowLogo } from "../../../redux/navbarSlice";
import Navbar from "../../../shared/Navbar";
import { Book } from "../../../interfaces/MasterData";
import ShippingForm from "./components/ShippingForm";
import { loadStripe } from "@stripe/stripe-js";

interface CartItem {
  book: Book | string;
  quantity: number;
}

function Cart() {
  const dispatch = useAppDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const cartStatus = useSelector((state: RootState) => state.cart.status);
  const booksDetails = useSelector(
    (state: RootState) => state.cart.booksDetails
  );

  useEffect(() => {
    dispatch(fetchBasket());
    dispatch(setShowLinks(false));
    dispatch(setShowLogo(true));
  }, [dispatch]);

  useEffect(() => {
    items.forEach((item: CartItem) => {
      const bookId =
        typeof item.book === "object" && item.book !== null
          ? item.book._id
          : item.book;
      if (bookId) {
        dispatch(fetchSingleBook(bookId));
      }
    });
  }, [items, dispatch]);

  const TAX_RATE = 0.05; // 5% tax

  //publishable key
  const stripePromise = loadStripe(
    "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
  );

  // memo callback function for calculating the total price
  const totalCost = useMemo(() => {
    return items.reduce((total, item: CartItem) => {
      const bookId =
        typeof item.book === "object" && item.book !== null
          ? item.book._id
          : item.book;
      const bookDetails = booksDetails[bookId];
      return total + (bookDetails?.price ?? 0) * item.quantity;
    }, 0);
  }, [items, booksDetails]);

  // calculating the tax
  const tax = totalCost * TAX_RATE;
  // calculating the total plus tax
  const totalCostWithTax = totalCost + tax;

  // Handle removing an item from the cart
  const handleRemoveFromCart = (id: string | number) => {
    dispatch(removeFromCart({ book: id }));
  };

  // Handle adding an item to the cart
  const handleAddToCart = (id: string | number) => {
    dispatch(addToCart({ book: id, quantity: 1 }));
  };

  return (
    <div className="cart-page font-inter pb-10">
      <Navbar />
      <PageNavigator page="Cart" />
      <Box
        sx={{
          padding: "64px 40px 0 40px",
          "@media (max-width: 635px)": {
            paddingLeft: "20px",
            paddingRight: "20px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            minWidth: "100%",
            "@media (max-width: 1000px)": {
              flexDirection: "column",
              alignItems: "center",
              gap: "40px",
            },
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: "55%",
              background: "linear-gradient(to right, #FFE5E5, #F5FFFE)",
              borderRadius: "10px",
              paddingBottom: "60px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              "@media (max-width: 1000px)": {
                maxWidth: "100%",
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "#393280",
                fontSize: "24px",
                fontWeight: "500",
                paddingTop: "20px",
                marginBottom: "20px",
                marginLeft: "16px",
              }}
            >
              Products Details
            </Typography>

            {cartStatus === "failed" && (
              <Typography
                sx={{
                  color: "red",
                  fontSize: "18px",
                  fontWeight: "500",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Error: Failed to load cart items.
              </Typography>
            )}

            <Table>
              <TableHead
                sx={{
                  paddingTop: "20px",
                }}
              >
                <TableRow
                  sx={{
                    borderTop: "1px solid #888888",
                  }}
                >
                  <TableCell
                    sx={{
                      color: "#393280",
                      fontSize: "24px",
                      fontWeight: "500",
                      borderBottom: "1px solid #888888",
                      textAlign: "center",
                    }}
                  >
                    Num
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#393280",
                      fontSize: "24px",
                      fontWeight: "500",
                      borderBottom: "1px solid #888888",
                      textAlign: "center",
                    }}
                  >
                    Book
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #888888",
                    }}
                  >
                    {""}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#393280",
                      fontSize: "24px",
                      fontWeight: "500",
                      borderBottom: "1px solid #888888",
                      textAlign: "center",
                    }}
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#393280",
                      fontSize: "24px",
                      fontWeight: "500",
                      borderBottom: "1px solid #888888",
                      textAlign: "center",
                    }}
                  >
                    Cost
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#393280",
                      fontSize: "24px",
                      fontWeight: "500",
                      borderBottom: "1px solid #888888",
                      textAlign: "center",
                    }}
                  >
                    Subtotal
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item: CartItem, index) => {
                  const bookId =
                    typeof item.book === "object" && item.book !== null
                      ? item.book._id
                      : item.book;
                  const bookDetails = booksDetails[bookId];
                  const subtotal = (bookDetails?.price ?? 0) * item.quantity;

                  return (
                    <TableRow key={index}>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          color: "#393280",
                          fontSize: "20px",
                          fontWeight: "500",
                        }}
                      >
                        {cartStatus === "loading" ? (
                          <Box sx={{ display: "grid", placeItems: "center" }}>
                            <Skeleton variant="text" width={20} height={50} />
                          </Box>
                        ) : (
                          index + 1
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          color: "#393280",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        {cartStatus === "loading" ? (
                          <Box sx={{ display: "grid", placeItems: "center" }}>
                            <Skeleton
                              variant="rectangular"
                              width={70}
                              height={95}
                            />
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              className="w-[70px]"
                              src={bookImg}
                              alt="book image"
                            />
                          </Box>
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          color: "#393280",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        {cartStatus === "loading" ? (
                          <Box sx={{ display: "grid", placeItems: "center" }}>
                            <Skeleton variant="text" width={100} />
                          </Box>
                        ) : (
                          bookDetails?.name
                        )}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {cartStatus === "loading" ? (
                          <Box sx={{ display: "grid", placeItems: "center" }}>
                            <Skeleton
                              variant="rectangular"
                              width={100}
                              height={40}
                            />
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              borderRadius: "10px",
                              fontSize: "16px",
                              display: "flex",
                              alignItems: "center",
                              fontFamily: "Manrope",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              onClick={() => handleRemoveFromCart(bookId)}
                              variant="text"
                              sx={{
                                backgroundColor: "#393280",
                                padding: "3px 10px",
                                color: "white",
                                minWidth: "0",
                                borderRadius: "0px",
                                borderTopLeftRadius: "5px",
                                borderBottomLeftRadius: "5px",
                                "&:hover": {
                                  backgroundColor: "#393280",
                                },
                              }}
                            >
                              -
                            </Button>
                            <Box
                              sx={{
                                backgroundColor: "white",
                                height: "100%",
                                padding: "4px 10px",
                                color: "#393280",
                                fontWeight: "600",
                              }}
                            >
                              {item.quantity}
                            </Box>
                            <Button
                              onClick={() => handleAddToCart(bookId)}
                              variant="text"
                              sx={{
                                backgroundColor: "#393280",
                                padding: "3px 10px",
                                color: "white",
                                minWidth: "0",
                                borderRadius: "0px",
                                borderTopRightRadius: "5px",
                                borderBottomRightRadius: "5px",
                                "&:hover": {
                                  backgroundColor: "#393280",
                                },
                              }}
                            >
                              +
                            </Button>
                          </Box>
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          color: "#393280",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        {cartStatus === "loading" ? (
                          <Box sx={{ display: "grid", placeItems: "center" }}>
                            <Skeleton variant="text" width={50} />
                          </Box>
                        ) : (
                          `${bookDetails?.price} AED`
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          color: "#393280",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        {cartStatus === "loading" ? (
                          <Box sx={{ display: "grid", placeItems: "center" }}>
                            <Skeleton variant="text" width={80} />
                          </Box>
                        ) : (
                          `${subtotal} AED`
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          borderTop: "1px solid #888888",
                        }}
                      >
                        {cartStatus === "loading" ? (
                          <Box sx={{ display: "grid", placeItems: "center" }}>
                            <Skeleton
                              variant="rectangular"
                              width={30}
                              height={30}
                            />
                          </Box>
                        ) : (
                          <Button
                            onClick={() => handleRemoveFromCart(bookId)}
                            sx={{
                              padding: 0,
                              minWidth: "33px",
                            }}
                          >
                            <img src={removeIcon} alt="remove button" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              paddingTop: "20px",
              minWidth: "350px",
              "@media (max-width: 1000px)": {
                minWidth: "80%",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                borderRadius: "10px",
                background: "linear-gradient(180deg, #FFE5E5 0%, #F5FFFE 100%)",
                padding: "20px 0",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                fontSize: "24px",
                "@media (max-width: 640px)": {
                  fontSize: "20px",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "inherit",
                  color: "#393280",
                  fontFamily: '"Manrope", "sans-serif"',
                  paddingLeft: "15px",
                }}
              >
                Cart Total Cost
              </Typography>
              <Divider
                sx={{
                  backgroundColor: "#BEBEBE",
                  margin: "10px 0 25px 0",
                }}
              />
              <Box
                sx={{
                  padding: "0 15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                    fontSize: "inherit",
                    color: "#393280",
                    fontFamily: '"Manrope", "sans-serif"',
                  }}
                >
                  Total
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                    fontSize: "inherit",
                    color: "#393280",
                    fontFamily: '"Manrope", "sans-serif"',
                  }}
                >
                  {totalCost} AED
                </Typography>
              </Box>
              <Divider
                sx={{
                  backgroundColor: "#BEBEBE", // Adjust the color as needed
                }}
              />
              <Box
                sx={{
                  padding: "0 15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "10px 0",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                    fontSize: "inherit",
                    color: "#393280",
                    fontFamily: '"Manrope", "sans-serif"',
                  }}
                >
                  Tax
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                    fontSize: "inherit",
                    color: "#393280",
                    fontFamily: '"Manrope", "sans-serif"',
                  }}
                >
                  5%
                </Typography>
              </Box>
              <Divider
                sx={{
                  backgroundColor: "#BEBEBE",
                }}
              />
              <Box
                sx={{
                  padding: "0 15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                    fontSize: "inherit",
                    color: "#393280",
                    fontFamily: '"Manrope", "sans-serif"',
                  }}
                >
                  Total
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                    fontSize: "inherit",
                    color: "#393280",
                    fontFamily: '"Manrope", "sans-serif"',
                  }}
                >
                  {totalCostWithTax} AED
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Elements stripe={stripePromise}>
          <ShippingForm />
        </Elements>
      </Box>
    </div>
  );
}

export default Cart;
