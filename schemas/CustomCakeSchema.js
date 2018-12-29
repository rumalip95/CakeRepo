/*####################################################################################################################
                                                CREATED BY Rumali Perera
                                                      2018 JULY 26
                                                   Custom Cake SCHEMA
                                                     PROJECT CAKEZ
 ####################################################################################################################*/

 var mongoose = require('mongoose');

 customCakeSchema = mongoose.Schema({
     
    noOfLayers:Number,
    addTopping:Boolean,
    isTopping:Boolean,
    toppings:Object
 });
 
 var customCakeDB = mongoose.model('cakes', customCakeSchema);
 module.exports = customCakeDB;