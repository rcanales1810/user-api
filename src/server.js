require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 3000;

pool.connect()
    .then(client => {
        console.log("Connection works");
        client.release();
    })
    .catch(err => {
        console.error("Error connecting:", err.message);
    });

app.listen(PORT, () => {
    console.log(`servidor en puerto ${PORT}`);
});