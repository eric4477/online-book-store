export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  role: string;
}

export interface ForgotPassData {
  email: string;
}

export interface ResetPassData {
  otp: string;
  email: string;
  password: string;
}
