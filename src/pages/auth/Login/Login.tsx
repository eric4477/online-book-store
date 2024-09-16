import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import logoImg from "../../../assets/images/Logo.png";
import { LoginData } from "../../../interfaces/AuthData";
import { useForm, Controller } from "react-hook-form";
import { authUrls } from "../../../constants/URL_END_POINTS";
import { emailValidation } from "../../../constants/VALIDATIONS";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, clearToken } from "../../../redux/authSlice";
import {
  TextField,
  Box,
  FormControl,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await axios.post(`${authUrls.login}`, data);
      navigate("/home");
      localStorage.setItem("token", response.data.data.accessToken);
      dispatch(setToken(localStorage.getItem("token")));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          toast.error("Incorrect email or password");
        } else if (error.response.status === 404) {
          toast.error("Account doesn't exist");
        }
      }
    }
  };

  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    dispatch(clearToken());
  }, [dispatch]);

  return (
    <div className="login-page flex-grow pt-12 font-manrope">
      <div className="logo flex items-center justify-center">
        <img className="object-cover" src={logoImg} alt="logo" />
      </div>
      <div className="form-wrapper flex flex-col w-[80%] md:w[70%] lg:w-[65%] mx-auto mt-5 pb-4">
        <div className="header flex flex-col gap-2">
          <h3 className="sub-header text-gray-500 font-semibold text-xl">
            Welcome back!
          </h3>
          <h2 className="text-2xl text-[#090937] font-bold">
            Login to your account
          </h2>
        </div>
        <Box
          component="form"
          className="flex flex-col mt-4"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "inline-block",
          }}
        >
          <FormControl margin="dense" fullWidth>
            <label
              htmlFor="email"
              className="text-[#090937] font-semibold mb-2"
            >
              E-mail
            </label>
            <Controller
              name="email"
              control={control}
              rules={emailValidation}
              render={({ field }) => (
                <TextField
                  id="email"
                  type="email"
                  placeholder="john@mail.com"
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : " "}
                  inputProps={{
                    "aria-required": "true",
                  }}
                  fullWidth
                  sx={{
                    "& .MuiFormHelperText-root": {
                      height: "0.5rem",
                      color: errors.email ? "red" : "initial",
                      margin: "2px 0",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#090937",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#6251DD",
                      },
                    },
                    "& .MuiInputBase-input": {
                      backgroundColor: "#F4F4FF",
                      borderRadius: "0.2rem",
                      color: "#090937",
                      fontSize: "16px",
                      fontFamily: `"Manrope", "sans-serif"`,
                    },
                  }}
                />
              )}
            />
          </FormControl>
          <FormControl margin="dense" fullWidth>
            <label
              htmlFor="password"
              className="text-[#090937] font-semibold mb-2"
            >
              Password
            </label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{3,}$/,
                  message: "Invalid password",
                },
              }}
              render={({ field }) => (
                <TextField
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : " "}
                  inputProps={{
                    "aria-required": "true",
                  }}
                  fullWidth
                  sx={{
                    "& .MuiFormHelperText-root": {
                      height: "0.5rem",
                      color: errors.password ? "red" : "initial",
                      margin: "3px 0",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#090937",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#6251DD",
                      },
                    },
                    "& .MuiInputBase-input": {
                      backgroundColor: "#F4F4FF",
                      borderRadius: "0.2rem",
                      fontSize: "16px",
                      "&::placeholder": {
                        color: "#090937",

                        fontFamily: `"Manrope", "sans-serif"`,
                      },
                    },
                  }}
                />
              )}
            />
          </FormControl>
          <Button
            disableRipple
            sx={{
              textTransform: "none",
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "#6251DD",
              fontFamily: '"Manrope", "sans-serif"',
              margin: "0",
              padding: "0",
              display: "block",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </Button>

          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                sx={{
                  color: "#6251DD",
                  "&.Mui-checked": {
                    color: "#6251DD",
                  },
                }}
              />
            }
            label="Remember Me"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontWeight: 700,
                color: "#6251DD",
                fontFamily: `"Manrope", "sans-serif"`,
              },
            }}
          />
          <div className="form-btns flex flex-col mt-7">
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#EF6B4A",
                color: "white",
                fontSize: "18px",
                fontWeight: "500",
                padding: "12px 10px",
                borderRadius: "5px",
                boxShadow: "none",
                fontFamily: `"Manrope", "sans-serif"`,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#e55b43",
                },
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "transparent",
                color: "#6251DD",
                fontSize: "18px",
                fontWeight: "500",
                padding: "12px 10px",
                border: "1px solid #6251DD",
                borderRadius: "5px",
                boxShadow: "none",
                fontFamily: `"Manrope", "sans-serif"`,
                textTransform: "none",
                marginTop: "10px",
                "&:hover": {
                  color: "white",
                  backgroundColor: "#6251DD",
                },
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Login;
