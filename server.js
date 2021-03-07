const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
console.log(process.env.url)
mongoose.connect(process.env.url,connectionParams)
.then(()=>{
    console.log("Successfully Connected to Database")
})
.catch((err)=>{
    console.log("yes the error is",err);
})
const app=express();
app.use(express.json())
app.use('/api/user',require('./routes/users'))
app.use('/api/post',require('./routes/post'))
app.use('/api/follow',require('./routes/follow'))
app.use('/api/notification',require('./routes/notification'))
app.use('/api/messages',require('./routes/messages'))
app.use('/api/profile',require('./routes/profile'))
app.get('/',(req,res)=>{
    res.send("hey bro");
})
app.listen(process.env.port,()=>{
    console.log("server started at",process.env.port);
})
