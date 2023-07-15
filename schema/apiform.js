const mongoose = require('mongoose')
const newapi = new mongoose.Schema({
          
          name:{
                    type:String,
                    required:true,
                    
          },
          description:{
                    type:String,
                    required:true
          }
          ,url:{
                    type:String,
                    required:true
          }
        
})

const apis = new mongoose.model('api',newapi)
module.exports = apis