/*####################################################################################################################
                                                CREATED BY Rumali Perera
                                                      2018 JULY 26
                                                     Cupcake SCHEMA
                                                     PROJECT CAKEZ
 ####################################################################################################################*/

 var mongoose = require('mongoose');

 cupCakeSchema = mongoose.Schema({
     
    type:String,
    name:String,
    price:String,
    insertedDate:Date,
    icingType:String,
    flavour:String
 });
 
 var cupCakeDB = mongoose.model('cupCakes', cupCakeSchema);
 module.exports = cupCakeDB;