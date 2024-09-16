import { useState, useEffect } from "react";
import BookCard from "../../../../shared/BookCard";
import arrowDown from "../../../../assets/images/arrow-down.svg";
import customIcon from "../../../../assets/images/customIcon2.svg";
import FilterSideMenu from "./FilterSideMenu";
import { SidebarProps } from "../../../../interfaces/MasterData";

import {
  Pagination,
  Grid,
  CircularProgress,
  Typography,
  Button,
  MenuItem,
  Menu,
} from "@mui/material";
import axios from "axios";
import { masterUrls } from "../../../../constants/URL_END_POINTS";
import { Book } from "../../../../interfaces/MasterData";

function BooksPagination({ open, setOpen }: SidebarProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(6);
  const [totalBooks, setTotalBooks] = useState(0);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          masterUrls.getBooks(page, booksPerPage)
        );
        setBooks(response.data.data);
        setTotalBooks(response.data.total);
      } catch (error) {
        console.error("Failed to fetch books", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [page, booksPerPage]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (
    _event: React.MouseEvent<HTMLElement>,
    value: number
  ) => {
    if (value) {
      setBooksPerPage(value);
      // Reset to the first page after changing items per page
      setPage(1);
    }
    setAnchorEl(null);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const startIndex = (page - 1) * booksPerPage + 1;
  const endIndex = Math.min(page * booksPerPage, totalBooks);

  return (
    <div className="grow">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="flex flex-row items-center justify-between mb-10 pr-2 lg:pr-12 flex-wrap gap-5">
            <Button
              sx={{
                color: "#393280",
                fontWeight: "bold",
                fontSize: "16px",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "0",
              }}
            >
              Sort by : Alphabetically, A-Z
              <img src={arrowDown} alt="arrow down" />
            </Button>

            <Typography
              variant="subtitle1"
              align="center"
              gutterBottom
              sx={{
                color: "#393280",
                fontWeight: "bold",
                fontSize: "16px",
                margin: "0",
              }}
            >
              {`Showing ${startIndex} - ${endIndex} of ${totalBooks} results`}
            </Typography>
            <Button
              onClick={handleMenuOpen}
              sx={{
                color: "#393280",
                fontWeight: "bold",
                fontSize: "16px",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "0",
              }}
            >
              {`Show : ${booksPerPage}`}
              <img src={arrowDown} alt="arrow down" />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              disableScrollLock={true}
            >
              {[6, 12, 24].map((value) => (
                <MenuItem
                  key={value}
                  onClick={(event) => handleMenuClose(event, value)}
                >
                  {value}
                </MenuItem>
              ))}
            </Menu>
            <div className="flex flex-row items-center gap-8">
              <span>
                <img src={customIcon} alt="custom icon" />
              </span>
              <FilterSideMenu open={open} setOpen={setOpen} />
            </div>
          </div>

          <Grid paddingBottom="30px" container spacing={4}>
            {books.map((book) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={book._id}
                sx={{
                  "@media (max-width:600px)": {
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  },
                }}
              >
                <BookCard book={book} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={Math.ceil(totalBooks / booksPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              "& .MuiPaginationItem-root": {
                color: "#888888",
              },
              "& .MuiPaginationItem-root:hover": {
                backgroundColor: "#ED553B",
                color: "white",
              },

              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#ED553B",
                color: "#fff",
              },
              "& .MuiPaginationItem-root.Mui-selected:hover": {
                backgroundColor: "#ED553B",
                color: "white",
              },
            }}
          />
        </>
      )}
    </div>
  );
}

export default BooksPagination;
