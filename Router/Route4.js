const express = require('express')
const router = express.Router()
const cors = require('cors')
const dotenv = require('dotenv')
const JWT = require('jsonwebtoken')
const nodemail = require('nodemailer')

const projects = require('../schema/Project')
dotenv.config()
const path = require('path')

const cookie = require('cookie-parser')



router.use(cookie())
router.use(cors({
          origin: 'http://localhost:6001',
          methods: ['POST', 'PUT', 'GET','OPTIONS', 'HEAD'],
          credentials: true
}))



router.post('/createproject',async(req,res)=>{
          try {
                    const{image,description,title,link}=req.body
                    const cookie = await req.cookies.logtoken
                    if(!cookie){
                              
                              return res.send("login karo").sendFile(path.join(__dirname + '/Pages/login.html'))
                    }
                    console.log(req.body)
                    const newproject  = projects({
                              title,description,link,image
                    })
                    newproject.save().then(()=>{
                              console.log(newproject)
                              res.sendFile(path.join(__dirname + '/Pages/home.html'))
                    }).catch((e)=>{
                              console.log(e)
                    })

                    
          } catch (error) {
                    console.log(error)
                    
          }
          

})


router.get('/getprojects',async(req,res)=>{
         
          const projectlist = await projects.find({})
          res.send(projectlist)

})




























module.exports=router