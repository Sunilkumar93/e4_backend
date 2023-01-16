require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db.js");
const { userRouter } = require("./routes/users.Routes.js");
const { postRouter } = require("./routes/posts.Routes.js");
const { authenticate } = require("./middleware/authenticate.middleware.js");

const port = process.env.port || 4500;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use(authenticate)
app.use("/posts",postRouter)

app.get("/", (req, res) => {
  res.send("welcome on homepage");
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error), console.log("error while connecting on db");
  }

  console.log(`server is running on ${port}`);
});
