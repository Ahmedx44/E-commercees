import React from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -7,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "black", // Change the background color to black
  },
}));

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <Link
      to="cart"
      className="hover:text-gray-500 transition duration-300 delay-100"
    >
      <IconButton aria-label="cart" style={{ fontSize: 100 }}>
        <StyledBadge badgeContent={cartItems.length} color="primary">
          <ShoppingCartIcon fontSize="large" />
        </StyledBadge>
      </IconButton>
    </Link>
  );
};

export default CartIcon;
