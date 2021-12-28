
const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const res = require("express/lib/response")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true,
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength: 7,
        trim:true,
        lowercase:true,
        //also can use minlength=6 istead of validate first logic
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age:{
        type:Number,
        trim:true,
        default:0  
    }
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email:email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password,user.password)
    console.log(isMatch)
    console.log(password)
    console.log(user.password)
    if (!isMatch) {
        throw new Error('Unable to login due to pswd')
    }

    return user
}


    
//In this pre is middleware to do something before saving. In this save is used to update anything
userSchema.pre("save",async function(next){
    //this is used to use individual user to saved to be
    const user=this
    if(user.isModified("password")){
        user.password=await bcrypt.hash(user.password,8)
    }
    //if we dont call next() . function will be hang for always
    next()
})

const User=mongoose.model("User",userSchema)

module.exports=User