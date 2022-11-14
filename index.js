const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { log } = require("console");
const app = express();
const port = 5000;

const getIndex = (req) => {
  const findItem = product.find((item) => item.id == req.params.id);
  log(findItem);
  const index = product.indexOf(findItem);
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

const employees = [
  {
    id: 1,
    name: "daniel",
    age: 25,
    phoneNumber: 0524755555,
    email: "daniel@hmail.com",
  },
  {
    id: 2,
    name: "lior",
    age: 27,
    phoneNumber: 05247555555,
    email: "lior@hmail.com",
  },
  {
    id: 3,
    name: "cds",
    age: 5,
    phoneNumber: 052475524555,
    email: "asd@hmail.com",
  },
  {
    id: 4,
    name: "cds",
    age: 25,
    phoneNumber: 0524755242555,
    email: "vfr@hmail.com",
  },
  {
    id: 5,
    name: "cds",
    age: 5,
    phoneNumber: 05247524775555,
    email: "vfd@hmail.com",
  },
];

const shifts = [
  {
    id: 0,
    employees: ["ChenTheKing", "MaladaBadMan", "stupidJasoo"],
    startTime: "06:00",
    finishTime: "14:00",
    dayOfWeek: "5",
  },
  {
    id: 1,
    employees: ["hen", "yaso", "eldad"],
    startTime: "14:00",
    finishTime: "22:00",
    dayOfWeek: "5",
  },
  {
    id: 0,
    employees: ["lior", "gad", "bar"],
    startTime: "22:00",
    finishTime: "06:00",
    dayOfWeek: "5",
  }
];
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("My Store");
});
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

app.put("/store/edit/:id", (req, res) => {
  const productIndex = getIndex(req);
  if (productIndex > -1) {
    product[productIndex] = req.body.data;
  }
  res.send("successfully edit");
});

app.delete("/store/delete/:id", (req, res) => {
  const indexProduct = getIndex(req);
  const deleteProduct = product.splice(indexProduct, 1);
  res.send(product);
});

app.get("/store/product/id/:id", (req, res) => {
  const findProduct = product.find((item) => item.id == req.params.id);
  res.send(findProduct);
});

app.get("/store/employees", (req, res) => {
  res.send(employees);
});

app.post("/store/createEmployees", (req, res) => {
  const data = req.body.data;
  employees.push(data);
  data
    ? res.send("employees has add")
    : res.send("err employees has not added");
});

app.delete("/store/deleteEmployees/:id", (req, res) => {
  const employeesIndex = getIndex(req);
  if (employeesIndex > -1) {
    employees.splice(employeesIndex, 1);
    return res.send("yes");
  }
  res.send("no");
});

app.put("/store/updateEmployees/:id", (req, res) => {
  const employeesIndex = getIndex(req);
  const data = req.body.data;
  if (employeesIndex > -1) {
    employees[employeesIndex] = data;
    return res.send("employees update");
  }
  res.send("employees not update");
});

app.get("/store/getEmployeesById/:id", (req, res) => {
  const employeesId = employees.find((item) => item.id == req.params.id);
  employeesId ? res.send(employeesId) : res.send("no");
});

app.get("/store/getEmployeeByEmail/:email", (req, res) => {
  const employeeEmail = employees.find(
    (item) => item.email == req.params.email
  );
  employeeEmail ? res.send(employeeEmail) : res.send("employee not found");
});

app.get("/store/employeeOver18", (req, res) => {
  const employeeOver18 = employees.filter((item) => item.age > 18);
  employeeOver18 ? res.send(employeeOver18) : res.send("fved");
});

app.listen(port, () => {
  log(`this is the server: ${port}`);
});
