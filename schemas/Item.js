/*####################################################################################################################
                                                CREATED BY Rumali Perera
                                                     2018 JULY 26
                                                     Item SCHEMA
                                                    PROJECT CAKEZ
 ####################################################################################################################*/

 var mongoose = require('mongoose');

 itemSchema = mongoose.Schema({
     
     type:String,
     name:String,
     price:String,
     insertedDate:Date
     
 });
 
 var itemDB = mongoose.model('items', itemSchema);
 module.exports = itemDB;