const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { log } = require("console");
const app = express();
const port = 5000;

const getIndex = (req) => {
  const findItem = product.find((item) => item.id == req.body.id);
  const index = product.includes(findItem);
  return index;
};

const product = [
  {
    id: 1,
    productName: "Phone",
    description: "brand new",
    price: 1500,
    quantity: 4,
    img: "someUrl",
  },
  {
    id: 2,
    productName: "Tv",
    description: "brand new",
    price: 2000,
    quantity: 10,
    img: "someUrl",
  },
  {
    id: 3,
    productName: "Car",
    description: "brand new",
    price: 40000,
    quantity: 15,
    img: "someUrl",
  },
  {
    id: 4,
    productName: "watch",
    description: "brand new",
    price: 500,
    quantity: 7,
    img: "someUrl",
  },
  {
    id: 5,
    productName: "shoes",
    description: "brand new",
    price: 700,
    quantity: 20,
    img: "someUrl",
  },
];
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get("/store", (req, res) => {
  res.send("server is good");
});

app.get("/store/product", (req, res) => {
  res.send({ massage: "all good", product });
});

app.post("/store/create", (req, res) => {
  const data = req.body.data;
  product.push(data);
  data ? res.send("product Add") : res.send("error no product add");
});

app.put("/store/edit", (req, res) => {
  const productIndex = getIndex(req);
  if (productIndex > -1) {
    product[productIndex] = req.body.data;
  }
});

app.listen(port, () => {
  log(`this is the server: ${port}`);
});
