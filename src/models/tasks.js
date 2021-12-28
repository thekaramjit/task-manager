const mongoose=require("mongoose")
const validator=require("validator")

const taskSchema=new mongoose.Schema({
    discription:{
        type:String,
        trim:true,
        lowercase:true,
        require:true,
        validate(value){
            if(value.length<10){
                throw new Error("Plese provide valid discription")
            }
        }
    },
    completed:{
        type:Boolean,
        default:false
    }
})

taskSchema.pre("save",(next)=>{
    console.log("before")
    next()
})


const Tasks=mongoose.model("Tasks",taskSchema)

module.exports=Tasks