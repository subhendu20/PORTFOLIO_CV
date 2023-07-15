const express = require('express')
const router = express.Router()
const cors = require('cors')
const dotenv = require('dotenv')
const user = require('../schema/user')
dotenv.config()
const path = require('path')
const JWT = require('jsonwebtoken')
const cookie = require('cookie-parser')
const nodemailer = require('nodemailer')


router.use(cookie())
router.use(cors({
          origin: "http://localhost:6001/*",
          methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
          credentials: true
}))
//------------post requests----------------------//
router.post('/registration', (req, res) => {
          const { username, password } = req.body
          const newuser = new user({
                    username, password
          })
          newuser.save().then((x) => {
                    console.log(x)
                    res.sendfile(path.join(__dirname + '/Pages/login.html'))

          }).catch((e) => {
                    console.log(e)
          })
})

router.post('/login', async (req, res) => {
          try {
                    const { username, password } = req.body


                    const finduser = await user.findOne({ username })
                    if (!finduser) {
                              window.alert("You need to register first")
                              return res.sendFile(path.join(__dirname + '/Pages/signup.html'))
                    }
                    if (finduser.password === password) {
                              const passwordcheck = await user.findOne({ password: finduser.password })
                              if (!passwordcheck) {
                                        return window.alert("Wrong password")
                              }

                    }

                    const token = await JWT.sign(username, process.env.TOKEN)
                    console.log(token)
                    res.cookie('logtoken', token).sendFile(path.join(__dirname + '/Pages/home.html'))


          } catch (error) {
                    console.log(error)

          }

})

router.get('/signout', async (req, res) => {
          const getcookie = await req.cookies.logtoken
          if (!getcookie) {
                    window.alert("You are already logged out")
          }
          res.clearCookie('logtoken').sendfile(path.join(__dirname + '/Pages/login.html'))
})


router.post('/mail', async (req, res) => {
          const { sendermail, message } = req.body
          console.log(req.body)
          var settransport = await nodemailer.createTransport({
                    service:'Gmail',
                    port:465,
                    auth:{
                              user:'subhendudesarkar2000@gmail.com',
                              pass:'antu2007'
                    }
          })

          var mailoptions = await {
                    from:sendermail,
                    to:'subhendudesarkar2000@gmail.com',
                    subject:sendermail,
                    html:`<ul>

                              <li>${sendermail}</li>
                              <li>${message}</li>

                    </ul>`
          }

          settransport.sendMail(mailoptions,(error,res)=>{
                    if(error){
                              res.send(error)
                    }
                    else{
                              res.send("sent")
                    }
          })

})



//---------------------------page requests------------------------------//
router.get('/', (req, res) => {
          res.sendfile(path.join(__dirname + '/Pages/home.html'))
})
router.get('/getsignup', (req, res) => {
          res.sendfile(path.join(__dirname + '/Pages/signup.html'))
})
router.get('/getlogin', (req, res) => {
          res.sendfile(path.join(__dirname + '/Pages/login.html'))
})
router.get('/gethomepage', (req, res) => {
          res.sendfile(path.join(__dirname + '/Pages/home.html'))

})





















module.exports = router