const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
//import database
const connectDatabase = require("../config/database");

//config
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

//connect database
connectDatabase();

const articles = require("./routes/articles");
const users = require('./routes/users')
const comments = require('./routes/comments')

app.use(cors());

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", articles);
app.use("/api/v1", users);
app.use("/api/v1", comments);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
