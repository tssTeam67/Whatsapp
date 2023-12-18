const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const cors=require('cors');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const user = require("./routes/userRoutes");
const message=require("./routes/messageRoutes");
const file=require("./routes/fileRoutes")
app.use("/api", user);
app.use("/api",message);
app.use("/api",file);

module.exports = app;
