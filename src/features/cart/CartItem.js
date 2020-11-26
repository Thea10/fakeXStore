import React from "react";
import { useDispatch } from "react-redux";
import {
  decrementItemCount,
  incrementItemCount,
  removeItem,
} from "../cart/CartSlice";
import { makeStyles } from "@material-ui/core/styles";
import {
  AddCircle,
  Close,
  RemoveCircle,
} from "@material-ui/icons";
import { IconButton, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent:"space-between",
    width: "100%",
    color: "#010a39",
    margin: "1rem"
  },
  details: {
    background: "#ffffff",
    padding: "0.5rem",
    wordBreak: "break-word",
    width: "90%",
    boxShadow: "0 2px 5px #d4dbe3",

    "& > *": {
      marginBottom: "1rem",
    },
  },
  img: {
    height: "200px"
  },
  caption: {
    display: "block",
    lineHeight: "28.8px"
  },
  description: {
    color: "#5d637b",
  },
}));

const CartItem = ({ item }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  return (
    <div className={classes.root}>
      <div className={classes.details}>
        <img className={classes.img} src={item.image} alt="item" />

        <div>
          <Typography className={classes.caption} variant="caption">
            {item.title}
          </Typography>
          <Typography variant="caption" className={classes.description}>
            {item.description}
          </Typography>
        </div>
        <div>
          <IconButton
            title="Remove one"
            color="inherit"
            onClick={() => dispatch(decrementItemCount(item))}
          >
            <RemoveCircle />
          </IconButton>
          <Typography variant="caption">{item.count}</Typography>

          <IconButton
            title="Add one"
            color="inherit"
            onClick={() => dispatch(incrementItemCount(item))}
          >
            <AddCircle />
          </IconButton>

          <Typography variant="caption">NGN {(item.count * item.price).toFixed(2)}</Typography>
        </div>
      </div>

      <IconButton
        title="Remove Item"
        color="inherit"
        onClick={() => dispatch(removeItem(item))}
      >
        <Close />
      </IconButton>
    </div>
  );
};

export default CartItem;
