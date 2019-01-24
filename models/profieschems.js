var mongoose=require('mongoose');
var moment=require('moment');

// noinspection JSAnnotator
var profileschme=new mongoose.Schema({
  name:{type:Object},
  address:String,
  indian:String,
  hobbies:String,
  dob:{type:Date,format:"DD/MM/YYYY"},
  vehicleno:{type:Object},
  created:{type:String , default:moment().format("MM/DD/YYYYTHH:mm")},
  updated:{type:String, default:moment().format("MM/DD/YYYYTHH:mm")},
});
module.exports=mongoose.model('profiledata',profileschme);