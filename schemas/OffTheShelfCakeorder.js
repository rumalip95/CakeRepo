/*####################################################################################################################
                                                CREATED BY Rumali Perera
                                                     2018 JULY 26
                                              Off The Shelf Order SCHEMA
                                                     PROJECT CAKEZ
 ####################################################################################################################*/

 var mongoose = require('mongoose');

 offTheShelfCakeOrderSchema = mongoose.Schema({
    shopUserName: String,
    cakeId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'offTheShelfCakes' }],
    email: String,
    quantity: String,
    status: {type: String, default: "unaccepted"}
 });
 
 var offTheShelfCakeOrderDB = mongoose.model('offtheshelforders', offTheShelfCakeOrderSchema);
 module.exports = offTheShelfCakeOrderDB;