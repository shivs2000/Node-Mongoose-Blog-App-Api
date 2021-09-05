const router=require('express').Router();
const Category=require('../models/Category');
//Create
router.post('/categories/',async (req,res)=>{
    const newcat=new Category(req.body);
    try{
     const savedCat=await newcat.save();
     res.status(200).json(savedCat);

    }catch(err){
        res.status(500).json(err);
    }



})




//
router.get('/categories/',async (req,res)=>{
    try{
        const cat=await Category.find();
        res.status(200).json(cat);
   
       }catch(err){
           res.status(500).json(err);
       }





});


module.exports=router;