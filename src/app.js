//Esto "invoca" express, que es el entorno en el que se va a crear la API
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const FIFTEEN_MINUTES = 15 * 60 * 1000;
//Aquí se crea la app en sí
const app = express();

const limiter = rateLimit({
    windowMs: FIFTEEN_MINUTES,
    limit: 100
});


//"Invocamos" los routers (por ahora solo a los usuarios)
const userRoutes = require("./routes/users.route");
const authRoutes = require("./routes/auth.route");
const errorHandler = require("./middlewares/errorHandler");

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(limiter);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);


module.exports = app;