import bookImg1 from "../assets/images/book-img-1.jpg";
import bookImg2 from "../assets/images/book-img-2.jpg";
import bookImg3 from "../assets/images/book-img-3.jpg";
import bookImg4 from "../assets/images/book-img-4.jpg";
import bookImg5 from "../assets/images/book-img-5.jpg";
import bookImg6 from "../assets/images/book-img-6.jpg";

export const getRandomBookImg = () => {
  const arr = [bookImg1, bookImg2, bookImg3, bookImg4, bookImg5, bookImg6]; // Adjust the array if needed
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const getRandomBookName = () => {
  const arr = [
    "Simple way of piece life",
    "Great travel at desert",
    "The lady beauty Scarlett",
    "Once upon a time",
  ];
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const getRandomBookAuthor = () => {
  const arr = ["Armor Ramsey", "Sanchit Howdy", "Arthur Doyle", "Klien Marry"];
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};
