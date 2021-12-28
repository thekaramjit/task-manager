const bcrypt=require("bcryptjs")

const password=async()=>{
    const password="red12345"
    const hasPassword=await bcrypt.hash(password,8)
    console.log(hasPassword)

    const isMatch=await bcrypt.compare("Red12345",hasPassword)
    console.log(isMatch)
}

password();