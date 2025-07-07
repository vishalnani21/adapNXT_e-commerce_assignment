require('dotenv').config();
const express = require('express');
const connectDB  = require("./config/database");
const cookieparser = require("cookie-parser");
const cors = require('cors');

const app = express();



app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieparser());


const authRouter = require("./routers/auth.js");
const productRouter = require('./routers/product.js');
const cartRouter = require('./routers/cart.js');
const orderRoute=require('./routers/order.js');

app.use("/", authRouter);
app.use("/",productRouter);
app.use("/",cartRouter);
app.use("/",orderRoute)


const PORT = process.env.PORT || 5000;
const startServer=async()=>{
    try {
 await connectDB();
 await app.listen(PORT,()=>console.log("server is running on port 5000"));
    }
    catch(err){
        console.log("Server not connected");
    }
}
startServer();