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

export const masterUrls = {
  getBooks: (page = 1, limit: number) => {
    return `${baseUrl}/book?page=${page}&limit=${limit}`;
  },

  addBook: `${baseUrl}/basket/item`,
  deleteBook: `${baseUrl}/basket/item`,
  updateBook: (id: string) => {
    return `${baseUrl}/basket/${id}`;
  },
  getBasket: `${baseUrl}/basket`,
};
