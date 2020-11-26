import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, selectCart } from "./features/cart/CartSlice";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import "./App.css";
import {
  AppBar,
  Badge,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ShoppingCartOutlined, ShopTwoOutlined } from "@material-ui/icons";
import ProductList from "./features/products/ProductList";
import Cart from "./features/cart/Cart";
import SuccessPayment from "./features/cart/SuccessPayment";

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

function App() {
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
    <Router>
      <div>
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
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/products" component={ProductList} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/payment-successfull" component={SuccessPayment} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
