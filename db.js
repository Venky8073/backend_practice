const monsoose=require("mongoose")

require('dotenv').config()

const connection=monsoose.connect(process.env.mongoURL)

module.exports={connection}