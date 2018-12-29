/*####################################################################################################################
                                                CREATED BY Rumali Perera
                                                     2018 JULY 26
                                                OFF THE SHELF CAKE SCHEMA
                                                     PROJECT CAKEZ
 ####################################################################################################################*/

 var mongoose = require('mongoose');

 offTheShelfCakeSchema = mongoose.Schema({
     email:String,
     cakeId:String,
     shopUserName:String,
     quantity:String
 });
 
 var offTheShelfCakeDB = mongoose.model('offTheShelfCakes', offTheShelfCakeSchema);
 module.exports = offTheShelfCakeDB;