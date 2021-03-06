/*####################################################################################################################
                                                CREATED BY Rumali Perera
                                                     2018 JULY 26
                                                    Customer SCHEMA
                                                     PROJECT CAKEZ
 ####################################################################################################################*/

 var mongoose = require('mongoose');

 customerSchema = mongoose.Schema({
     userName: {type: String, unique: true},
     firstName:String,
     lastName:String,
     phoneNo:String,
     email:String,
     password:Object,
     address:String
 });
 
 var customerDB = mongoose.model('customers', customerSchema);
 module.exports = customerDB;