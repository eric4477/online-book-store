import logoImg from "../../../assets/images/Logo.png";
import { LoginFormInputs } from "../../../interfaces/LoginFormInputs";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Box,
  FormControl,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
  };

  return (
    <div className="login-page flex-grow pt-12">
      <div className="login-logo flex items-center justify-center">
        <img className="object-cover" src={logoImg} alt="logo" />
      </div>
      <div className="login-container flex flex-col w-[80%] md:w-[65%] mx-auto mt-4 pb-4">
        <div className="login-header flex flex-col gap-2">
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
        >
          <FormControl margin="normal" fullWidth>
            <label
              htmlFor="email"
              className="text-[#090937] font-semibold mb-2"
            >
              E-mail
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              }}
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
          <FormControl margin="normal" fullWidth>
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
          <FormControlLabel
            control={
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    sx={{
                      color: "#6251DD",
                      "&.Mui-checked": {
                        color: "#6251DD",
                      },
                    }}
                  />
                )}
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
          <div className="form-btns flex flex-col mt-8">
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
