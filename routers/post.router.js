const express=require('express')
const { postModel } = require('../model/post.model')
const { auth } = require('../middleware/auth.middle')

const postRouter=express.Router()

postRouter.use(auth)

postRouter.get('/',async(req,res)=>{
    try{
        const posts= await postModel.find()
        res.status(200).send({"data":posts})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})


postRouter.post("/add",(req,res)=>{
    try{
        const post=new postModel(req.body)
        post.save()
        res.status(200).send({"msg":`data added ${req.body}`})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

postRouter.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id
    try{
        const find=await postModel.findOne({_id:id});
        if(req.body.userId==find.userId){
            await postModel.findByIdAndDelete({_id:id});
            res.status(200).send({"msg":"deleted successfully"});
        }
    }
    catch(err){
        res.status(400).send({"msg":err.message});
    }
})

module.exports={postRouter}