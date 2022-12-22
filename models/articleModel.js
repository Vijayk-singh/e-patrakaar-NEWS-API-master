const mongoose = require('mongoose')

const autoIncrement = require('mongoose-sequence')(mongoose);



//creating Schema for the posts

const articleSchema = new mongoose.Schema({
    _id: Number,
    author:{
        type:String,
        // required:true
    },
    title:{
        type:String,
        // required:true,
        unique:true,
    },
    description:{
        type:String,
        // required:true,
     unique:true
    },
    images:{
        data:Buffer,
        type:String,
    },
    content:{
        type:String,
        // required:true,
        // unique:true
    },
    
 //Added Category whose type is string and tags, keywords can store 
    
    category:{
        type: String,
        // required: true
    },
    tags: {
        type: String,
        // required: true
    },
    keywords: {
        type: String,
        // required: true
    }

} , { _id: false , timestamps:true})

articleSchema.plugin(autoIncrement);

module.exports= mongoose.model("Articles",articleSchema)