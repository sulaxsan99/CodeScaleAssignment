const mongoose = require('mongoose')

const DbConnection = () => {
    try {
        mongoose.connect(process.env.Db_URi)
        .then(()=>{
            console.log("Db connected")
        })
        .catch((err)=>{
            console.log(err)
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports= DbConnection