const User=require('../models/User');
const router=require('express').Router();
const bcrypt=require('bcrypt');
const Post=require('../models/Post');

//UPDATE
router.put('/users/:id',async (req,res)=>{
   if(req.body.userId===req.params.id){
       if(req.body.password){
       const salt= await bcrypt.genSalt(10);
       req.body.password=await bcrypt.hash(req.body.password,salt);

       }
   
    try{
     const userUpdated=await User.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        {new:true}



     );
     res.status(200).json(userUpdated);



    }catch(err){
        res.status(500).json(err);
    }
     }else{
       res.status(401).json("YOU UPDATE ONLY YOUR ACCOUNT");
   }




});



//DELETE
router.delete('/users/:id',async (req,res)=>{
    if(req.body.userId===req.params.id){
        try{
              


            const user=await User.findById(req.params.id);
            if(user){
                try{
                    await Post.deleteMany({username:user.username});
                    await User.findByIdAndDelete(req.params.id);
                    res.status(200).json('DELETED');
                  }
                  catch(err){
                       res.status(500).json(err);
                   }


            }

        }catch(err){
            res.status(500).json('User Not Found');
        }
     
      }else{
        res.status(401).json("YOU UPDATE ONLY YOUR ACCOUNT");
    }
 
 
 
 
 });
 


 //GET USER
 router.get('/users/:id',async (req,res)=>{
     try{
    const user=await User.findById(req.params.id);
    const {password,...others}=user._doc;
    res.status(200).json(others);

     }catch(err){

        res.status(500).json(err);
     }



 });


module.exports=router;