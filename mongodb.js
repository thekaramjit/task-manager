//CRUD operations create,read,update and delete

const { ObjectID } = require("bson")
const mongodb=require("mongodb")
const MongoClient=mongodb.MongoClient
const ObjectId=mongodb.ObjectId

const connectionUrl="mongodb://127.0.0.1:27017"
const dataBaseName="task-managerr"

MongoClient.connect(connectionUrl,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log("Unable to connect to database")
    }
    const db=client.db(dataBaseName)
    // db.collection("user").insertOne({
    //     name:"sahil",
    //     age:21
    // },(error,result)=>{
    //     if(error){
    //         return console.log("Unable to insert user!")
    //     }
    //     console.log(result)
    // })
    
    // db.collection("tasks").insertMany([{
    //     task:"Bring grocery",
    //     completed:true
    // },
    // {
    //     task:"Go to gym",
    //     completed:true
    // },{
    //     task:"bring eggs",
    //     completed:false
    // }],(error,result)=>{
    //     if(error){
    //         return console.log("Unable to insert task!")
    //     }
    //     console.log(result)
    // })

// find one method to read some data
    // db.collection("tasks").findOne({_id:new ObjectId("61b82ce90e7e3c52bb67f940")},(error,task)=>{
    //     if(error){
    //      return console.log(error)
    //     }
    //     console.log(task)
    // })
 
// find method to read some data

    // db.collection("tasks").find({completed:true}).toArray((error,task)=>{
    //     if(error){
    //      return console.log(error)
    //     }
    //     console.log(task)
    // })

// updateOne to update data

    // db.collection("user").updateOne({_id:new ObjectId("61b8201ef2039982f0c92093")},{
    //     //to check update operators search mongodb update operators
    //     $set:{
    //         name:"Karamjit singh"
    //     },$inc:{
    //         age:1
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((reject)=>{
    //     console.log(reject)
    // })
    
// updateMany to update data

    // db.collection("user").updateMany({age:23},{
    //     //to check update operators search mongodb update operators
    //     $inc:{
    //         age:-1
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((reject)=>{
    //     console.log(reject)
    // })
    
// deleteMany to update data

    db.collection("tasks").deleteMany({completed:false}).then((result)=>{
        console.log(result)
    }).catch((reject)=>{
        console.log(reject)
    })
})