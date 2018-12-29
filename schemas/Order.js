/*####################################################################################################################
                                                CREATED BY Rumali Perera
                                                      2018 JULY 26
                                                      Order SCHEMA
                                                     PROJECT CAKEZ
 ####################################################################################################################*/

 var mongoose = require('mongoose');

 orderSchema = mongoose.Schema({
    
    noOfItems:Integer,
    totalPrice:String,
    orderedDate:Date,
    deliveryDate:Date
 });
 
 var orderDB = mongoose.model('orders', orderSchema);
 module.exports = orderDB;