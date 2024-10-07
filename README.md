# E-Commerce Book Store

This is a fully-featured e-commerce web application designed for browsing and purchasing books. The application provides seamless navigation, cart management, and payment functionality. It is built with modern technologies such as React, Tailwind CSS, Material UI, Redux, Stripe, JWT-based authentication, and more, ensuring a smooth and secure user experience.

## Table of Contents
1. [Live Site](#live-site)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [API](#api)
5. [Usage](#usage)

## Live Site
Check out the live site here: [E-Commerce Book Store](https://online-book-store-teal.vercel.app)

## Technologies Used
- **React.js**: Component-based UI library
- **Redux**: State management for user authentication and cart
- **React Router**: Client-side routing for navigating across the app
- **React Toastify**: Notification library for toasts
- **Tailwind CSS**: Utility-first CSS framework for styling and responsiveness
- **Material UI (MUI)**: React components for styling and layout
- **React Hook Form**: Form handling and validation
- **Swiper.js**: Sliders and carousels
- **React Icons**: Icon library for UI elements
- **Stripe**: Payment gateway integration
- **JWT**: JSON Web Token for secure authentication
- **Axios**: HTTP client for API requests
- **TypeScript**: Strongly typed JavaScript for improved code quality

## Features

1. **Full API Integration**
   - Integrated a complete Postman collection API for handling book data, user authentication, cart operations, and orders.
   
2. **Authentication Pages**
   - Built an **Auth Layout** for pages like:
     - Login
     - Register
     - Forgot Password
     - Reset Password
   - Used JWT tokens for authentication, securely managed in Redux.
   - **High-Order Component (HOC)** to protect routes from unauthorized access.

3. **Master Layout**
   - Structured **Master Layout** for key pages:
     - Home Page
     - Products Page
     - Cart Page

4. **React Router for Navigation**
   - Implemented **React Router** to manage page transitions and protect routes.
   - Ensured that users cannot access certain pages without being authenticated.

5. **Swiper.js for Sliders**
   - Used **Swiper.js** for responsive sliders on the Home Page.

6. **Books Pagination with Material UI**
   - Integrated **Material UI** for paginating books, allowing users to browse multiple pages of book listings.

7. **Form Handling with React Hook Form**
   - Integrated **React Hook Form** for managing form validation and submission across multiple pages, including:
     - Login
     - Registration
     - Payment
     - Shipping
   - Provided user-friendly validation messages.

8. **State Management with Redux**
   - Managed cart functionality and user data with **Redux**.
   - Implemented features like adding/removing books to/from the cart, calculating total price, and managing JWT tokens in state.

9. **Cart Functionality**
   - Built a **Cart Page** that displays books added to the cart, showing their prices, quantities, and total cost.
   - Updated cart data in Redux and synced with the API.

10. **Payment Integration with Stripe**
    - Integrated **Stripe** to handle secure credit card payments.
    - Note: Payment integration is for testing purposes only; no real orders are processed. Use the provided dummy credit card details to simulate purchases:
      - Card number: `4242 4242 4242 4242`
      - Expiry date: Any future date
      - CVC: Any 3-digit number

11. **Responsive Design**
    - Ensured the application is fully responsive for all screen sizes using **Tailwind CSS** and **Material UI**.

12. **Icons with React Icons**
    - Used **React Icons** for consistent, visually appealing icons throughout the application.

13. **Notifications with React Toastify**
    - Implemented user-friendly notifications for errors and success messages using **React Toastify**. This includes messages like:
      - Successful order creation
      - Cart validation errors
      - Payment errors

## API
The app is fully integrated with a Postman collection API for managing:
- User authentication (login, registration)
- Retrieving book listings
- Managing cart operations
- Creating orders (with Stripe for payment processing)

All API requests are handled using **Axios** for asynchronous calls, with error handling and loading states included in all data-fetching components.

## Usage

1. **Authentication**
   - Register for a new account or log in with existing credentials.
   - Navigate through different pages such as the Home Page, Products Page, and Cart.

2. **Cart & Checkout**
   - Add books to your cart from the Products Page.
   - Review your cart contents and update quantities before proceeding to checkout.
   - On the checkout page, fill out the shipping information and proceed with the payment using a dummy credit card.

3. **Payment**
   - The application uses **Stripe** for payment integration, but no real orders are processed. Use a dummy credit card to test the payment workflow.
   
