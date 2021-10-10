/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable default-case */
import React, { Component } from "react";
import { DataContext } from "../Context";
import Button from "@mui/material/Button";
import { Modal } from "../modal.js";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "../css/Card.css";
import "../css/Cart.css";
import "react-notifications/lib/notifications.css";

export class Cart extends Component {
  static contextType = DataContext;
  state = { alert: false, open: false, curr: {}, cnt:3 };
  createNotification = (type, title) => {
    return () => {
      switch (type) {
        case "info":
          NotificationManager.info("Info message");
          break;
        case "success":
          NotificationManager.success(
            title + " has been deleted successfully",
            "Delete",
            1000
          );
          break;
        case "warning":
          NotificationManager.warning(
            "Warning message",
            "Close after 3000ms",
            3000
          );
          break;
        case "error":
          NotificationManager.error("Error message", "Click me!", 5000, () => {
            alert("callback");
          });
          break;
      }
    };
  };
  componentDidMount() {
    this.context.getTotal();
  }
  handleModalOpen(item) {
    if (this.state.open) this.setState({ open: false });
    this.setState({ open: true, curr: item });
    console.log(this.state.curr);
  }
  handleModalClose = () => {
    this.setState({ open: false });
  };
  render() {
    const {
      cart,
      increase,
      reduction,
      removeProduct,
      removeAllProducts,
      total,
      totalcount,
      totaldiscount,
      totaltypediscount,
    } = this.context;
    if (cart.length === 0) {
      return (
        <>
          <h2 style={{ textAlign: "center" }}>Cart is empty</h2>
          <br /> <br />
          <div className="amount" style={{ textAlign: "center" }}>
            <center>
              <button
                className="count"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                style={{
                  display: "flex",
                  width: 270,
                  backgroundColor: " rgb(255, 238, 238)",
                }}
              >
                <h1 style={{ textAlign: "center" }}>Click to Reload Items</h1>
              </button>
            </center>
          </div>
        </>
      );
    } else {
      return (
        <div className="flex">
          <div className="CartContainer">
            <div className="Header">
              <img src="https://www.fortuneonline.in/images/logo.png" width="100px" height="100px" style={{marginLeft:"70px"}} />
              <h5
                className="Action"
                onClick={() => {
                  removeAllProducts();
                }}
              >
                Remove all
              </h5>
            </div>
            <Modal
              item={this.state.curr}
              open={this.state.open}
              handleClose={this.handleModalClose}
            />
            {cart.map((item, index) => (
              <div style={{display: 'flex', flexDirection: 'column'}}> 
                <div className="Cart-Items">
                  <div className="image-box">
                    <img src='http://s3-bucket-asia-2020.s3.amazonaws.com/productimages/SF5BIRSP1BES05ADI0621/SF5BIRSP1BES05ADI0621.main.png' style={{ height: "120px" }} />
                  </div>
                  <div className="about">
                    <h1 className="title">{item._id}</h1>
                    <h3 className="subtitle">{item.title}</h3>
                    {/* <img src="https://i.pinimg.com/originals/7c/0d/83/7c0d833b2ed954c79f9bef0003c2de6a.png" style={{ height:"30px" }}/> */}

                    <Button
                      variant="contained"
                      onClick={() => this.handleModalOpen(item)}
                      style={{ backgroundColor:"#F6802A"}}
                    >
                      View Similar
                    </Button>
                  </div>
                  <div className="counter">
                    <button className="btn" onClick={() => reduction(item._id)}>
                      {" "}
                      -{" "}
                    </button>
                    <div className="count">{item.count}</div>
                    <button className="btn" onClick={() => increase(item._id)}>
                      {" "}
                      +{" "}
                    </button>
                  </div>
                  <div className="prices">
                    <div className="amount">
                    ₹{Math.floor(item.price * item.count)}
                    </div>
                    <div className="save">
                      <u>Move to Cart</u>
                    </div>
                    <div
                      className="remove"
                      onClick={() => {
                        removeProduct(item._id);
                        this.setState({ alert: true });
                      }}
                    >
                      <Button
                        onClick={this.createNotification("success", item.title)}
                      >
                        <u>Remove</u>
                      </Button>
                    </div>
                  </div>
                  <br />
                </div>
                <div>
              {index === 0 ? ( 
                <span style = {{display: 'flex', flexDirection: 'row', marginLeft: 120, color: 'green'}}>
                  <img src='https://cdn-icons-png.flaticon.com/512/1/1176.png' style = {{height: 20, width: 20}} />
                  <p style = {{marginLeft: 8}}>Your stock ends in 3 days! </p>
                </span>
                )
                : null }
              {index === 2 ? ( 
                <span style = {{display: 'flex', flexDirection: 'row', marginLeft: 120, color: 'green'}}>
                  <img src='https://cdn-icons-png.flaticon.com/512/1/1176.png' style = {{height: 20, width: 20}} />
                  <p style = {{marginLeft: 8}}>Buy bigger pack to save 20%, see similar items for more.</p>
                </span>
                )
                : null }
              {index === 4 ? ( 
                <span style = {{display: 'flex', flexDirection: 'row', marginLeft: 120, color: 'green'}}>
                  <img src='https://cdn-icons-png.flaticon.com/512/1/1176.png' style = {{height: 20, width: 20}} />
                  <p style = {{marginLeft: 8}}>You have exhausted almost 70% of your stocks! Buy Soon!</p>
                </span>
                )
                : null }
                </div>
              </div>
            ))}
            <hr />
            <div className="checkout">
              <div className="total">
                <div>
                  <div className="Subtotal">Sub-Total</div>
                  <br />
                  <div className="items">{totalcount} items</div>
                    <br /> <br />
                </div>
                <div className="total-amount">₹{Math.floor(total.toFixed(2))}</div>
              </div>
              <Button variant="contained" style={{ backgroundColor:"#F6802A"}}> Move to Cart </Button>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          

          <NotificationContainer />
          </div>
          <br />
            <br />
            <br />
            <br />
        </div>
      );
    }
  }
}

export default Cart;
