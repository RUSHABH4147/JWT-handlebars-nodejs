const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const exphbs = require("express-handlebars");
require("dotenv/config");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cors());
app.use(cookieParser());
//import router
const register = require("./routes/registerandlogin");
const post = require("./routes/post");
//engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/hbs", function (req, res) {
  res.render("home");
});
//middleware
app.use(express.json());
app.use("/jwt", register);
app.use("/jwt/privatepost", post);

//db
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log("runing on port 4000");
});
