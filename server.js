const express =require("express");
const io = require('socket.io')();
const UserFunctions=require('./classes/User')
const CakeFunctions=require('./classes/Cake')


const app=express();
http=require('http');
const server=http.createServer(app);
const mongoose=require('mongoose');

const IP="127.0.0.1";
const PORT=4000;
const IO_PORT=4500;
const DATABASE_CONNECTION="mongodb://localhost:27017/cakeDB"

let socketArray=[]
let clientArray=[]
let serviceProviderArray=[]

exports.addToClientArray=(client)=>{
    clientArray.push(client);
    
}

exports.addToServiceProviderArray=(client)=>{
    serviceProviderArray.push(client);
}

app.use(express.static(__dirname+'/public/build'));
io.on('connection', (client) => { //a new client has been connected
    socketArray.push(client)
    console.log("connected");
    client.emit("Connected")
    client.on("loginData",(data)=>{
        console.log("data : "+ JSON.stringify(data));
        UserFunctions.signUpFunction(data, client);

    })

    client.on("Login",(data)=>{
        console.log("data : "+ JSON.stringify(data));
        let user= UserFunctions.loginFunction(data, client);
        // if(user){
        //     client.userData=user;
        // }
    })

    client.on("SubmitCake",(data)=>{
        console.log("data : "+ JSON.stringify(data));
        CakeFunctions.saveCustomCake(data, client);

    })

    client.on("Uploading Image",(data)=>{
       
        client.emit("Done Uploading Image")
        if(client.type==="customer"){
            if(client.userData){
                CakeFunctions.saveCustomizedCakePhoto(data,client)
            }
        }
    })

    client.on("Uploading Cake Image",(data)=>{
       
        client.emit("Done Uploading Cake Image")
        if(client.type==="serviceProvider"){
            if(client.userData){
                CakeFunctions.saveCakeShopUploadedPhoto(data,client,socketArray)
            }
        }
    })

    client.on("disconnect",()=>{ //to remove a client form socketArray.Now only the online clients are here
        socketArray.splice(socketArray.indexOf(client),1)
        clientArray.splice(clientArray.indexOf(client),1)
        serviceProviderArray.splice(serviceProviderArray.indexOf(client),1)
        console.log(serviceProviderArray)
    })

    client.on("GET_SHOPS",()=>{
        UserFunctions.loadShops(client)
    })
    
    client.on("GET_CAKES",(data)=>{
        UserFunctions.loadCakes(client,data)
    })

    client.on("GET_OFFTHESHELF",(data)=>{
        UserFunctions.loadOffTheShelf(client,data)
    })

    client.on("SET_ORDER",(data)=>{
        UserFunctions.saveShelfCakeOrder(client,data)
    })

    //Service Provider orders
    client.on("GET_ORDERS", ()=> {
        if(client.type==="serviceProvider"){
            if(client.userData){
                CakeFunctions.getOrdersServiceProvider(client)
            }
        }
    })

    client.on("GET_ORDERS_USER", ()=> {
        if(client.type==="customer"){
            if(client.userData){
                CakeFunctions.getOrdersClient(client);
            }
        }
    })
})



mongoose.Promise=global.Promise;
mongoose.connect(DATABASE_CONNECTION, {useNewUrlParser: true});

console.log("running");
io.listen(IO_PORT);
server.listen(PORT,IP);


