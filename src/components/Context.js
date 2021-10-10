import React, { Component } from "react";
import axios from "axios";

import {categories, products} from './Categories';

export const DataContext = React.createContext();

const URL = "https://glacial-mountain-91416.herokuapp.com/?q=515125723";
const imgURL = "https://api.unsplash.com/search/photos?query=";
const imgURL2 = "&client_id=mdfuj6M7HLsgbh_2RhZC-N_0os7yT2OD_AT8LDJAlaM";
const stockPictureURL =
  "https://thumbs.dreamstime.com/b/shopping-cart-add-item-icon-design-add-to-cart-icon-designs-shopping-cart-add-item-icon-design-add-to-cart-icon-design-134743711.jpg";
const stockImg =
  "https://thumbs.dreamstime.com/b/shopping-cart-add-item-icon-design-add-to-cart-icon-designs-shopping-cart-add-item-icon-design-add-to-cart-icon-design-134743711.jpg";
const placeholderIMG = "https://i.pinimg.com/originals/7c/0d/83/7c0d833b2ed954c79f9bef0003c2de6a.png";
const dummy = {
  result: [
    ["apple", 5100855, 617, "electronics.clocks"],
    ["casio", 21403078, 39, "electronics.clocks"],
    ["NaN", 21402696, 24, "electronics.clocks"],
    ["samsung", 5100239, 257, "electronics.clocks"],
    ["garmin", 5100705, 1207, "electronics.clocks"],
  ],
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export class DataProvider extends Component {
  state = {
    cart: [
      {
        _id: 9090,
        title: "Item1",
        price: 200,
        discount: 10,
        count: 1,
        type: "fiction",
        src: "https://thumbs.dreamstime.com/b/shopping-cart-add-item-icon-design-add-to-cart-icon-designs-shopping-cart-add-item-icon-design-add-to-cart-icon-design-134743711.jpg",
      },
      {
        _id: 9091,
        title: "Item2",
        price: 250,
        discount: 15,
        count: 1,
        type: "literature",
        src: "https://thumbs.dreamstime.com/b/shopping-cart-add-item-icon-design-add-to-cart-icon-designs-shopping-cart-add-item-icon-design-add-to-cart-icon-design-134743711.jpg",
      },
      {
        _id: 9092,
        title: "Item3",
        price: 320,
        discount: 5,
        count: 1,
        type: "literature",
        src: "https://thumbs.dreamstime.com/b/shopping-cart-add-item-icon-design-add-to-cart-icon-designs-shopping-cart-add-item-icon-design-add-to-cart-icon-design-134743711.jpg",
      },
      {
        _id: 9093,
        title: "Item4",
        price: 290,
        discount: 0,
        count: 1,
        type: "thriller",
        src: "https://thumbs.dreamstime.com/b/shopping-cart-add-item-icon-design-add-to-cart-icon-designs-shopping-cart-add-item-icon-design-add-to-cart-icon-design-134743711.jpg",
      },
      {
        _id: 9094,
        title: "Item5",
        price: 500,
        discount: 25,
        count: 1,
        type: "thriller",
        src: "https://thumbs.dreamstime.com/b/shopping-cart-add-item-icon-design-add-to-cart-icon-designs-shopping-cart-add-item-icon-design-add-to-cart-icon-design-134743711.jpg",
      },
      {
        _id: 9095,
        title: "Item6",
        price: 150,
        discount: 5,
        count: 1,
        type: "literature",
        src: "https://thumbs.dreamstime.com/b/shopping-cart-add-item-icon-design-add-to-cart-icon-designs-shopping-cart-add-item-icon-design-add-to-cart-icon-design-134743711.jpg",
      },
      {
        _id: 9096,
        title: "Item7",
        price: 700,
        discount: 22,
        count: 1,
        type: "literature",
        src: "https://thumbs.dreamstime.com/b/shopping-cart-add-item-icon-design-add-to-cart-icon-designs-shopping-cart-add-item-icon-design-add-to-cart-icon-design-134743711.jpg",
      },
      {
        _id: 9097,
        title: "Item8",
        price: 350,
        discount: 18,
        count: 1,
        type: "fiction",
        src: "https://thumbs.dreamstime.com/b/shopping-cart-add-item-icon-design-add-to-cart-icon-designs-shopping-cart-add-item-icon-design-add-to-cart-icon-design-134743711.jpg",
      },
    ],
    total: 0,
    totaldiscount: 0,
    totaltypediscount: 0,
    totalcount: 0,
  };
  refresh = () => {
    const { cart } = this.state;
    this.setState({ cart: cart });
    this.getTotal();
    this.getCount();
    this.getDiscount();
    this.getTypeDiscount();
  };
  reduction = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item._id === id) {
        item.count === 1 ? (item.count = 1) : (item.count -= 1);
      }
    });
    this.refresh();
  };

  increase = (id) => {
    const { cart } = this.state;
    cart.forEach((item) => {
      if (item._id === id) {
        item.count += 1;
      }
    });
    this.refresh();
  };

  removeProduct = (id) => {
    // if (window.confirm("Do you want to delete this product?")) {
    const { cart } = this.state;
    cart.forEach((item, index) => {
      if (item._id === id) {
        cart.splice(index, 1);
      }
    });
    this.refresh();
    // }
  };

  removeAllProducts = () => {
    // if (window.confirm("Do you want to delete this product?")) {
    this.setState({ cart: [] });
    // this.refresh();
    this.getTotal();
    this.getCount();
    this.getDiscount();
    this.getTypeDiscount();
    // }
  };

  getTotal = () => {
    const { cart } = this.state;
    const res = cart.reduce((prev, item) => {
      return prev + item.price * item.count;
    }, 0);
    this.setState({ total: res });
  };
  getDiscount = () => {
    const { cart } = this.state;
    const res = cart.reduce((prev, item) => {
      return prev + item.discount * item.count;
    }, 0);
    this.setState({ totaldiscount: res });
  };
  getTypeDiscount = () => {
    const { cart } = this.state;
    const res = cart.reduce((prev, item) => {
      if (item.type === "fiction") {
        prev = prev + 0.15 * item.price * item.count;
      }
      return prev;
    }, 0);
    this.setState({ totaltypediscount: res });
  };
  getCount = () => {
    const { cart } = this.state;
    const res = cart.reduce((prev, item) => {
      return prev + item.count;
    }, 0);
    this.setState({ totalcount: res });
  };

  componentDidUpdate() {
    console.log("updated: ", this.state.cart);
    localStorage.setItem("dataCart", JSON.stringify(this.state.cart));
    localStorage.setItem("dataTotal", JSON.stringify(this.state.total));
    localStorage.setItem(
      "dataTotalCount",
      JSON.stringify(this.state.totalcount)
    );
    localStorage.setItem(
      "dataTotalDiscount",
      JSON.stringify(this.state.totaldiscount)
    );
    localStorage.setItem(
      "dataTotalTypedDiscount",
      JSON.stringify(this.state.totaltypediscount)
    );
  }

  async componentDidMount() {
    const reload = this.state.cart;
    console.log(reload);
    this.getTotal();
    this.getCount();
    this.getDiscount();
    this.getTypeDiscount();
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    if (dataCart !== null) {
      this.setState({ cart: dataCart });
    }
    const dataTotal = JSON.parse(localStorage.getItem("dataTotal"));
    if (dataTotal !== null) {
      this.setState({ total: dataTotal });
    }
    const dataTotalCount = JSON.parse(localStorage.getItem("dataTotalCount"));
    if (dataTotalCount !== null) {
      this.setState({ totalcount: dataTotalCount });
    }
    const dataTotalDiscount = JSON.parse(
      localStorage.getItem("dataTotalDiscount")
    );
    if (dataTotalDiscount !== null) {
      this.setState({ totaldiscount: dataTotalDiscount });
    }
    const dataTotalTypedDiscount = JSON.parse(
      localStorage.getItem("dataTotalTypedDiscount")
    );
    if (dataTotalTypedDiscount !== null) {
      this.setState({ totaltypediscount: dataTotalTypedDiscount });
    }

    async function f(opt) {
      const response = await axios.get(URL);
      const fetched = await response.data[`${opt}`].map(async (el) => {
        let str = el[3];
        str += "%20";
        str += el[1].split(".")[1];

        const finalURL = imgURL + str + imgURL2;
        const res = await axios.get(finalURL);

        if (!res.data.results) {
          console.log("no img found for", str);
          return [];
        }
        const relatedURL =
          "https://glacial-mountain-91416.herokuapp.com/sametype/?q=" + el[0];
        const related = await axios.get(relatedURL);
        if (!related.data.result) {
          if (related.data) {
            related.data = dummy;
          }
        }
        const similars = await related.data.result.map(async (ele, i) => {
          const similarItem = {
            _id: ele[1],
            type: ele[0],
            price: ele[2],
            title: ele[1],
            count: 1,
            src: placeholderIMG,
          };
          return similarItem;
        });
        return Promise.all(similars).then((responses) => {
          const d = {
            _id: el[0],
            type: el[1],
            price: el[2],
            title: el[3],
            count: 1,
            src: placeholderIMG,
            similar: responses,
          };
          return d;
        });
      });
      return fetched;
    }
    await f("collaborative")
      .then((response) => {
        return Promise.all(response).then((res) => {
          console.log("fetched collaborative: ", res);
          this.setState({ cart: [this.state.cart, ...res] });
          return res;
        });
      })
      .then(async (res) => {
        await f("similar_product_content_based").then((response) => {
          Promise.all(response).then((r) => {
            console.log("fetched content-based: ", r);
            const temp = shuffle([this.state.cart, ...res, ...r]).slice(10);
            let mp =  {};
            let np =  {};
            let ci=0;
            const prods = temp.map((item)=> {
              let d = Object.assign({}, item);
              if(!mp[item.title] || mp[item.title] === "" || np[item._id] === "") {
                mp[item.title] = categories[ci];
                np[item._id] = products[categories[ci]][Math.floor(Math.random()*products[categories[ci]].length)]; 
                ci++;
                ci %= categories.length;
              }
              d.title = "Fortune " + mp[item.title];
              d._id = products[mp[item.title]][Math.floor(Math.random()*products[mp[item.title]].length)];
              d.similar = item.similar.map((s) => {
                let sim = Object.assign({}, s);
                sim._id = products[mp[item.title]][Math.floor(Math.random()*products[mp[item.title]].length)];
                sim.title = products[mp[item.title]][Math.floor(Math.random()*products[mp[item.title]].length)];
                sim.type = mp[item.title];
                return sim;
              });
              return d;
            });
            this.setState({ cart: prods });
          });
        });
      });
  }

  render() {
    const { cart, total, totalcount, totaldiscount, totaltypediscount } =
      this.state;
    const {
      addCart,
      reduction,
      increase,
      removeProduct,
      removeAllProducts,
      getTotal,
      getCount,
      getDiscount,
      getTypeDiscount,
    } = this;
    // const cart2 = cart
    return (
      <DataContext.Provider
        value={{
          cart,
          reduction,
          increase,
          removeProduct,
          removeAllProducts,
          total,
          getTotal,
          totaldiscount,
          getDiscount,
          totaltypediscount,
          getTypeDiscount,
          totalcount,
          getCount,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
