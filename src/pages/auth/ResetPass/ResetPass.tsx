import axios from "axios";
import { toast } from "react-toastify";
import logoImg from "../../../assets/images/Logo.png";
import { ResetPassData } from "../../../interfaces/AuthData";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authUrls } from "../../../constants/URL_END_POINTS";
import {
  emailValidation,
  passwordValidation,
} from "../../../constants/VALIDATIONS";
import { TextField, Box, FormControl, Button } from "@mui/material";

function ResetPass() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPassData>({
    defaultValues: {
      otp: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: ResetPassData) => {
    try {
      await axios.post(`${authUrls.resetPass}`, data);
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          toast.error("Invalid OTP");
        } else if (error.response.status === 404) {
          toast.error("Account doesn't exist");
        }
      }
    }
  };

  return (
    <div className="resetpass-page flex-grow pt-12 font-manrope">
      <div className="logo flex items-center justify-center">
        <img className="object-cover" src={logoImg} alt="logo" />
      </div>
      <div className="form-wrapper flex flex-col w-[80%] md:w[70%] lg:w-[65%] mx-auto mt-5 pb-4">
        <div className="header flex flex-col gap-2">
          <h3 className="sub-header text-gray-500 font-semibold text-xl">
            Welcome back!
          </h3>
          <h2 className="text-2xl text-[#090937] font-bold">
            Reset Your Password Now !
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
            <label htmlFor="otp" className="text-[#090937] font-semibold mb-2">
              OTP
            </label>
            <Controller
              name="otp"
              control={control}
              rules={{
                required: "OTP is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "OTP must contain 6 digits only",
                },
              }}
              render={({ field }) => (
                <TextField
                  id="otp"
                  type="text"
                  placeholder="1233"
                  {...field}
                  error={!!errors.email}
                  helperText={errors.otp ? errors.otp.message : " "}
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
              rules={passwordValidation}
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
                      minHeight: "0.5rem",
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
              Send
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
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default ResetPass;
