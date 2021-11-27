const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
const DBURL =
  "mongodb+srv://blog_project:Vja6yEDDZfXyAcXk@cluster0.n53kq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose
  .connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    return server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));
