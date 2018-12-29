/*####################################################################################################################
                                                CREATED BY Rumali Perera
                                                     2018 JULY 26
                                         CAKE PROVIDER UPLOADED NEW CAKE IMAGE SCHEMA
                                                     PROJECT CAKEZ
 ####################################################################################################################*/

 var mongoose = require('mongoose');

 customizedCakePhotoSchema = mongoose.Schema({
     id:String,
     userName:String,
     title:String,//name of the cake
     image:String,
     text:String,
     weight:String,
     price:String
 });
 
 var cakeProviderUploadNewCakeDB = mongoose.model('cakeShopUploadCakePhoto', customizedCakePhotoSchema);
 module.exports = cakeProviderUploadNewCakeDB;