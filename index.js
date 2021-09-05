const express=require('express');
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const multer=require('multer');

dotenv.config();
app.use(express.json());



//routes
const authRoute=require('./routes/auth');
const usersRoute=require('./routes/users');
const postRoute=require('./routes/posts');
const catRoute=require('./routes/categories');



app.use(authRoute);
app.use(usersRoute);
app.use(postRoute);
app.use(catRoute);



mongoose.connect(process.env.MONGO_URL,{

    useNewUrlParser:true,
    useUnifiedTopology:true,
   
})
.then(console.log('mongo'))
.catch((err)=>{
console.log(err);
});


app.use('/',(req,res)=>{


})
app.listen(5000,()=>{
    console.log("done")
})