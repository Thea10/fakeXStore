import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectCartTotal } from "./CartSlice";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core";
import { ChevronRightOutlined, Clear } from "@material-ui/icons";
import CartItem from "./CartItem";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    padding: "1rem",
    maxWidth: "90%",
  },
  button: {
    borderRadius: "0 0 10px 10px",
    margin: "1rem",
  },
}));

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);


const CartList = ({ items, count }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartTotal = useSelector(selectCartTotal);
  const [showPay, setshowPay] = useState(false);
  const [payLoading, setpayLoading] = useState(false)
  const [feedback, setFeedback] = useState("");
  const handleSubmit = async (price, qty) => {

     const stripe = await stripePromise;

     const response = await axios.post('https://desolate-fortress-63690.herokuapp.com/create-checkout-session/', {
      price: price, quantity: qty
    }) ;

    setpayLoading(true)
 
     const session = await response.json();
     setpayLoading(false)

     const result = await stripe.redirectToCheckout({
       sessionId: session.id,
     });
 
     if (result.error) {
      setFeedback(result.paymentIntent.status);
       return;
     }
     dispatch(clearCart())

  };

  return (
    <div>
      {items.map((product) => (
        <CartItem key={product.id} item={product} />
      ))}

      <Typography variant="h6"> NGN {cartTotal} </Typography>

      <Button
        size="small"
        variant="outlined"
        color="primary"
        onClick={() => setshowPay(true)}
        className={classes.button}
        title="Checkout"
      >
        Checkout
        <ChevronRightOutlined />
      </Button>

      <Button
        size="small"
        variant="outlined"
        color="secondary"
        className={classes.button}
        onClick={() => dispatch(clearCart())}
        title="Clear cart"
      >
        Clear
        <Clear />
      </Button>
      <Dialog
        onClose={() => setshowPay(false)}
        open={showPay}
        fullWidth
        maxWidth="xs"
      >
        <DialogContent style={{ height: "50vh" }}>
          <DialogContentText>Pay: NGN {cartTotal}</DialogContentText>

          {
            !payLoading ? 
            <Button
            size="small"
            variant="contained"
            color="primary"
            className={classes.button}
            title="pay"
            onClick={()=>handleSubmit(cartTotal, count)}
          >
            Confirm order
          </Button>
          :
          <DialogContentText>Connecting</DialogContentText>

          }

         
       
          <DialogContentText>{feedback}</DialogContentText>

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartList;

// <CardElement options={CARD_ELEMENT_OPTIONS} />

