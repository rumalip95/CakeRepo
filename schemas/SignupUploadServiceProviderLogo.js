/*####################################################################################################################
                                                CREATED BY Rumali Perera
                                                     2018 JULY 26
                                       UPLOAD SERVICE PROVIDER IMAGE AT SIGNUP SCHEMA
                                                     PROJECT CAKEZ
 ####################################################################################################################*/

 var mongoose = require('mongoose');

 signupUploadLogoSchema = mongoose.Schema({
     id:String,
     userName:String,
     image:String
 });
 
 var signupUploadLogoDB = mongoose.model('signupUploadLogo', signupUploadLogoSchema);
 module.exports = signupUploadLogoDB;