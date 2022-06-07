const mongoose = require("mongoose")

const connectDB = async (URL) => {
  try {
      const conn = await mongoose.connect(URL)
      console.log(`MongoDB connected ${conn.connection.host}`)
  }catch (err) {
      console.error(err)
      process.exit(1)
  }
}

module.exports = connectDB

