const express = require('express')
const router = express.Router()
const cors = require('cors')
const dotenv = require('dotenv')

const blog = require('../schema/blog')
dotenv.config()
const path = require('path')

const cookie = require('cookie-parser')



router.use(cookie())
router.use(cors())




router.post('/addblog',async(req,res)=>{
          try {
                    const{title,tag,body}=req.body
                    const cookie = await req.cookies.logtoken
                    if(!cookie){
                              
                              return res.sendFile(path.join(__dirname + '/Pages/login.html'))
                    }
                    
                    
                    const newblog = new blog({
                              title,tag,body,date:new Date(Date.now()).getDate()+":"+new Date(Date.now()).getMonth()+":"+ new Date(Date.now()).getFullYear()
                    })
                    newblog.save().then(()=>{
                              console.log(newblog)
                              res.sendFile(path.join(__dirname + '/Pages/home.html'))
                    }).catch((e)=>{
                              console.log(e)
                    })

                    
          } catch (error) {
                    console.log(error)
                    
          }
         

})

router.get('/fetchblog',async(req,res)=>{
          const find = await blog.find({}) 
          res.send({Blogs:find})
})



module.exports = router