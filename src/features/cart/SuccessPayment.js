import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
import { Check } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2rem auto",
    padding: "1rem",
    width: "70%",
    height: "50vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
}));

const SuccessPayment = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5">Payment Successfull</Typography>
        <Check />
      </CardContent>
    </Card>
  );
};

export default SuccessPayment;
