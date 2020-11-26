import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, selectCart } from "./CartSlice";
import { makeStyles } from "@material-ui/core/styles";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import CartList from "./CartList";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    padding: "1rem",
    maxWidth: "90%",
    textAlign: "center"
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const Cart = () => {
  let CartlistContent;
  const classes = useStyles();

  const dispatch = useDispatch();
  const cartStatus = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);
  const cartItems = useSelector(selectCart);

  useEffect(() => {
    if (cartStatus === "none") {
      dispatch(fetchItems());
    }
  }, [cartStatus, dispatch]);

  if (cartStatus === "loading") {
    CartlistContent = (
      <Backdrop open>
        <CircularProgress size={100} thickness={5} value={100} />
      </Backdrop>
    );
  } else if (cartStatus === "succeeded") {
    CartlistContent = (
      <div className={classes.root}>
        {cartItems.length > 0 ? 
            <CartList items={cartItems} count={cartItems.length} />
         : 
          <NavLink to="/products">Your cart is empty, shop here</NavLink>
        }
      </div>
    );
  } else if (cartStatus === "failed") {
    CartlistContent = (
      <Dialog open fullWidth maxWidth="xs">
        <DialogContent>
          <DialogContentText>{error}</DialogContentText>
        </DialogContent>

        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => dispatch(fetchItems())}
          className={classes.margin}
        >
          Retry
        </Button>
      </Dialog>
    );
  }
  return <div>{CartlistContent}</div>;
};

export default Cart;
