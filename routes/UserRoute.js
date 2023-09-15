const userSchema = require('../Model/UserModel')
const express = require('express')
const router = express.Router()
const { createUser, updateUser, getAllUser,getAllUser1, sendWeatherReport, getUserWeather,HomeView,getWeatherData } = require('../controller/UserController')



router.post('/create', createUser)
router.put('/update/:id', updateUser)
router.get('/getUserWeather/:id/:date', getUserWeather)
router.get('/getWeather/:date', getWeatherData)
router.get('/',HomeView )
router.get('/getAllUser',getAllUser1)


// const interval = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
const interval = 60 *1000; 

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
