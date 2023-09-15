const userSchema = require('../Model/UserModel')
const axios = require('axios')
const nodemailer = require('nodemailer')




const getweatherDetail = async (location) => {
    try {
        const apiKey = '618b5920181344091f0f3ea52ae297eb';
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
        );
        // Process the response and extract weather data
        const weatherData = {
            temperature: response.data,
            // Add other relevant data
        };

        return weatherData;
    } catch (error) {
        throw error;
    }
}
exports.HomeView =(req, res) => {
    res.status(200).json('Welcome, your app is working well');
  }

exports.createUser = async (req, res) => {
    try {
        const existingUser = await userSchema.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(400).json("email already exists");
        }
        const wheatherdata = await getweatherDetail(req.body.location)
        // return res.status(200).json(wheatherdata);

        const postData = await new userSchema({
            email: req.body.email,
            location: req.body.location,
            weatherData: wheatherdata,
        });
        const postUser = await postData.save();
        if (postUser) {
            return res.status(200).json("User's data added successfully");
        }
    } catch (error) {
        res.status(400).json({ message: "account Created failed", error })
    }
}

exports.updateUser = async (req, res) => {

    try {
        const updateUSer = await userSchema.findById(req.params.id)
        if (!updateUSer) {
            return res.status(400).json("user not found");
        }
        const wheatherdata = await getweatherDetail(req.body.location)

        const updateUser = await userSchema.findByIdAndUpdate(req.params.id, {
            email: req.body.email,
            location: req.body.location,
            weatherData: wheatherdata,
        }, {
            new: true,
            // runValidators: true
        })
        res.status(201).json({
            success: true,
            updateUser
        })
    } catch (error) {
        res.status(400).json({ message: "user data update failed", error })

    }
}

exports.getAllUser = async (req, res) => {
    try {
        const users = await userSchema.find({}, 'email weatherData');
        return users

    } catch (error) {
        res.status(400).json({ message: "user data retrive failed", error })

    }
}
exports.getAllUser1 = async (req, res) => {
    try {
        const users = await userSchema.find({}, 'email weatherData');
        res.status(201).json({
            success: true,
            user.weatherData
        })

    } catch (error) {
        res.status(400).json({ message: "user data retrive failed", error })

    }
}
exports.sendWeatherReport = ({ email, WeatherReport }) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 's.mahan19com@gmail.com',
            pass: 'rvtlnrkiaxaluggi'
        }
    });
    console.log(email)
    var mailOptions = {
        from: 's.mahan19com@gmail.com',
        to: email,
        subject: "your loaction's Today Weather Report",
        text: JSON.stringify(WeatherReport, null, 2)
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            return res.send({ Status: "Success" })
        }
    })
}

exports.getUserWeather = async (req, res) => {
    try {
        const userId = req.params.id;
        const findUser = await userSchema.findById(userId)
        if (!findUser) {
            return res.status(400).json("user not found");
        }
        const weatherData = await userSchema.find({
            _id: userId,
            createdAt: {
                $gte: new Date(req.params.date),
                $lt: new Date(startDate.getTime() + 24 * 60 * 60 * 1000),
            }
        });
        res.status(201).json(weatherData)
    } catch (error) {
        res.status(400).json({ message: "user  data not find", error })
        console.log(error)
    }
}