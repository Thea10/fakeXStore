import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, selectCart } from "../features/cart/CartSlice";
import {
  AppBar,
  Badge,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ShoppingCartOutlined, ShopTwoOutlined } from "@material-ui/icons";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#010a39",
    "& h6": {
      fontWeight: 400,
      marginLeft: "0.9rem",
    },
  },
  toolbar: {
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    color: "#EBECFF",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  selected: {
    color: "#ebecffa1",
  },
}));
const Nav = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartStatus = useSelector((state) => state.cart.status);
  const cartItems = useSelector(selectCart);

  useEffect(() => {
    if (cartStatus === "none") {
      dispatch(fetchItems());
    }
  }, [cartStatus, dispatch]);

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4">fakeXStore</Typography>
        <NavLink
          to="/products"
          className={classes.link}
          activeClassName={classes.selected}
        >
          <IconButton edge="start" color="inherit">
            <ShopTwoOutlined />
            <Typography variant="h6">Products</Typography>
          </IconButton>
        </NavLink>

        <NavLink
          to="/cart"
          className={classes.link}
          activeClassName={classes.selected}
        >
          <IconButton color="inherit">
            <Badge color="default" badgeContent={cartItems.length}>
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
