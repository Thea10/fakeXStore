import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { incrementItemCount } from "../cart/CartSlice";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography, CircularProgress } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0 8.5px 10px #d4dbe3",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    gridRowEnd: "span 3",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minWidth: "250px",
  },
  details: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    background: "#FCFDFF",
    color: "#010a39",
    borderRadius: "0 0 5px 5px",
    padding: "0.5rem",
    wordBreak: "break-word",
    height: "25%",
    justifyContent: "space-between",


    "& > *": {
      display: "inherit",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "0 0.5rem",
      flexWrap: "wrap",
    },
  },
}));

const ProductItem = ({ product }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [addLoading, setaddLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

 function addtoCart(item){
    setaddLoading(true);
    setTimeout(() => {
      dispatch(incrementItemCount(item));
      setaddLoading(false);
      setFeedback('Item added to cart')
    }, 2000);
    setTimeout(() => {
        setFeedback('')

    }, 4000);
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgb(0 0 0 / 48%) 0%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.95) 100%), url(${product.image})`,
      }}
      className={classes.root}
    >
      <div className={classes.details}>
        <Typography variant="caption"> {product.title} </Typography>

        <div>
          <Typography variant="caption"> Price: NGN {product.price} </Typography>

          {addLoading === true ? 
            <CircularProgress size={20} thickness={4} value={100} />
           : 
            <IconButton
              color="inherit"
              edge="end"
              title="Add to cart"
              onClick={() => addtoCart(product)}
            >
              <AddCircle />
            </IconButton>
          }
          <Typography variant="caption"> {feedback} </Typography>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
