/*####################################################################################################################
                                                CREATED BY Rumali Perera
                                                     2018 JULY 26
                                                Service Provider SCHEMA
                                                    PROJECT CAKEZ
 ####################################################################################################################*/

 var mongoose = require('mongoose');

 serviceProviderSchema = mongoose.Schema({
     userName: {type: String, unique: true},
     firstName:String,
     lastName:String,
     image:String,
     phoneNO:String,
     email:String,
     password:Object,
     address:String,
     companyName:String,
     companyLocation:String,
     description:String
 });
 
 var serviceProviderDB = mongoose.model('serviceProviders', serviceProviderSchema);
 module.exports = serviceProviderDB;