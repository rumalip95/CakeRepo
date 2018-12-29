const mongoose=require("mongoose");
const customerDb=require("../schemas/CustomerSchema");
const EncryptionFunctions =require("./Encryption");
const serviceProviderDB=require("../schemas/ServiceProviderSchema");
const cakeProviderUploadNewCakeDB=require("../schemas/CakeProviderUploadNewCake")
const offTheShelfCakeDB=require("../schemas/offTheShelfCake");
const ex=require("../server")

 class UserFunctions{
    static loginFunction(data,client){
        customerDb.findOne({email:data.email}).then(function(foundData){
            if(foundData){
                console.log("User Found")
               const hashedPassword= EncryptionFunctions.getHashedPassword({value:data.password,salt:foundData.password.salt});
               if(hashedPassword.passwordHash===foundData.password.passwordHash){
                   console.log("password matched")
                   client.userData=foundData
                   client.type="customer"
                   client.emit("password matched",{type:"customer"})
                   ex.addToClientArray(client)
                   
               }
               else{
                   console.log("password not matched")
                    client.emit("password not matched")
               }
            }
            else{
                
                serviceProviderDB.findOne({email:data.email}).then(function(foundData){
                    if(foundData){
                        console.log("User Found")
                        const hashedPassword= EncryptionFunctions.getHashedPassword({value:data.password,salt:foundData.password.salt});
                        if(hashedPassword.passwordHash===foundData.password.passwordHash){
                            console.log("password matched")
                            client.userData=foundData
                            client.type="serviceProvider"
                            client.emit("password matched",{type:"serviceProvider"})
                            ex.addToServiceProviderArray(client)
                        }
                        
                        else{
                            console.log("password not matched")
                            client.emit("password not matched")
                        }
                    }
                    else{
                        console.log("User not found")
                        client.emit("user not found")
                    }
                })
            }
        })
    }

   static signUpFunction(data, client){
        customerDb.findOne({$or:[{userName : data.userName},{email:data.email}]}).then(function(foundData){
            if(foundData){
                console.log("Error:User already Exists");
                client.emit("user already exists")
            }
            else{
                serviceProviderDB.findOne({$or:[{userName : data.userName},{email:data.email}]}).then(function(foundCompanyData){
                    if(foundCompanyData){
                        console.log("Error:User already Exists");
                        client.emit("user already exists")
                    }
                    else{
                        let newPassword=EncryptionFunctions.saltHashPassword(data.password)
                        let newCustomer=null;
                        console.log (newPassword);
                        if(!data.provider){
                         newCustomer=new customerDb();
                        }
                        else{
                            newCustomer=new serviceProviderDB();
                            newCustomer.companyName=data.companyName;
                            newCustomer.companyLocation=data.companyLocation;
                        }
                        
                        newCustomer.userName=data.userName;
                        newCustomer.email=data.email;
                        newCustomer.firstName=data.firstName;
                        newCustomer.lastName=data.lastName;
                        newCustomer.phoneNo=data.phoneNo;
                        newCustomer.address=data.address;
                        newCustomer.password=newPassword;
                        newCustomer.description=data.description;
                        newCustomer.image=data.image;
                        
    
                        newCustomer.save().then(function(savedCustomer){
                            console.log("save successful : " + savedCustomer);
                            client.emit("save successful")
                        }).catch(function(error){
                            console.log(error.message);
                            client.emit("internal error")
                        })
                    }
                   
                })
                
            }
        }).catch(function(error){
            console.log(error.message);
            client.emit("internal error")
        })
    }









    static loadShops(client){
        serviceProviderDB.find({}).then(function(data) {
            if(data){

                client.emit("LOAD_SHOPS",data)
            }
        })
    }

    static loadCakes(client, data){
        cakeProviderUploadNewCakeDB.find({userName:data}).then(function(data) {
            if(data){

                client.emit("LOAD_CAKES",data)
            }
        })
    }

    static loadOffTheShelf(client,data){
        let newOrder = new offTheShelfCakeDB(data);
        newOrder.save().then(savedData=>{
            client.emit("ORDER_SAVE_SUCCESSFULL")

        }).catch(err=>{
            client.emit("ORDER_SAVE_ERROR")
        })
    }

    static loadOffTheShelf(client,data){
        let newCakeItem = new cakeProviderUploadNewCakeDB(data);
        newCakeItem.save().then(savedData=>{
            client.emit("YOUR_CAKE_WAS_SUCCESSFULLY_UPLOADED")

        }).catch(err=>{
            client.emit("SAVE_ERROR")
        })
    }

    static loadOffTheShelfOrder(client,data){
        serviceProviderDB.findOne({email:data.email}).then(function(foundData){
            offTheShelfCakeDB.find({
                shopUserName:foundData.userName
            }).then(ordersData=>{
                client.emit("OFF_THE_SHELF_ORDERS_DATA")
            })
        })

    }




}

module.exports=UserFunctions;
