/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export function Modal(props) {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("xl");

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };
  const sim = props.item.similar;

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={props.open}
        onClose={props.handleClose}
      >
        <DialogTitle>Similar Products</DialogTitle>
        <DialogContent>
          <DialogContentText>People also bought.</DialogContentText>
          {console.log("props: ", props.item)}
          {console.log("similar: ", props.item.similar)}
          {props.item &&
            props.item.similar &&
            props.item.similar.map((item) => (
              <div className="Cart-Items">
                {console.log("item: ", item)}
                <div className="image-box">
                  <img src={item.src} style={{ height: "120px" }} />
                </div>
                <div className="about">
                  <h1 className="title">{item._id}</h1>
                  <h3 className="subtitle">{item.type}</h3>
                </div>
                <div className="counter">
                  <button className="btn"> - </button>
                  <div className="count">{item.count}</div>
                  <button className="btn"> + </button>
                </div>
                <div className="prices">
                  <div className="amount">
                    ${item.price * item.count}
                  </div>
                  <div className="save">
                    <u>Move to Cart</u>
                  </div>
                  <div className="remove">
                    <Button className="count" >
                      <u>Remove</u>
                    </Button>
                  </div>
                </div>
                <br />
              </div>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
