import { useForm } from "react-hook-form";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { masterUrls } from "../../../../constants/URL_END_POINTS";

import axios from "axios";
import { ShippingData } from "../../../../interfaces/MasterData";

function ShippingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingData>();

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [coordinates, setCoordinates] = useState([0, 0]);
  const [loading, setLoading] = useState(false);
  const cart_id = useSelector((state: RootState) => state.cart.cart_id);
  const items = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    // Get the user's coordinates using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinates([position.coords.latitude, position.coords.longitude]);
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const onSubmit = async (data: ShippingData) => {
    setLoading(true);
    // Check if cart is empty before proceeding
    if (!cart_id || !items || items.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed.");
      setLoading(false);
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    // Get the card information from the CardElement
    const cardElement = elements?.getElement(CardElement);

    if (!cardElement) {
      // Handle the case where the card element is not available
      console.error("CardElement not found");
      return;
    }

    // Create a Stripe token
    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    // Prepare order data
    const orderData = {
      token: token.id,
      delivery_address: {
        ...data,
        building: Number(data.building),
        appartment: Number(data.appartment),
        floor: Number(data.floor),
        location: {
          type: "Point",
          coordinates,
        },
      },
    };
    // Get the saved token from local storage
    const userToken = localStorage.getItem("token");

    try {
      // Make the POST request to create the order with authorization header
      await axios.post(masterUrls.createOrder(`${cart_id}`), orderData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      navigate("/home");
      toast.success("🎉 Your order has been placed successfully!");
    } catch (err) {
      const errorMessage =
        (err as Error).message || "An unknown error occurred";
      toast.error("Failed to create order: " + errorMessage);
    }
    setLoading(false);
  };

  // add responsive padding for the form inputs
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const getPadding = () => {
    if (isSmallScreen) {
      return "16px 0 16px 0";
    } else {
      return "0 0 16px 16px"; // Default padding
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: "65%",
        marginTop: "30px",
        background: "linear-gradient(81.34deg, #FFE5E5 6.61%, #F5FFFE 98.67%)",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        borderRadius: "5px",
        padding: "20px 55px 20px 35px",
      }}
    >
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "28px",
          color: "#000000",
          fontFamily: '"Manrope", "sans-serif"',
        }}
      >
        Shipping Data
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{
          margin: "20px 0",
        }}
      >
        <Grid style={{ padding: "0" }} item xs={12} sm={6}>
          <FormControl
            sx={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "100%",
            }}
          >
            <InputLabel
              sx={{
                "&.Mui-focused": {
                  color: "#ED553B", // Label color on focus
                },
              }}
            >
              Country
            </InputLabel>
            <Select
              label="Country"
              fullWidth
              {...register("country", {
                required: "Country is required",
              })}
              error={!!errors.country}
              defaultValue=""
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "5px",
                  border: "2px solid #D3D3D3",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ED553B", // Focus color when input is focused
                },
              }}
            >
              <MenuItem value="Egypt">Egypt</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="Australia">Australia</MenuItem>
            </Select>
            {errors.country && (
              <FormHelperText error>
                {typeof errors.country?.message === "string"
                  ? errors.country?.message
                  : ""}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid style={{ padding: getPadding() }} item xs={12} sm={6}>
          <TextField
            sx={{
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            required
            label="City"
            fullWidth
            {...register("city", {
              required: "City is required",
              pattern: {
                value: /^[A-Za-z\s]+$/, // Only letters and spaces allowed
                message: "City must contain only letters",
              },
            })}
            error={!!errors.city}
            helperText={
              typeof errors.city?.message === "string"
                ? errors.city?.message
                : ""
            }
            InputProps={{
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "5px",
                  border: "2px solid #D3D3D3",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ED553B",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "#ED553B", // Label color on focus
                },
              },
            }}
          />
        </Grid>
        <Grid style={{ padding: "0" }} item xs={12} sm={6}>
          <TextField
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
            required
            label="State"
            fullWidth
            {...register("state", {
              required: "State is required",
              pattern: {
                value: /^[A-Za-z\s]+$/, // Only letters and spaces allowed
                message: "State must contain only letters",
              },
            })}
            error={!!errors.state}
            helperText={
              typeof errors.state?.message === "string"
                ? errors.state?.message
                : ""
            }
            InputProps={{
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "5px",
                  border: "2px solid #D3D3D3",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ED553B", // Focus color when input is focused
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "#ED553B", // Label color on focus
                },
              },
            }}
          />
        </Grid>
        <Grid style={{ padding: getPadding() }} item xs={12} sm={6}>
          <TextField
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
            required
            label="Building"
            type="number"
            fullWidth
            {...register("building", {
              required: "Building number is required",
              min: {
                value: 1,
                message: "Building number must be a positive number",
              },
            })}
            error={!!errors.building}
            helperText={
              typeof errors.building?.message === "string"
                ? errors.building?.message
                : ""
            }
            InputProps={{
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "5px",
                  border: "2px solid #D3D3D3",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ED553B", // Focus color when input is focused
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "#ED553B", // Label color on focus
                },
              },
            }}
          />
        </Grid>
        <Grid style={{ padding: "0" }} item xs={12} sm={6}>
          <TextField
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
            required
            label="Street"
            fullWidth
            {...register("street", { required: "Street is required" })}
            error={!!errors.street}
            helperText={
              typeof errors.street?.message === "string"
                ? errors.street?.message
                : ""
            }
            InputProps={{
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "5px",
                  border: "2px solid #D3D3D3",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ED553B", // Focus color when input is focused
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "#ED553B", // Label color on focus
                },
              },
            }}
          />
        </Grid>

        <Grid style={{ padding: getPadding() }} item xs={12} sm={6}>
          <TextField
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
            required
            label="Floor"
            type="number"
            fullWidth
            {...register("floor", {
              required: "Floor is required",
              min: {
                value: 0,
                message: "Floor number cannot be negative",
              },
            })}
            error={!!errors.floor}
            helperText={
              typeof errors.floor?.message === "string"
                ? errors.floor?.message
                : ""
            }
          />
        </Grid>
        <Grid style={{ padding: "0" }} item xs={12} sm={6}>
          <TextField
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
            required
            label="Appartment"
            type="number"
            fullWidth
            {...register("appartment", {
              required: "Appartment number is required",
              min: {
                value: 1,
                message: "Appartment number must be a positive number",
              },
            })}
            error={!!errors.appartment}
            helperText={
              typeof errors.appartment?.message === "string"
                ? errors.appartment?.message
                : ""
            }
            InputProps={{
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "5px",
                  border: "2px solid #D3D3D3",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ED553B", // Focus color when input is focused
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "#ED553B", // Label color on focus
                },
              },
            }}
          />
        </Grid>
        <Grid style={{ padding: getPadding() }} item xs={12} sm={6}>
          <TextField
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
            required
            label="Mobile"
            fullWidth
            {...register("mobile", {
              required: "Mobile is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Mobile number must be numeric",
              },
            })}
            error={!!errors.mobile}
            helperText={
              typeof errors.mobile?.message === "string"
                ? errors.mobile?.message
                : ""
            }
            InputProps={{
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "5px",
                  border: "2px solid #D3D3D3",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ED553B", // Focus color when input is focused
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "#ED553B", // Label color on focus
                },
              },
            }}
          />
        </Grid>
        <Grid style={{ padding: "0" }} item xs={12}>
          <TextField
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
            required
            label="Additional Info"
            fullWidth
            {...register("additional_info")}
            InputProps={{
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "5px",
                  border: "2px solid #D3D3D3",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ED553B",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "#ED553B", // Label color on focus
                },
              },
            }}
          />
        </Grid>
      </Grid>
      <CardElement />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          mt: 4,
          backgroundColor: "#ED553B",
          "&:hover": {
            backgroundColor: "#D9432A", // Change the background color on hover
          },
        }}
        disabled={!stripe || loading}
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <>
            Proceed <ArrowForwardIcon sx={{ ml: 1 }} />
          </>
        )}
      </Button>
    </form>
  );
}

export default ShippingForm;
