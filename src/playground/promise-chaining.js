require("../db/mongoose")
const User=require("../models/users")
const Task=require("../models/tasks")

// User.findOneAndUpdate("61b96d23e9fb968ad0fe1a75",{age:1}).then((result)=>{
//     console.log(result)
//     return User.countDocuments({age:1})
// }).then((result2)=>{
//     console.log(result2)
// })
// .catch((e)=>{
//     console.log(e)
// })

// Task.findByIdAndRemove("61b97240c5190616ac6fe7d8").then((result)=>{
//     console.log(result)
//     return Task.find({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

// Task.findByIdAndUpdate("61b97240c5190616ac6fe7d8",{age:2}).then((result)=>{
//     console.log(result)
//     return Task.find({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const removeAndCountTasks=async(id,completed)=>{
    const removeTask=await Task.findByIdAndRemove(id)
    const countTask=await Task.countDocuments(completed)
    return countTask
}

removeAndCountTasks("61b97240c5190616ac6fe7d8",false).then((result)=>{
    console.log("result :"+result)
}).catch((error)=>{
    console.log("error :"+error)
})

