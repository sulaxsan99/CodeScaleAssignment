const userSchema = require('../Model/UserModel')
const express = require('express')
const router = express.Router()
const { createUser, updateUser, getAllUser,getAllUser1, sendWeatherReport, getUserWeather,HomeView } = require('../controller/UserController')



router.post('/create', createUser)
router.put('/update/:id', updateUser)
router.get('/getUserWeather/:id/:date', getUserWeather)
router.get('/',HomeView )
router.get('/Home',getAllUser1)


const interval = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
// const interval = 3 *1000; // 3 hours in milliseconds

setInterval(async () => {
    try {

        const users = await getAllUser();
        users.map((user) => (
            sendWeatherReport({ email: user.email, WeatherReport: user.weatherData.temperature })
            // console.log(user.weatherData.temperature)
        ));
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}, interval)
module.exports = router
