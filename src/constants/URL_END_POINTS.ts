const baseUrl = "https://upskilling-egypt.com:3007/api";

const baseAuth = `${baseUrl}/auth`;

export const authUrls = {
  login: `${baseAuth}/login`,
  register: `${baseAuth}/register`,
  resetPass: `${baseAuth}/reset-password`,
  forgotPass: `${baseAuth}/forgot-password`,
  changePass: `${baseAuth}/change-password`,
  logout: `${baseAuth}/logout`,
};
