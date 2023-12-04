const express=require("express")
const { connection } = require("./db")
const { userRouter } = require("./routers/user.router")
const { postRouter } = require("./routers/post.router")
const cors =require('cors')

const app=express()

app.use(cors())
app.use(express.json())

app.use('/user',userRouter)

app.use('/posts',postRouter)

app.get("/",(req,res)=>{
    res.send({"msg":"this is the home page"})
})

app.listen(4500,async()=>{
    try{
        await connection
        console.log("connected to Db")
        console.log("running 4500")
    }catch(err){
        console.log(err)
    }
})
