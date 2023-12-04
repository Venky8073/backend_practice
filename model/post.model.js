const mongoose=require('mongoose')

const postSchema=mongoose.Schema({
    name:String,
    userName:String,
    price:Number,
    userId:String
},{
    versionKey:false
})

const postModel=mongoose.model("post",postSchema)

module.exports={postModel}