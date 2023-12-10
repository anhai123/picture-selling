// Import packages
const express = require("express");
const home = require("./routes/home");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const db = require("./models");
const Role = db.role;
const Comments = db.comment;
// Middlewares
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = require("socket.io")(server, {
  cors: {
    origin: ["https://picture-selling-ychv.vercel.app"],
    methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
  },
});
var corsOptions = {
  // credentials: true, //access-control-allow-credentials:true
  // optionSuccessStatus: 200,
  // methods: ['AAA'],
  allowedHeaders: ['X-Requested-With', 'Content-Type'],
  methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  origin: "https://picture-selling-ychv.vercel.app/",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,

};
app.use(cors(corsOptions));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header("Access-Control-Allow-Methods", "PUT, GET, POST, OPTIONS");
//   next();
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let users = [];

// Routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/category.routes")(app);
require("./routes/payment.routes")(app);
require("./routes/product.routes")(app);
require("./routes/comment.routes")(app);
app.use("/home", home);

// db.mongoose
//   .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Successfully connect to MongoDB.");
//     initial();
//   })
//   .catch((err) => {
//     console.error("Connection error", err);
//     process.exit();
//   });
db.mongoose.set("strictQuery", false);
db.mongoose
  .connect(
    "mongodb+srv://my-restaurant:RSPpaNHXRQjdvpzq@my-restaurant.znkjyyi.mongodb.net/shopping?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
// connection
io.on("connection", (socket) => {
  console.log(socket.id + " connected!");

  // lang nghe du lieu tu client
  socket.on("joinRoom", ({ userId, roomId }) => {
    console.log("userId, roomId ", userId, roomId);
    const user = { userId: userId, roomId: roomId };
    console.log(0, users);
    const check = users.every((user) => user.userId !== userId);
    console.log("check", check);
    if (check) {
      users.push(user);
      console.log(1);
      socket.join(user.roomId); // user hien tai se join vao room
    } else {
      users.map((user) => {
        if (user.userId === userId) {
          console.log(0.5);
          if (user.roomId !== roomId) {
            socket.leave(user.roomId);
            console.log(2);
            socket.join(roomId);
            user.roomId = roomId;
          }
        }
      });
    }
    console.log("users array", users);
    console.log(socket.adapter.rooms);
  });

  socket.on("createComment", async (data) => {
    console.log("datadata", data);
    const { name, content, product_id, createdAt, star } = data;

    const newComment = new Comments({
      name,
      content,
      product_id,
      createdAt,
      star,
    });

    await newComment.save();
    console.log("newComment.product_id", newComment.product_id);
    console.log("users array", users);
    console.log(socket.adapter.rooms);
    console.log(newComment);
    io.to(product_id).emit("sendCommentToClient", newComment);
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected!");
  });
});
const port = process.env.PORT || 9001;
server.listen(port, () => console.log(`Listening to port ${port}`));
