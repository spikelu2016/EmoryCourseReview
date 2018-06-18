const mongoose = require('mongoose');
var {Schema}=mongoose;

var critiqueSchema=new Schema({
      difficulty:Number,
      overall: Number,
      workload:Number,
      prof_accent:Number,
      attendence:Boolean,
      curve:Boolean,
      comment:String,
      rated_date:Date,
      upvotes:Number,
      downvotes: Number
})

 module.exports =  mongoose.model('critique',critiqueSchema);
