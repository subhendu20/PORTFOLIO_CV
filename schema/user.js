const mongoose = require('mongoose')

const users = new mongoose.Schema({
         username:{
          type:String,
          required:true,
          unique:true
         },
         password:{
          type:String,
          required:true,
          unique:true
         }
})

const user = new mongoose.model('user',users)
module.exports = user