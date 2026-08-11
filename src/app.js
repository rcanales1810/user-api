//Esto "invoca" express, que es el entorno en el que se va a crear la API
const express = require("express");

//Aquí se crea la app en sí
const app = express();

//"Invocamos" los routers (por ahora solo a los usuarios)
const userRoutes = require("./routes/users.route");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());

app.use("/users", userRoutes);

app.use(errorHandler);


module.exports = app;