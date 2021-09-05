const router=require('express').Router();
const User=require('../models/User');
const Post =require('../models/Post');

//Create Post
router.post('/posts/',async (req,res)=>{
const newPost=new Post(req.body);
try{
const savedPost=await newPost.save();
res.status(200).json(savedPost);

}catch(err){
    res.status(500).json("Can't post");
}



});

//Delete
router.delete('/posts/:id',async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.username===req.body.username){
          try{
             await Post.findOneAndDelete(req.params.id);
             res.status(200).json('DELETED POST!');
          }catch(err){
           res.status(500).json(err);
          }

        }else{
            res.status(401).json(" YOU CAN DLETE ONLY YOUR POST")
        }

        }catch(err){

           res.status(500).json(err);
        }     




});





//update


router.put('/posts/:id',async (req,res)=>{
         try{
         const post=await Post.findById(req.params.id);
         if(post.username===req.body.username){
           try{
              const updatedPost=await Post.findByIdAndUpdate(
               req.params.id,
               {
                   $set:req.body,
               },
               {new:true}
              

              );
              res.status(200).json(updatedPost);
           }catch(err){
            res.status(500).json(err);
           }

         }else{
             res.status(401).json(" YOU CANUPDATE ONLY YOUR POST")
         }

         }catch(err){

            res.status(500).json(err);
         }



});


//GET post


router.get('/posts/:id',async (req,res)=>{
     try{
         const post=await Post.findById(req.params.id);
         res.status(200).json(post);

     }catch(err){
         res.status(500).json(err)
     }



});
//GET ALL POST
router.get('/posts/:id',async (req,res)=>{
    
       const username=req.query.user;
       const catname=req.query.cat;
       try{
           let posts;
           if(username){
               posts=await Post.find({usernam:username});
           }else if(catname){
               posts=await Post.find({
                   categories:{
                       $in:[catname]
                   }

               });
           }
           else{
               posts=await Post.find();
           }


        res.status(200).json(posts);

    }catch(err){
        res.status(500).json(err)
    }



});

module.exports=router;