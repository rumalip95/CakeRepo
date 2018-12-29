const customCakeDB=require("../schemas/CustomCakeSchema");
const customizedCakePhotoDB=require("../schemas/CustomizedCakePhoto")
const cakeProviderUploadNewCakeDB=require("../schemas/CakeProviderUploadNewCake");
const offTheShelfCakeOrderDB=require("../schemas/OffTheShelfCakeorder");

class CakeFunctions{

    static saveCustomCake(data,client){
        let newCustomCake=new customCakeDB();
        newCustomCake.noOfLayers=data.noOfLayers;
        newCustomCake.addTopping=data.addTopping;
        newCustomCake.isTopping=data.isTopping;
        newCustomCake.toppings=data.toppings;


        newCustomCake.save().then(function(savedCustomCake){
            console.log("save successful : " + savedCustomCake);
            client.emit("Customized Cake Saved")
        }).catch(function(error){
            console.log(error.message);
            client.emit("Customized Cake Failed")
        })

        

    }

    static saveCustomizedCakePhoto(data,client){
        
        let newCustomCake=new customizedCakePhotoDB({deadline:data.deadline,description:data.description,uploadedDate:data.uploadDate,image:data.image,userName:client.userData.userName,status:"unaccepted",serviceProvider:data.serviceProvider, serviceProvider: data.shopUserName});
        newCustomCake.save().then(function(savedCustomCake){
            client.emit("Uploaded Cake Image Saved")
        }).catch(function(error){
            console.log(error.message);
            client.emit("Uploaded Cake Image Failed")
        })
    }

    static saveCakeShopUploadedPhoto(data,client,clientArray){
        console.log(client.userData.userName)
        let newCakeShopCake=new cakeProviderUploadNewCakeDB({id:client.userData.userName+"_"+Date.now(),image:data.image,title:data.title,text:data.text,weight:data.weight,price:data.price,userName:client.userData.userName});

        newCakeShopCake.save().then(function(savedCakeShopCake){
            client.emit("Uploaded Cake Image From Shop Saved")
        }).catch(function(error){
            console.log(error.message);
            client.emit("Uploaded Cake Image From Shop Failed")
        })
    }


    static saveCServiceProviderUploadLogo(data,client){
        
        let newServiceProviderLogo=new signupUploadLogoDB({id:client.userData.userName+"_"+Date.now(),image:data.image,userName:client.userData.userName});

        newServiceProviderLogo.save().then(function(savedServiceProviderLogo){
            client.emit("Uploaded Service Provider Logo Saved")
        }).catch(function(error){
            console.log(error.message);
            client.emit("Uploaded Service Provider Logo Failed")
        })
    }

    static getOrdersServiceProvider(client){
        let res = {
            uploadPhoto: [],
            custom: [],
            offTheShelf: []
        }
        customizedCakePhotoDB.find({serviceProvider: client.userData._id }).then(function(foundData){
            res.uploadPhoto.push(foundData);

            offTheShelfCakeOrderDB.find({shopUserName: client.userData.userName}).populate({path: "cakeId", model: cakeProviderUploadNewCakeDB}).then(function(foundData2){  
                res.offTheShelf.push(foundData2);
                customCakeDB.find({userName: client.userData.userName}).then(function(foundData3){
                    res.custom.push(foundData3);
                    client.emit("ORDERS_LIST", res);
                })
            })

        }).catch(function(err){
            console.log(err);
        })
    }

    static getOrdersClient(client){
        let res = {
            uploadPhoto: [],
            custom: [],
            offTheShelf: []
        }
        customizedCakePhotoDB.find({userName: client.userData.userName }).then(function(foundData){
            res.uploadPhoto.push(foundData);

            offTheShelfCakeOrderDB.find({email: client.userData.email}).populate({path: "cakeId", model: cakeProviderUploadNewCakeDB}).then(function(foundData2){  
                res.offTheShelf.push(foundData2);
                customCakeDB.find({userName: client.userData.userName}).then(function(foundData3){
                    res.custom.push(foundData3);
                    client.emit("ORDERS_LIST_USER", res);
                })
            })
        }).catch(function(err){
            console.log(err);
        })
    }
    
    
}


module.exports=CakeFunctions;
