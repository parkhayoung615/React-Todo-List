// mongo-test.js

const mongoose = require("mongoose");

const uri =
  "mongodb+srv://parkhayoung615:pp050615@react-todo-list.qrp39mb.mongodb.net/";

// 실제 ID, PW 넣기
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB 연결 성공!");
    mongoose.connection.close(); // 연결 끊기
  })
  .catch((err) => {
    console.error("❌ MongoDB 연결 실패:", err);
  });
