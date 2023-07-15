const mongoose = require('mongoose')
const project = new mongoose.Schema({
          
          image:{
                    type:String,
                    required:true,
                    
          },
          title:{
                    type:String,
                    required:true
          }
          ,description:{
                    type:String,
                    required:true
          }
          ,link:{
                    type:String,
                    required:true
          }
})

const projects = new mongoose.model('project',project)
module.exports = projects
