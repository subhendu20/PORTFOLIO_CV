const mongoose = require('mongoose')

const blog = new mongoose.Schema({
          
          title:{
                    type:String,
                    required:true,
                    
          },
          date:{
                    type:String,
                    required:true
          }
          ,tag:{
                    type:String,
                    required:true
          }
          ,body:{
                    type:String,
                    required:true
          }
})

const blogs = new mongoose.model('blog',blog)
module.exports = blogs
