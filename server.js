const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Read products file
const readProducts = () => {
  const data = fs.readFileSync("products.json");
  return JSON.parse(data);
};

// Write to products file
const writeProducts = (data) => {
  fs.writeFileSync("products.json", JSON.stringify(data, null, 2));
};


// ✅ GET METHOD – display all products
app.get("/getProducts", (req, res) => {
  const products = readProducts();
  res.json(products);
});


// ✅ POST METHOD – add new product
app.post("/addProduct", (req, res) => {
  const products = readProducts();
  const newProduct = req.body;

  products.push(newProduct);
  writeProducts(products);

  res.json({ message: "Product added successfully", newProduct });
});


// ✅ DELETE METHOD – delete by productId
app.delete("/deleteProduct/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let products = readProducts();

  products = products.filter(p => p.productId !== id);
  writeProducts(products);

  res.json({ message: "Product deleted successfully" });
});


// ✅ UPDATE METHOD – update description
app.put("/updateProduct/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const products = readProducts();

  const product = products.find(p => p.productId === id);

  if (product) {
    product.description = "Preferred by Both Vegetarains and Non Vegetarians";
    writeProducts(products);
    res.json({ message: "Product updated successfully", product });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});


// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
