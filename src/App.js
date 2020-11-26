import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./features/Nav";
import ProductList from "./features/products/ProductList";
import Cart from "./features/cart/Cart";
import SuccessPayment from "./features/cart/SuccessPayment";

function App() {
  return (
    <Router>
      <div>
        <Nav />
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
