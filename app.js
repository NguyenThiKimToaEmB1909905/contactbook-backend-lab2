const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

//cau4
const contactsRouter = require("./app/routes/contact.route");
app.use("/api/contacts", contactsRouter);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});
//cau 5
const ApiError = require("./app/api-error");

// handle 404 response
app.use((req, res, next) => {
  // Codeởđây sẽ chạy khi không có route được định nghĩa nào
  // khớp với yêu cầu.Gọi next()để chuyển sang middleware xử lý lỗi
  return next(new ApiError(500, "Resource not found"));
});
// define error-handling middleware last,after other app.use()and routes calls
app.use((err, req, res, next) => {
  // Middleware xử lý lỗi tập trung.
  // Trong các đoạn code xử lýởcác route,gọi next(error)
  //sẽ chuyển về middleware xử lý lỗi này
  return res.status(error.statusCode || 404).json({
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
