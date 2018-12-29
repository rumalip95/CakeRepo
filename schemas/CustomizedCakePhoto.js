/*####################################################################################################################
                                                CREATED BY Rumali Perera
                                                     2018 JULY 26
                                              Customized Cake Photo SCHEMA
                                                     PROJECT CAKEZ
 ####################################################################################################################*/

 var mongoose = require('mongoose');

 customizedCakePhotoSchema = mongoose.Schema({
     userName:String,
     image:String,
     description:String,
     status:String, //order accepted status
     deadline:Date,
     uploadedDate:Date
 });
 
 var customizedCakePhotoDB = mongoose.model('customizedCakePhotos', customizedCakePhotoSchema);
 module.exports = customizedCakePhotoDB;