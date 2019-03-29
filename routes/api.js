const cors = require("cors"),
  bodyParser = require("body-parser"),
  config = require("../configs");

require("../app/models");
const app = require("express").Router();
app.use(
  cors({
    exposedHeaders: ["x-warning"]
  })
);
app.use(bodyParser.json());
bodyParser.urlencoded({ extended: true });
const controller = path => require("../app/controllers/" + path);

// requiring controller
const test = controller("testController");
const registration = controller("auth/registerController");
const login = controller("auth/loginController");
const profile = controller("profileController");
const fetchStory = controller("storiesFetch");

// routes without authentication
// auth routes
app.get("/stories", fetchStory.stories);

app.post("/register", registration.register);
app.post("/login", login.login);

app.get("/users", test.getUser);

app.use(require("../app/middlewares/authentication")(config.app.key));

// routes requiring authentication token
app.get("/test", test.index);
app.post("/test", test.create);
app.get("/me", profile.me);
app.put("/me/:user", profile.update);

app.all("*", (req, res) => {
  res.status(404).send({ message: "The route you are looking is not found." });
});

module.exports = app;
