//Database Connectivity
const mongoose=require('mongoose');
const DATABASE_CONNECTION="mongodb://localhost:27017/cakeDB"

mongoose.Promise=global.Promise;
mongoose.connect(DATABASE_CONNECTION, {useNewUrlParser: true});