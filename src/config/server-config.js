require('dotenv').config()

module.exports={
    MAIN_PORT:process.env.PORT,
    BOOKING_SERVICE_URL:process.env.BOOKING_SERVICE_URL,
    DATA_SERVICE_URL:process.env.DATA_SERVICE_URL
}
