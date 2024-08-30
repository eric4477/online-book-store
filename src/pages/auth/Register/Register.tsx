import logoImg from "../../../assets/images/Logo.png";
import { RegisterData } from "../../../interfaces/AuthData";
import { useForm, Controller } from "react-hook-form";
import { authUrls } from "../../../constants/URL_END_POINTS";
import { useNavigate } from "react-router-dom";
import { TextField, Box, FormControl, Button, MenuItem } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import {
  emailValidation,
  passwordValidation,
} from "../../../constants/VALIDATIONS";

function Register() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      role: "Admin",
    },
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      await axios.post(`${authUrls.register}`, data);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error("This email already exists");
        }
      }
    }
  };

  return (
    <div className="register-page flex-grow pt-12 font-manrope">
      <div className="logo flex items-center justify-center">
        <img className="object-cover" src={logoImg} alt="logo" />
      </div>
      <div className="form-wrapper flex flex-col w-[80%] md:w[70%] lg:w-[65%] mx-auto mt-8 pb-4">
        <div className="header flex flex-col gap-2">
          <h3 className="sub-header text-gray-500 font-semibold text-xl">
            Create new acccount
          </h3>
          <h2 className="text-2xl text-[#090937] font-bold">Register</h2>
        </div>
        <Box
          component="form"
          className="flex flex-col mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-row items-center gap-5 max-[350px]:gap-0 max-[350px]:flex-col">
            <FormControl margin="dense" fullWidth>
              <label
                htmlFor="firstName"
                className="text-[#090937] font-semibold mb-2"
              >
                First Name
              </label>
              <Controller
                name="first_name"
                control={control}
                rules={{
                  required: "First Name is required",
                }}
                render={({ field }) => (
                  <TextField
                    id="first_name"
                    type="text"
                    placeholder="John"
                    {...field}
                    error={!!errors.first_name}
                    helperText={
                      errors.first_name ? errors.first_name.message : " "
                    }
                    inputProps={{
                      "aria-required": "true",
                    }}
                    fullWidth
                    sx={{
                      "& .MuiFormHelperText-root": {
                        minHeight: "0.5rem",
                        color: errors.first_name ? "red" : "initial",
                        lineHeight: "15px",
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
                htmlFor="firstName"
                className="text-[#090937] font-semibold mb-2"
              >
                Last Name
              </label>
              <Controller
                name="last_name"
                control={control}
                rules={{
                  required: "Last Name is required",
                }}
                render={({ field }) => (
                  <TextField
                    id="last_name"
                    type="text"
                    placeholder="Doe"
                    {...field}
                    error={!!errors.last_name}
                    helperText={
                      errors.last_name ? errors.last_name.message : " "
                    }
                    inputProps={{
                      "aria-required": "true",
                    }}
                    fullWidth
                    sx={{
                      "& .MuiFormHelperText-root": {
                        minHeight: "0.5rem",
                        color: errors.last_name ? "red" : "initial",
                        lineHeight: "15px",
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
                        color: "#090937",
                        fontSize: "16px",
                        fontFamily: `"Manrope", "sans-serif"`,
                      },
                    }}
                  />
                )}
              />
            </FormControl>
          </div>
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
                      minHeight: "0.5rem",
                      color: errors.email ? "red" : "initial",
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
                      lineHeight: "15px",
                      color: errors.password ? "red" : "initial",

                      margin: "3px 0 10px 0",
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
          <FormControl margin="dense" fullWidth>
            <label htmlFor="role" className="text-[#090937] font-semibold mb-2">
              Role
            </label>
            <Controller
              name="role"
              control={control}
              defaultValue="Admin"
              rules={{
                required: "Role is required",
              }}
              render={({ field }) => (
                <TextField
                  id="role"
                  select
                  {...field}
                  error={!!errors.role}
                  helperText={errors.role ? errors.role.message : " "}
                  inputProps={{
                    "aria-required": "true",
                  }}
                  fullWidth
                  SelectProps={{
                    MenuProps: {
                      disableScrollLock: true,
                    },
                  }}
                  sx={{
                    "& .MuiFormHelperText-root": {
                      minHeight: "0.5rem",
                      color: errors.role ? "red" : "initial",
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
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                </TextField>
              )}
            />
          </FormControl>
          <div className="form-btns flex flex-col mt-5">
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
              Register
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

export default Register;
