const jwt=require('jsonwebtoken')
const{JWT_SECRET}=require('../config/key')
const mongoose=require('mongoose')
const User=require('../models/userModel')

module.exports=(req,res,next)=>{
    const {authorization}=req.headers

    if(!authorization){
      return  res.status(404).json({error:'you must be logged in'})
    }

    const token=authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
          return  res.status(401).json({error:'you must be logged In'})
        }

        const {_id}=payload
        User.findById(_id).then(userdata=>{
            req.user=userdata
        })
        next()
    })
}