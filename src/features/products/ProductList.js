import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllProducts, fetchProducts } from "./ProductsSlice";
import { makeStyles } from "@material-ui/core/styles";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import ProductItem from "./ProductItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "grid",
   gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gridAutoRows: "100px",
    gridGap: '50px',
    margin: "auto",
    padding: '1rem',
    maxWidth: '70%'
  },
  control: {
    padding: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const ProductList = () => {
  let productListContent;
  const classes = useStyles();
  const dispatch = useDispatch();
  const storeStatus = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);
  const products = useSelector(selectAllProducts);

  useEffect(() => {
    if (storeStatus === "empty") {
      dispatch(fetchProducts());
    }
  }, [storeStatus, dispatch]);

  if (storeStatus === "loading") {
    productListContent = (
      <Backdrop open>
      <CircularProgress title="loading products" style={{color: "white"}} size={100} thickness={4} value={50} />
    </Backdrop>
    );
  } else if (storeStatus === "succeeded") {
    productListContent = (
      <div className={classes.root}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    );
  } else if (storeStatus === "failed") {
    productListContent = (
      <Dialog open fullWidth maxWidth="xs">
        <DialogContent>
          <DialogContentText>{error}</DialogContentText>
        </DialogContent>

        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => dispatch(fetchProducts())}
          className={classes.margin}
        >
          Retry
        </Button>
      </Dialog>
    );
  }
  return <div>{productListContent}</div>;
};

export default ProductList;
