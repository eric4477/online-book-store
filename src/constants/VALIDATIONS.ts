export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Invalid email address",
  },
};

export const passwordValidation = {
  required: "Password is required",
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{3,}$/,
    message: `Sorry, the password must contain at least 3 characters, one uppercase letter,
     one lowercase letter, one number, one special character`,
  },
};
