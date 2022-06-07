const express = require("express");
const connectDB = require('../config/db')
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { errorHandler } = require("../middleware/errorMiddleware");
require('dotenv').config();


const URL = process.env.MONGODB_URL;
// set port, listen for requests
const PORT = process.env.PORT || 4000;


let corsOptions = {
    origin: "http://localhost:4000"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome Login Temperature App ! " });
});

app.use('/api/users', require('../routes/userRoutes'));
app.use('/api/weather', require('../routes/openWeatherRoutes'));
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    connectDB(URL)
});