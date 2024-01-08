require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
const userRouter = require("./routers/users");
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
