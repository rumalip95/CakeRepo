/*####################################################################################################################
                                                CREATED BY Rumali Perera
                                                     2018 JULY 26
                                                     Bill SCHEMA
                                                    PROJECT CAKEZ
 ####################################################################################################################*/

 var mongoose = require('mongoose');

 billSchema = mongoose.Schema({
     totalToPay:Double,
     amountPaid:Double,
     balance:Double,
     paymentDate:Date,
     paymentMode:String
 });
 
 var billDB = mongoose.model('bills', billSchema);
 module.exports = billDB;