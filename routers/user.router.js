const express=require('express')
const { userModel } = require('../model/user.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userRouter=express.Router()

userRouter.post('/add',(req,res)=>{
    const{name,email,password}=req.body
    try{
        bcrypt.hash(password,3,async(err,hash)=>{
            if(err){
                res.status(200).send({"msg":err.message})
            }else{
                const user=new userModel({name,email,password:hash})
                user.save()
                res.status(200).send({"msg":"Added seccessfully","user":user})
            }
        })
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await userModel.findOne({email:email})
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token=jwt.sign({userName:user.name,userId:user._id},'masai')
                res.status(200).send({"msg":`${user.name} login in successfully`,"token":token,"id":user._id})
            }
        })
    }catch(err){
        res.status(400).send({"msg":err.message})
        
    }
})

module.exports={userRouter}