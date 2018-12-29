/*####################################################################################################################
                                                CREATED BY Rumali Perera
                                                      2018 JULY 26
                                                      Gift SCHEMA
                                                     PROJECT CAKEZ
 ####################################################################################################################*/

 var mongoose = require('mongoose');

 giftSchema = mongoose.Schema({
     
    type:String,
    name:String,
    price:String,
    insertedDate:Date
 });
 
 var giftDB = mongoose.model('gifts', giftSchema);
 module.exports = giftDB;