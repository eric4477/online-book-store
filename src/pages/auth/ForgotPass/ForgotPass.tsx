import { Box, Button, FormControl, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../assets/images/Logo.png";
import { ForgotPassData } from "../../../interfaces/AuthData";
import axios from "axios";
import { authUrls } from "../../../constants/URL_END_POINTS";
import { emailValidation } from "../../../constants/VALIDATIONS";
import { toast } from "react-toastify";

function ForgotPass() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassData>({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (data: ForgotPassData) => {
    try {
      await axios.post(`${authUrls.forgotPass}`, data);
      toast.success("Successfully sent!");
      navigate("/reset-password");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 404) {
          toast.error("Account doesn't exist");
        }
      }
    }
  };
  return (
    <div className="forgotpass-page flex-grow pt-12 font-manrope">
      <div className="logo flex items-center justify-center">
        <img className="object-cover" src={logoImg} alt="logo" />
      </div>
      <div className="form-wrapper flex flex-col w-[80%] md:w[70%] lg:w-[65%] mx-auto mt-5 pb-4">
        <div className="header flex flex-col gap-2 mb-6">
          <h3 className="sub-header text-gray-500 font-semibold text-xl">
            Welcome back!
          </h3>
          <h2 className="text-2xl text-[#090937] font-bold">
            Forgot Password !!
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
          <div className="form-btns flex flex-col mt-10">
            <Button
              type="submit"
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
              Send
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default ForgotPass;
