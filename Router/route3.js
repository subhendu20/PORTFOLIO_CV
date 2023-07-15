const express = require('express')
const router = express.Router()
const cors = require('cors')
const dotenv = require('dotenv')
const JWT = require('jsonwebtoken')

const apis = require('../schema/apiform')
dotenv.config()
const path = require('path')

const cookie = require('cookie-parser')



router.use(cookie())
router.use(cors({
          origin: 'http://localhost:3000',
          methods: ['POST', 'PUT', 'GET','OPTIONS', 'HEAD'],
          credentials: true
}))



router.post('/createapi',async(req,res)=>{
          try {
                    const{name,description,url}=req.body
                    const cookie = await req.cookies.logtoken
                    if(!cookie){
                              
                              return res.sendFile(path.join(__dirname + '/Pages/login.html'))
                    }
                    const apikey = await JWT.sign(name,process.env.APITOKEN)
                    const newapi  = new apis({
                              name,description,url:url+'/'+apikey
                    })
                    newapi.save().then(()=>{
                              console.log(newapi)
                              res.sendFile(path.join(__dirname + '/Pages/apiupload.html'))
                    }).catch((e)=>{
                              console.log(e)
                    })

                    
          } catch (error) {
                    console.log(error)
                    
          }
          

})


router.get('/getapi',async(req,res)=>{
          const cookie = await req.cookies.logtoken
          if(!cookie){
                    
                    return res.sendFile(path.join(__dirname + '/Pages/login.html'))
          }
          const apilist = await apis.find({})
          res.send({apis:apilist})

})





router.get('/',async(req,res)=>{
          res.sendFile(path.join(__dirname + '/Pages/apiupload.html'))

})























module.exports=router