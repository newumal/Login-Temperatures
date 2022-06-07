const mongoose  = require("mongoose");

const WeatherSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    temperature: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    latitude : {
        type: String,
        required: true,
    },
    longitude  : {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
})

const WeatherModel = mongoose.model("weather", WeatherSchema);
module.exports = WeatherModel;