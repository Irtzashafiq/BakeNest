var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
var usersRouter = require("./routes/users");
var itemsRouter = require("./routes/items");
var orderRouter = require("./routes/orders");
var contactRouter = require("./routes/contact");

var app = express();
var connectioNString =
  "mongodb+srv://irtzashafiq:pakistan@cluster0.1i7idz5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const options = {
  dbName: "BakeryNest",
};
mongoose.connect(connectioNString, options);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connection successfull");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use("/uploads", express.static("uploads"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    //without cors it throws some behaviour issues
    credentials: true,
    origin: true, // it allows communication between different origins like front end or backend
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", usersRouter);
app.use("/item", itemsRouter);
app.use("/order", orderRouter);
app.use("/contact", contactRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
