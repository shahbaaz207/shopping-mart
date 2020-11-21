const express = require("express");
const data = require("./data1");
const port = process.env.PORT|| 5000;
const bodyParser = require("body-parser");
const path =require('path')
const dotenv = require("dotenv");
const mongooes = require("mongoose");
const userRouter = require("./router/userRoute");
const db = require('./config/key').mongourl


mongooes
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  mongooes.connection.on('connected',()=>{
    console.log('successfully connected')
  })
  mongooes.connection.on('error',(error)=>{
  console.log('error connecying',error.reason)

})

const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRouter);
app.use("/api/users", require('./router/addressRoute'));


app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find((x) => x._id === productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found.." });
  }
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

// Serve static assets
if(process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'))
  app.get('*',(req,res)=>{
res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}


app.listen(port, () => console.log(`Example app listening on port port!`));
