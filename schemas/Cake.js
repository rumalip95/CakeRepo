/*####################################################################################################################
                                                CREATED BY Rumali Perera
                                                      2018 JULY 26
                                                      Cake SCHEMA
                                                     PROJECT CAKEZ
 ####################################################################################################################*/

 var mongoose = require('mongoose');

 cakeSchema = mongoose.Schema({
     
    type:String,
    name:String,
    price:String,
    insertedDate:Date,
    noOfTiers:Integer,
    icingType:String,
    flavour:String
 });
 
 var cakeDB = mongoose.model('cakes', cakeSchema);
 module.exports = cakeDB;