const express  = require('express');
const router = express.Router();
const {saveWeather, getWeatherDataByUser} = require('../controllers/openWeatherController');
const { protect } = require('../middleware/authMiddleware');

router.route("/:index").post(protect, saveWeather);
router.route("/").get(protect, getWeatherDataByUser);

module.exports = router