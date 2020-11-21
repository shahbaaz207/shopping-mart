const express = require("express");
const router = express.Router();
const Address = require("../models/addressModel");

router.get('/data',async(req,res)=>{
    Address.findOne().then(data=>{
        res.send({data})
    }).catch(err=>{ 
        console.log(err)
    })
})

router.post('/address',(req,res)=>{
    const {address,city,mobile,code,country}=req.body;
    const addressData=new Address({
        address,city,mobile,code,country
    })
    addressData.save()
    .then(() => {
      res.send({ message: " successfully send" });
    })
    .catch((error) => {
      console.log(error);
    });
})
module.exports = router;

