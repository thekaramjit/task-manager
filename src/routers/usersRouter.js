const express=require("express")
const User=require("../models/users")
const router=new express.Router()

router.post('/users',async (req, res) => {

    const user=new User(req.body)
    try{
        await user.save()
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
    // const user = new User(req.body)

    // user.save().then(() => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        if(!user){
            res.send("not found")
        }
        res.send(user)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

router.get("/user/:id",async (req,res)=>{
    const _id=req.params.id
    try{
        const user=await User.findById(_id)
        if(!user){
           return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(404).send(e)
    }

})


router.get("/users",async(req,res)=>{
    try{
        const user=await User.find({})
        res.send(user)
    }catch(e){
        res.send("Not found")
    }
})

router.patch("/users/:id",async (req,res)=>{
    const updates=Object.keys(req.body)
    const valid=["name","age","email","password"]

    const isValidOperation=updates.every((update)=>{
        return valid.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({error:"Invalid Update!"})
    }
    try{
        // const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        const user=await User.findById(req.params.id)

        updates.forEach((update)=>{
            user[update]=req.body[update]

        })

        await user.save()

        if(!user){
         return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports=router