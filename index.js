const express = require('express')
const mongoose = require('mongoose')

const middleware = require('body-parser')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config()
const app = express()
const route1 = require('./Router/route1')
const route2=require('./Router/route2')
const route3 = require('./Router/route3')
const route4 = require('./Router/Route4')
      
mongoose.connect(process.env.DB,{
          useNewUrlParser:true,
          
          useUnifiedTopology:true



}).then(()=>{
          console.log("connected")
}).catch((e)=>{
          console.log(e)
})



app.use(middleware.urlencoded({ extended: false }));
app.use(middleware.json());
app.use('/blog',route1)
app.use('/blog',route2)
app.use('/apis',route3)
app.use('/projects',route4)


app.use(express.static(path.join(__dirname, './hh/build')))

app.get('*',(req,res)=>{
          res.sendFile(path.join(__dirname, './hh/build/index.html'))
})




app.listen(process.env.PORT,()=>{
          console.log(`App is running on port no ${process.env.PORT}`)
})